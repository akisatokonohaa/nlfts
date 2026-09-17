<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const {
  user,
  profile,
  username,
  fullName,
  avatarUrl,
  isLoggingIn,
  loginWithGitHub,
  logout,
  initAuth
} = useAuth()

const isUserMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement>()

const handleDocumentClick = (event: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    isUserMenuOpen.value = false
  }
}

const upcomingEvents = [
  { day: '404', month: '', title: 'Tidak Ada Event', location: 'Bersih' },
]

const featuredEvents = [
  { title: 'Bandung', dateMonth: 'JUN', dateRange: '00', year: '2026', city: 'Nuxtjs Community', country: 'ID', img: './location/bandung.webp' },
  { title: 'Yogyakarta', dateMonth: 'JUN', dateRange: '00', year: '2026', city: 'Laravel Community', country: 'ID', img: './location/jogja.webp' },
  { title: 'Jakarta', dateMonth: 'JUL', dateRange: '00', year: '2026', city: 'Angular Community', country: 'ID', img: './location/monas.webp' }
]

// ── State ───────────────────────────────────────────
const activeMenu = ref<string | null>(null)
const mobileOpen = ref(false)
const expandedMobile = ref<string | null>(null)

// ── Vercel Hover State ──────────────────────────────
const hoverState = ref({
  width: 0,
  left: 0,
  opacity: 0
})

// ── Refs ────────────────────────────────────────────
const headerEl = ref<HTMLElement>()
const dropdownEl = ref<HTMLElement>()
const mobileOverlay = ref<HTMLElement>()
const mobilePanel = ref<HTMLElement>()

let closeTimeout: ReturnType<typeof setTimeout>
let ctx: gsap.Context | null = null

// ── Helper Utilities ────────────────────────────────
const getMenuKey = (menu: string) => {
  return menu.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
}
const navItems = [
  { label: 'Explore', key: 'resources' },
  { label: 'Events', key: 'event' }
]

const primaryLinks = [
  { label: 'Education', to: 'https://edu.nlfts.dev', badge: 'New' },
  { label: 'Jobs', to: '/karir' },
  { label: 'Market', to: '/jasa' }
]
// ── Desktop Navigation Logic ────────────────────────
const openMenu = (menu: string) => {
  clearTimeout(closeTimeout)
  const wasOpen = activeMenu.value !== null
  activeMenu.value = menu

  nextTick(() => {
    if (!dropdownEl.value) return
    if (!wasOpen) {
      gsap.fromTo(dropdownEl.value,
        { opacity: 0, y: -4 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }
      )
    }
    // Animasi muncul konten mega-menu ala Vercel yang instan dan clean
    gsap.fromTo(dropdownEl.value.querySelectorAll('.dd-animate'),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, stagger: 0.015, duration: 0.2, ease: 'power2.out', delay: wasOpen ? 0 : 0.03 }
    )
  })
}

const scheduleClose = () => {
  closeTimeout = setTimeout(() => {
    if (dropdownEl.value) {
      gsap.to(dropdownEl.value, {
        opacity: 0, y: -4, duration: 0.12, ease: 'power2.in',
        onComplete: () => { activeMenu.value = null }
      })
    } else {
      activeMenu.value = null
    }
  }, 100)
}

const cancelClose = () => clearTimeout(closeTimeout)

const onMenuButtonHover = (menu: string, event: MouseEvent) => {
  openMenu(menu)
  trackHover(event)
}

const trackHover = (event: MouseEvent) => {
  const el = event.currentTarget as HTMLElement
  if (el) {
    hoverState.value = {
      width: el.offsetWidth,
      left: el.offsetLeft,
      opacity: 1
    }
  }
}

const resetHover = () => {
  hoverState.value.opacity = 0
}

const closeDesktopMenu = () => {
  clearTimeout(closeTimeout)
  if (dropdownEl.value) gsap.killTweensOf(dropdownEl.value)
  activeMenu.value = null
  resetHover()
}

// ── Mobile Menu ─────────────────────────────────────
const openMobile = () => {
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    if (mobileOverlay.value) {
      gsap.fromTo(mobileOverlay.value, { opacity: 0 }, { opacity: 1, duration: 0.2 })
    }
    if (mobilePanel.value) {
      gsap.fromTo(mobilePanel.value, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' })
    }
  })
}

