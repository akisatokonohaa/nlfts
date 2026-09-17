<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: false
})

const status = ref('Menghubungkan akun GitHub...')
const isError = ref(false)

onMounted(async () => {
  if (!import.meta.client) return

  try {
    const supabase = useSupabase()
    
    // Ambil parameter jika ada error dari OAuth
    const route = useRoute()
    const errorParam = route.query.error_description || route.query.error

    if (errorParam) {
      isError.value = true
      status.value = `Gagal login: ${errorParam}`
      if (window.opener) {
        window.opener.postMessage(
          { type: 'SUPABASE_AUTH_ERROR', error: errorParam },
          window.location.origin
        )
        setTimeout(() => window.close(), 1500)
      }
      return
    }

    // Jika ada authorization code di URL
    const code = route.query.code as string | undefined
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code:', error.message)
      }
    }

    // Ambil session terkini
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Session error:', sessionError)
      isError.value = true
      status.value = 'Terjadi kesalahan saat memproses sesi.'
    } else if (session) {
      status.value = 'Autentikasi berhasil! Menutup jendela...'
    }

    // Beritahu window opener (jendela utama)
    if (window.opener) {
      window.opener.postMessage(
        { type: 'SUPABASE_AUTH_SUCCESS' },
        window.location.origin
      )
      // Tutup popup segera
      setTimeout(() => {
        window.close()
      }, 300)
    } else {
      // Jika bukan popup, redirect ke halaman utama
      navigateTo('/')
    }
  } catch (err) {
    console.error('Callback unexpected error:', err)
    isError.value = true
    status.value = 'Terjadi kesalahan tidak terduga.'
    if (window.opener) {
      window.opener.postMessage(
        { type: 'SUPABASE_AUTH_ERROR', error: String(err) },
        window.location.origin
      )
      setTimeout(() => window.close(), 2000)
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-6 select-none font-sans">
    <div class="flex flex-col items-center gap-4 text-center max-w-sm">
      <div class="relative flex items-center justify-center">
        <div class="w-14 h-14 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <UIcon name="i-simple-icons-github" class="w-7 h-7 text-white absolute" />
      </div>

      <div class="space-y-1 mt-2">
        <h2 class="text-base font-semibold text-zinc-100">
          {{ isError ? 'Autentikasi Gagal' : 'GitHub OAuth' }}
        </h2>
        <p class="text-xs text-zinc-400">
          {{ status }}
        </p>
      </div>
    </div>
  </div>
</template>
