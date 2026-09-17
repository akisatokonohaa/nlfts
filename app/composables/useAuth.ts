import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  updated_at?: string | null
  username?: string | null
  full_name?: string | null
  avatar_url?: string | null
  website?: string | null
  is_admin?: boolean | null
  bio?: string | null
  bahasa?: unknown[] | null
  social?: unknown[] | null
}

let supabaseInstance: SupabaseClient | null = null

export const useSupabase = () => {
  if (supabaseInstance) return supabaseInstance

  const config = useRuntimeConfig()
  const supabaseUrl = (config.public.supabaseUrl as string) || ''
  const supabaseAnonKey = (config.public.supabaseAnonKey as string) || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.dev) {
      console.warn('Supabase URL or Anon Key is missing in runtimeConfig')
    }
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })

  return supabaseInstance
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const profile = useState<UserProfile | null>('auth-profile', () => null)
  const loading = useState<boolean>('auth-loading', () => true)
  const isLoggingIn = useState<boolean>('auth-is-logging-in', () => false)

  const username = computed(() => {
    return (
      profile.value?.username ||
      user.value?.user_metadata?.user_name ||
      user.value?.user_metadata?.preferred_username ||
      ''
    )
  })

  const fullName = computed(() => {
    return (
      profile.value?.full_name ||
      user.value?.user_metadata?.full_name ||
      user.value?.user_metadata?.name ||
      username.value ||
      'Pengguna'
    )
  })

  // Format gambar avatar langsung dari GitHub sesuai permintaan pengguna
  const avatarUrl = computed(() => {
    const uname = username.value
    if (uname) {
      return `https://github.com/${uname}.png`
    }
    return user.value?.user_metadata?.avatar_url || ''
  })

  const syncProfile = async (currentUser: User) => {
    if (!import.meta.client) return
    const supabase = useSupabase()
    
    const ghUsername =
      currentUser.user_metadata?.user_name ||
      currentUser.user_metadata?.preferred_username ||
      currentUser.email?.split('@')[0] ||
      ''
    const ghFullName =
      currentUser.user_metadata?.full_name ||
      currentUser.user_metadata?.name ||
      ghUsername

    try {
      // Ambil data profile yang sudah ada
      const { data: existingProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error.message)
      }

      if (existingProfile) {
        profile.value = existingProfile
      } else if (ghUsername) {
        // Buat record baru jika belum ada
        const newProfileData: Partial<UserProfile> = {
          id: currentUser.id,
          username: ghUsername,
          full_name: ghFullName,
          avatar_url: `https://github.com/${ghUsername}.png`,
          updated_at: new Date().toISOString()
        }

        const { data: createdProfile, error: insertError } = await supabase
          .from('profiles')
          .upsert(newProfileData)
          .select()
          .maybeSingle()

        if (insertError) {
          console.error('Error creating profile:', insertError.message)
          // Fallback lokal
          profile.value = newProfileData as UserProfile
        } else if (createdProfile) {
          profile.value = createdProfile
        }
      }
    } catch (err) {
      console.error('Failed to sync profile:', err)
    }
  }

  const initAuth = async () => {
    if (!import.meta.client) return
    const supabase = useSupabase()

    try {
      loading.value = true
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        user.value = session.user
        await syncProfile(session.user)
      } else {
        user.value = null
        profile.value = null
      }
    } catch (err) {
      console.error('Error initializing auth:', err)
    } finally {
      loading.value = false
    }

    // Subscribe ke perubahan auth
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        user.value = session.user
        await syncProfile(session.user)
      } else {
        user.value = null
        profile.value = null
      }
      loading.value = false
    })
  }

  const loginWithGitHub = async () => {
    if (!import.meta.client) return
    const supabase = useSupabase()
    isLoggingIn.value = true

    try {
      const redirectUri = `${window.location.origin}/auth/callback`

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true
        }
      })

      if (error || !data?.url) {
        console.error('OAuth error:', error)
        isLoggingIn.value = false
        return
      }

      // Hitung koordinat tengah layar untuk popup
      const width = 600
      const height = 700
      const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2)
      const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2)

      const popup = window.open(
        data.url,
        'github_oauth_popup',
        `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes,scrollbars=yes`
      )

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Jika browser memblokir popup, redirect sebagai fallback
        window.location.href = data.url
        return
      }

      // Dengarkan pesan dari jendela popup
      const handleAuthMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data?.type === 'SUPABASE_AUTH_SUCCESS') {
          window.removeEventListener('message', handleAuthMessage)
          clearInterval(checkPopupClosed)

          // Refresh sesi
          const { data: sessionData } = await supabase.auth.getSession()
          if (sessionData?.session?.user) {
            user.value = sessionData.session.user
            await syncProfile(sessionData.session.user)
          }
          isLoggingIn.value = false
        } else if (event.data?.type === 'SUPABASE_AUTH_ERROR') {
          window.removeEventListener('message', handleAuthMessage)
          clearInterval(checkPopupClosed)
          console.error('OAuth Popup failed:', event.data?.error)
          isLoggingIn.value = false
        }
      }

      window.addEventListener('message', handleAuthMessage)

      // Monitor apakah popup ditutup manual oleh pengguna
      const checkPopupClosed = setInterval(async () => {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed)
          window.removeEventListener('message', handleAuthMessage)
          isLoggingIn.value = false

          // Cek kembali barangkali sesi sudah tersimpan
          const { data: sessionData } = await supabase.auth.getSession()
          if (sessionData?.session?.user) {
            user.value = sessionData.session.user
            await syncProfile(sessionData.session.user)
          }
        }
      }, 600)
    } catch (err) {
      console.error('Failed to initiate login:', err)
      isLoggingIn.value = false
    }
  }

  const logout = async () => {
    if (!import.meta.client) return
    const supabase = useSupabase()
    loading.value = true

    try {
      await supabase.auth.signOut()
      user.value = null
      profile.value = null
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    profile,
    username,
    fullName,
    avatarUrl,
    loading,
    isLoggingIn,
    initAuth,
    loginWithGitHub,
    logout,
    syncProfile
  }
}