const closeMobile = () => {
  if (mobilePanel.value) {
    gsap.to(mobilePanel.value, { y: -8, opacity: 0, duration: 0.2, ease: 'power2.in' })
  }
  if (mobileOverlay.value) {
    gsap.to(mobileOverlay.value, {
      opacity: 0, duration: 0.2,
      onComplete: () => {
        mobileOpen.value = false
        document.body.style.overflow = ''
      }
    })
  }
}

const toggleMobileSection = (key: string) => {
  expandedMobile.value = expandedMobile.value === key ? null : key
}

// ── Lifecycle ───────────────────────────────────────
onMounted(() => {
  initAuth()
  document.addEventListener('click', handleDocumentClick)
  ctx = gsap.context(() => {
    gsap.from('.nav-enter', {
      opacity: 0, y: -4, stagger: 0.02, duration: 0.4, ease: 'power2.out', delay: 0.05
    })
  }, headerEl.value!)
})

const isSearchOpen = useState('search-open')
const toggleSearch = () => { isSearchOpen.value = true }

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  ctx?.revert()
  clearTimeout(closeTimeout)
  document.body.style.overflow = ''
})

const Resources = [
  {
    title: "Learn",
    links: [
      { label: "Docs", to: "/docs/getting-started" },
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Changelog", to: "/changelog" },
      { label: "Members", to: "/members" }
    ]
  },
  {
    title: "",
    links: [
      { label: "Terhubung", to: "/terhubung" },
      { label: "Karir", to: "/karir" },
      { label: "Donation", to: "/donasi" },
      { label: "Gallery", to: "/galeri" },
      { label: "Faq", to: "/faq" }
    ]
  },
  {
    title: "",
    links: [
      { label: "Sponsor", to: "/donation", target: "_blank", external: true },
      { label: "Marketplace", to: "https://github.com/NLFTs", target: "_blank", external: true },
      { label: "Partner", to: "/terhubung" },
      { label: "Contact Us", to: "/contact" },
      { label: "Community ↗", to: "https://discord.gg/uNc3r3ZKQx", target: "_blank", external: true }
    ]
  }
]


const exploreComparisons = [
  { label: 'NLFTs vs komunitas biasa', icon: 'i-lucide-users', to: '/about' },
  { label: 'NLFTs vs kursus online', icon: 'i-lucide-book-open', to: '/docs/getting-started' },
  { label: 'NLFTs vs job board', icon: 'i-lucide-briefcase-business', to: '/karir' }
]

const exploreQuickLinks = [
  { label: 'Dokumentasi', icon: 'i-lucide-book-open', to: '/docs/getting-started' },
  { label: 'Blog', icon: 'i-lucide-newspaper', to: '/blog' },
  { label: 'Changelog', icon: 'i-lucide-history', to: '/changelog' },
  { label: 'Members', icon: 'i-lucide-users', to: '/members' },
  { label: 'Terhubung', icon: 'i-lucide-network', to: '/terhubung' },
  { label: 'Donasi', icon: 'i-lucide-heart-handshake', to: '/donasi' },
  { label: 'Galeri', icon: 'i-lucide-images', to: '/galeri' },
  { label: 'FAQ', icon: 'i-lucide-circle-help', to: '/faq' },
  { label: 'Partner', icon: 'i-lucide-handshake', to: '/terhubung' },
  { label: 'Kontak', icon: 'i-lucide-mail', to: '/contact' },
  { label: 'Community', icon: 'i-lucide-message-circle', to: 'https://discord.gg/uNc3r3ZKQx', external: true }
]
</script>

<template>
  <!-- ════════════════════════════════════════════════ -->
  <!-- HEADER                                           -->
  <!-- ════════════════════════════════════════════════ -->
  <header
    ref="headerEl"
    class="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-md transition-colors duration-300"
  >
    <!-- Main Navigation Bar -->
    <div class="max-w-[1600px] mx-auto px-5 sm:px-6">
      <div class="flex items-center gap-7 min-h-[72px]">
        <NuxtLink to="/" class="nav-enter shrink-0 flex items-center">
          <AppLogo class="h-6 w-auto" />
        </NuxtLink>
        <nav
          class="hidden lg:flex items-center gap-0.5 relative shrink-0"
          @click="closeDesktopMenu"
          @mouseenter="cancelClose"
          @mouseleave="() => { scheduleClose(); resetHover(); }"
        >
          <!-- Sliding Backdrop Pill -->
          <div 
            class="absolute pointer-events-none rounded-md bg-zinc-100 dark:bg-zinc-900 transition-all duration-150 ease-out z-0"
            :style="{
              width: `${hoverState.width}px`,
              left: `${hoverState.left}px`,
              opacity: hoverState.opacity,
              height: '30px'
            }"
          ></div>

          <!-- Interactive Mega Menu Buttons -->
          <button
            v-for="item in navItems"
            :key="item.key"
            class="nav-enter relative text-[13px] font-medium px-3 h-7.5 rounded-md flex items-center gap-1 transition-colors duration-150 z-10"
            :class="activeMenu === item.key ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50'"
            @mouseenter="onMenuButtonHover(item.key, $event)"
          >
            {{ item.label }}
            <UIcon 
              name="i-lucide-chevron-down" 
              class="w-3 h-3 opacity-40 transition-transform duration-200"
              :class="activeMenu === item.key ? 'rotate-180 opacity-80' : ''"
            />
          </button>

          <NuxtLink
            v-for="item in primaryLinks"
            :key="item.label"
            :to="item.to"
            class="nav-enter relative flex items-center gap-1 px-3 h-8 rounded-md text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150"
          >
            {{ item.label }}
            <span v-if="item.badge" class="rounded bg-zinc-800 px-1 py-0.5 text-[9px] font-bold leading-none text-white">{{ item.badge }}</span>
          </NuxtLink>
        </nav>

        <!-- Search and account controls -->
        <div class="flex min-w-0 flex-1 items-center justify-end gap-4 nav-enter">
          <button
            class="hidden md:flex h-[52px] w-full max-w-[430px] items-center gap-3 rounded-[11px] border border-transparent bg-zinc-100 px-5 text-left transition-colors group hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            @click="toggleSearch"
          >
            <div class="flex items-center gap-2.5">
              <UIcon name="i-lucide-search" class="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
              <span class="text-sm text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200">Search Repository</span>
            </div>
          </button>

          <div class="hidden xl:flex items-center gap-3 whitespace-nowrap">
            <NuxtLink to="/terhubung" class="inline-flex h-[52px] items-center rounded-[11px] border border-zinc-900 px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white dark:border-zinc-300 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-900">Bergabung</NuxtLink>

            <!-- Login GitHub Button (Ketika belum login) -->
            <button
              v-if="!user"
              type="button"
              class="inline-flex h-[52px] items-center justify-center gap-2 rounded-[11px] border border-[#238636] bg-[#238636] hover:bg-[#2ea043] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
              :disabled="isLoggingIn"
              @click="loginWithGitHub"
            >
              <UIcon v-if="isLoggingIn" name="i-lucide-loader-2" class="w-4 h-4 animate-spin text-white" />
              <UIcon v-else name="i-simple-icons-github" class="w-4 h-4 text-white" />
              <span>{{ isLoggingIn ? 'Menghubungkan...' : 'Login' }}</span>
            </button>

            <!-- User Profile Bulat + Dropdown Logout (Ketika sudah login) -->
            <div v-else ref="userMenuRef" class="relative">
              <button
                type="button"
                class="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer"
                aria-label="Menu Pengguna"
                @click="isUserMenuOpen = !isUserMenuOpen"
              >
                <img
                  :src="avatarUrl || `https://github.com/${username || 'ghost'}.png`"
                  :alt="fullName || username || 'Profile'"
                  class="h-[46px] w-[46px] rounded-full object-cover ring-2 ring-zinc-200 hover:ring-[#238636] dark:ring-zinc-800 dark:hover:ring-[#2ea043] transition-all duration-200 shadow-sm"
                  @error="(e: Event) => { (e.target as HTMLImageElement).src = 'https://github.com/ghost.png' }"
                />
                <span class="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-[#238636] ring-2 ring-white dark:ring-black" />
              </button>

              <!-- Dropdown Menu Logout -->
              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-if="isUserMenuOpen"
                  class="absolute right-0 top-full mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-1.5 shadow-xl shadow-black/10 dark:shadow-black/40 z-50"
                >
                  <div class="flex items-center gap-3 px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-900">
                    <img
                      :src="avatarUrl || `https://github.com/${username || 'ghost'}.png`"
                      :alt="username"
                      class="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ fullName }}</p>
                      <p class="text-[11px] text-zinc-400 truncate">@{{ username }}</p>
                    </div>
                  </div>

                  <div class="pt-1">
                    <button
                      type="button"
                      class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      @click="logout(); isUserMenuOpen = false;"
                    >
                      <UIcon name="i-lucide-log-out" class="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <UColorModeButton size="sm" class="hidden lg:flex text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border-none shadow-none" />
          
          <button
            class="lg:hidden p-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Buka menu navigasi"
            @click="openMobile"
          >
            <UIcon name="i-lucide-menu" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- DESKTOP DROPDOWN PANEL                        -->
    <!-- ══════════════════════════════════════════════ -->
    <div
      v-if="activeMenu"
      ref="dropdownEl"
      class="absolute left-0 right-0 top-full z-20"
      @click="closeDesktopMenu"
      @mouseenter="cancelClose"
      @mouseleave="scheduleClose"
    >
      <div class="max-w-[1240px] mx-auto px-4 py-3">
        <div class="rounded-[18px] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#020202] shadow-[0_30px_70px_-26px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_80px_-32px_rgba(0,0,0,0.55)] overflow-hidden">
          <div class="px-5 py-5 lg:px-6 lg:py-6">
            <div v-if="activeMenu === 'resources'">
              <div class="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
                <div class="border-b border-zinc-200 px-1 pb-7 dark:border-zinc-800 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                  <p class="dd-animate mb-5 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Explore</p>
                  <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <NuxtLink
                        v-for="link in exploreQuickLinks"
                        :key="link.label"
                        :to="link.to"
                        :external="link.external"
                        class="dd-animate group flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      >
                        <UIcon :name="link.icon" class="h-5 w-5 shrink-0 text-zinc-400 transition-colors group-hover:text-primary-500" />
                        {{ link.label }}
                      </NuxtLink>
                  </div>
                </div>

                <div class="pt-7 lg:pt-0 lg:pl-8">
                  <p class="dd-animate mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Cerita komunitas <UIcon name="i-lucide-arrow-up-right" class="inline h-3 w-3" /></p>
                  <NuxtLink to="/blog" class="dd-animate group flex items-center gap-3 rounded-xl py-1">
                    <span class="flex h-[70px] w-[100px] shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-sm font-bold tracking-tight text-zinc-400 transition-colors group-hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:group-hover:bg-zinc-800">NLFTs</span>
                    <span class="text-[15px] font-medium leading-5 text-zinc-800 transition-colors group-hover:text-primary-500 dark:text-zinc-200">Bagaimana komunitas membangun karier digital bersama</span>
                  </NuxtLink>

                  <div class="mt-8 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                    <p class="dd-animate mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Bandingkan NLFTs</p>
                    <NuxtLink
                      v-for="comparison in exploreComparisons"
                      :key="comparison.label"
                      :to="comparison.to"
                      class="dd-animate group mb-2 flex items-center justify-between text-[15px] text-zinc-700 transition-colors hover:text-primary-500 dark:text-zinc-300"
                    >
                      <span class="flex items-center gap-2"><UIcon :name="comparison.icon" class="h-4 w-4 text-zinc-400" />{{ comparison.label }}</span>
                      <UIcon name="i-lucide-arrow-up-right" class="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeMenu === 'event'" class="flex gap-8">
              <div class="w-[300px] shrink-0 pr-8 border-r border-zinc-200 dark:border-zinc-800/60">
                <h3 class="dd-animate text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase mb-5">Event Terbaru</h3>
                <div class="space-y-1">
                  <div
                    v-for="evt in upcomingEvents"
                    :key="evt.title"
                    class="dd-animate flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900/40 group cursor-pointer transition-colors"
                  >
                    <div class="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center shrink-0">
                      <span class="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-none">{{ evt.day }}</span>
                      <span class="text-[7px] font-bold text-zinc-400 uppercase leading-none mt-0.5">{{ evt.month }}</span>
                    </div>
                    <div class="min-w-0 pt-0.5">
                      <h4 class="text-xs font-medium leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 transition-colors">{{ evt.title }}</h4>
                      <p class="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">{{ evt.location }}</p>
                    </div>
                  </div>
                </div>
                <NuxtLink to="/blog" class="dd-animate inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-zinc-200 mt-4 hover:gap-1.5 transition-all">
                  Lihat semua Acara <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
                </NuxtLink>
              </div>

              <div class="flex-1 flex gap-4 bg-zinc-50/30 dark:bg-zinc-900/10 p-3 rounded-xl border border-zinc-200/55 dark:border-zinc-800/40">
                <div
                  v-for="card in featuredEvents"
                  :key="card.title"
                  class="dd-animate flex-1 relative overflow-hidden rounded-lg group cursor-pointer border border-zinc-200/60 dark:border-zinc-800 shadow-sm"
                  style="aspect-ratio: 3/4;"
                >
                  <img :src="card.img" :alt="card.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-[1]" />
                  <div class="absolute top-0 left-0 right-0 pt-4 px-4 z-10">
                    <h4 class="text-[13px] font-bold text-white text-center leading-snug tracking-tight whitespace-pre-line">{{ card.title }}</h4>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 px-4 pb-3.5 z-10">
                    <div class="flex items-baseline text-white/90">
                      <span class="text-[8px] font-semibold uppercase tracking-wider text-zinc-300">{{ card.dateMonth }}</span>
                      <span class="text-xs font-extrabold leading-none ml-1">{{ card.dateRange }}</span>
                      <span class="text-[8px] font-medium text-zinc-400 ml-auto">{{ card.year }}</span>
                    </div>
                    <div class="flex justify-between mt-1 border-t border-white/10 pt-1">
                      <span class="text-[8px] font-semibold text-zinc-400 uppercase tracking-widest">{{ card.city }}</span>
                      <span class="text-[8px] font-semibold text-zinc-400 uppercase tracking-widest">{{ card.country }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ════════════════════════════════════════════════ -->
  <!-- MOBILE MENU (Full-Width Top Panel Sheet)         -->
  <!-- ════════════════════════════════════════════════ -->
  <Teleport to="body">
    <div v-if="mobileOpen" class="fixed inset-0 z-[100] lg:hidden">
      <!-- Backdrop -->
      <div
        ref="mobileOverlay"
        class="absolute inset-0 bg-black/20 dark:bg-black/45 backdrop-blur-md"
        @click="closeMobile"
      />

      <!-- Slide Down Sheet -->
      <div
        ref="mobilePanel"
        class="absolute top-0 left-0 right-0 bg-white dark:bg-[#000000] border-b border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col p-5 max-h-[90vh] overflow-y-auto"
      >
        <!-- Mobile Header -->
        <div class="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <AppLogo class="h-4.5 w-auto" />
          <button class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-550" @click="closeMobile">
            <UIcon name="i-lucide-x" class="w-4 h-4" />
          </button>
        </div>

        <!-- Search Bar Button -->
        <div class="py-3">
          <button
            class="w-full flex items-center gap-2.5 px-3 py-2 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 text-left"
            @click="toggleSearch(); closeMobile();"
          >
            <UIcon name="i-lucide-search" class="w-3.5 h-3.5 text-zinc-400" />
            <span class="text-xs text-zinc-400">Cari informasi product...</span>
          </button>
        </div>

        <!-- Interactive Navigation Accordions -->
        <div class="space-y-1 py-1">

          <!-- Accordion: Resources -->
          <div class="border-b border-zinc-100 dark:border-zinc-900">
            <button
              class="w-full flex items-center justify-between py-3 text-xs font-semibold tracking-wider uppercase text-zinc-400"
              @click="toggleMobileSection('resources')"
            >
              Resources
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-zinc-400 transition-transform duration-200" :class="expandedMobile === 'resources' ? 'rotate-180' : ''" />
            </button>
            <div v-show="expandedMobile === 'resources'" class="pb-3 pl-2">
              <div v-for="section in Resources" :key="section.title" class="mb-3">
                <p v-if="section.title" class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">{{ section.title }}</p>
                <div class="grid grid-cols-1 gap-1">
                  <NuxtLink
                    v-for="item in section.links"
                    :key="item.to"
                    :to="item.to"
                    :target="item.target"
                    :external="item.external"
                    class="flex items-center gap-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    @click="closeMobile"
                  >
                    <UIcon name="i-lucide-arrow-right" class="w-3 h-3 opacity-50" />
                    {{ item.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion: Kegiatan & Acara -->
          <div class="border-b border-zinc-100 dark:border-zinc-900">
            <button
              class="w-full flex items-center justify-between py-3 text-xs font-semibold tracking-wider uppercase text-zinc-400"
              @click="toggleMobileSection('event')"
            >
              Kegiatan & Acara
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-zinc-400 transition-transform duration-200" :class="expandedMobile === 'event' ? 'rotate-180' : ''" />
            </button>
            <div v-show="expandedMobile === 'event'" class="pb-3 pl-2 space-y-3">
              <!-- Upcoming Events -->
              <div class="space-y-2">
                <div v-for="evt in upcomingEvents" :key="evt.title" class="flex items-center gap-2.5 py-1">
                  <div class="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center shrink-0">
                    <span class="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 leading-none">{{ evt.day }}</span>
                    <span class="text-[7px] font-bold text-zinc-400 uppercase leading-none mt-0.5">{{ evt.month }}</span>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300">{{ evt.title }}</p>
                    <p class="text-[10px] text-zinc-400">{{ evt.location }}</p>
                  </div>
                </div>
              </div>
              <!-- Featured Event Locations -->
              <div class="grid grid-cols-3 gap-2 mt-2">
                <div
                  v-for="card in featuredEvents"
                  :key="card.title"
                  class="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
                  style="aspect-ratio: 2/3;"
                >
                  <img :src="card.img" :alt="card.title" class="absolute inset-0 w-full h-full object-cover">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div class="absolute bottom-0 left-0 right-0 p-1.5 z-10">
                    <p class="text-[8px] font-bold text-white text-center">{{ card.title }}</p>
                    <p class="text-[7px] text-zinc-300 text-center">{{ card.city }}</p>
                  </div>
                </div>
              </div>
              <NuxtLink to="/blog" class="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mt-1" @click="closeMobile">
                Lihat semua Acara <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
              </NuxtLink>
            </div>
          </div>

        </div>

        <!-- Mobile Auth Actions -->
        <div class="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          <div v-if="!user" class="grid grid-cols-2 gap-2">
            <NuxtLink
              to="/terhubung"
              class="flex items-center justify-center py-2.5 px-3 text-xs font-semibold rounded-lg border border-zinc-900 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 transition-colors"
              @click="closeMobile"
            >
              Bergabung
            </NuxtLink>
            <button
              type="button"
              class="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white transition-colors cursor-pointer disabled:opacity-75"
              :disabled="isLoggingIn"
              @click="loginWithGitHub(); closeMobile();"
            >
              <UIcon v-if="isLoggingIn" name="i-lucide-loader-2" class="w-3.5 h-3.5 animate-spin" />
              <UIcon v-else name="i-simple-icons-github" class="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>

          <div v-else class="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            <div class="flex items-center gap-2.5 min-w-0">
              <img
                :src="avatarUrl || `https://github.com/${username || 'ghost'}.png`"
                :alt="username"
                class="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700 shrink-0"
                @error="(e: Event) => { (e.target as HTMLImageElement).src = 'https://github.com/ghost.png' }"
              />
              <div class="min-w-0">
                <p class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{{ fullName }}</p>
                <p class="text-[10px] text-zinc-400 truncate">@{{ username }}</p>
              </div>
            </div>

            <button
              type="button"
              class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
              @click="logout(); closeMobile();"
            >
              <UIcon name="i-lucide-log-out" class="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="pt-4 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>© NLFTs 2026</span>
          <UColorModeButton size="xs" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Semua style indikator garis bawah '::after' lama telah dibersihkan secara total */
/* Seluruh transisi antarmuka kini menggunakan utilitas Tailwind CSS dan optimalisasi transisi GSAP */
</style>