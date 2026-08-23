<template>
  <main
    ref="page"
    class="members-page relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#ededed] text-gray-950 transition-colors duration-500 dark:bg-[#090909] dark:text-white"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:100%_102px,102px_100%] [mask-image:linear-gradient(to_bottom,black_20%,transparent_96%)] dark:opacity-70 dark:[background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]"
      aria-hidden="true"
    />

    <div class="hero-content relative mx-auto flex min-h-[115vh] w-full max-w-[1600px] items-center justify-center px-6 pb-20 pt-24 sm:px-10">
        <p class="hero-item mb-5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8ed1b0]">
          <span class="h-1.5 w-1.5 rounded-full bg-[#8ed1b0] shadow-[0_0_14px_rgba(142,209,176,0.75)]" />
          NLFTs talent network
        </p>
        <h1 class="hero-item text-[clamp(2.5rem,5.2vw,5rem)] font-medium leading-[0.9] tracking-[-0.065em]">
          Hire Mobile Devs<br>
          <span class="text-[#b8b7b2]">Differently</span>
        </h1>
        <p class="hero-item mx-auto mt-8 max-w-[390px] text-[clamp(0.95rem,1.7vw,1.25rem)] font-medium leading-[1.2] text-[#989894]">
          Engineers who own outcomes —<br>
          CTO-screened with ≤ 5% pass rate for skill,<br class="hidden sm:block">
          mindset, and long-term fit.
        </p>
        <NuxtLink
          to="/terhubung"
          class="hero-item mt-12 inline-flex items-center gap-3 rounded-md bg-[#f4f2ed] px-7 py-3.5 font-mono text-sm text-[#191a19] transition hover:-translate-y-1 hover:bg-[#8ed1b0]"
        >
          Hire Talent
          <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4" />
        </NuxtLink>

      <div class="image-panel image-panel--left absolute left-[-3rem] top-[19%] h-[12rem] w-[9rem] overflow-hidden rounded-xl bg-black shadow-2xl sm:left-[-2rem] sm:h-[14rem] sm:w-[10.5rem] lg:left-[-1rem]">
        <img src="/images/mas.webp" alt="Aplikasi mobile NLFTs" class="h-full w-full object-cover" loading="lazy">
      </div>

      <div class="image-panel image-panel--studio absolute left-[23%] top-[-2rem] hidden h-[10rem] w-[14rem] -rotate-2 overflow-hidden rounded-xl sm:block">
        <img src="/images/studio.webp" alt="Developer sedang bekerja" class="h-full w-full object-cover saturate-75 contrast-110" loading="eager">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      <div class="image-panel image-panel--phone absolute right-[9%] top-[13%] h-[13.5rem] w-[9.75rem] rotate-2 overflow-hidden rounded-xl bg-[#efede4] shadow-2xl sm:right-[10%] sm:h-[15rem] sm:w-[10.75rem]">
        <img src="/images/mas.webp" alt="Tampilan produk digital NLFTs" class="h-full w-full object-cover" loading="lazy">
      </div>

      <div class="image-panel image-panel--portrait absolute bottom-[-3rem] right-[-1rem] h-[16rem] w-[11rem] rotate-2 overflow-hidden rounded-xl shadow-2xl sm:right-[2%] sm:h-[18rem] sm:w-[12rem] lg:right-[4%]">
        <img src="/team/nlfts.webp" alt="Member komunitas NLFTs" class="h-full w-full object-cover" loading="lazy">
      </div>

      <div class="absolute bottom-5 left-6 right-6 flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-[#646661] sm:left-10 sm:right-10">
        <span>01 — 04</span>
        <span class="hidden sm:inline">Developer community / Indonesia</span>
      </div>
    </div>

    <section class="mx-auto w-full max-w-[1600px] px-6 pb-24 sm:px-10" aria-labelledby="members-gallery-title">
      <div class="mb-8 flex items-end justify-between border-b border-zinc-300 pb-4 dark:border-zinc-800">
        <div>
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8ed1b0]">Selected workspaces</p>
          <h2 id="members-gallery-title" class="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">Built by people who care.</h2>
        </div>
        <span class="font-mono text-[10px] text-[#777973]">09 / 09</span>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        <a
          v-for="(photo, index) in photos"
          :key="photo.id"
          :href="photo.link"
          target="_blank"
          rel="noreferrer"
          class="gallery-item group relative overflow-hidden rounded-lg bg-zinc-200 dark:bg-[#242524]"
          :class="index < 4 ? 'aspect-[4/3]' : 'aspect-[4/5]'"
        >
          <img
            :src="photo.url"
            :alt="photo.alt"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          >
          <span class="absolute bottom-3 left-3 font-mono text-[9px] text-white/70">0{{ index + 1 }}</span>
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const page = ref<HTMLElement | null>(null)
const config = useRuntimeConfig()
const photos = ref([
  { id: 'fallback-1', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85', alt: 'Modern workspace', link: 'https://unsplash.com' },
  { id: 'fallback-2', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85', alt: 'Creative studio', link: 'https://unsplash.com' },
  { id: 'fallback-3', url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=85', alt: 'Developer workspace', link: 'https://unsplash.com' },
  { id: 'fallback-4', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85', alt: 'Bright office interior', link: 'https://unsplash.com' },
  { id: 'fallback-5', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85', alt: 'Laptop and code', link: 'https://unsplash.com' },
  { id: 'fallback-6', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85', alt: 'Team collaboration', link: 'https://unsplash.com' },
  { id: 'fallback-7', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85', alt: 'Team workspace', link: 'https://unsplash.com' },
  { id: 'fallback-8', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85', alt: 'People working together', link: 'https://unsplash.com' },
  { id: 'fallback-9', url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85', alt: 'Product planning session', link: 'https://unsplash.com' }
])

onMounted(() => {
  if (!page.value) return

  if (config.public.unsplashAccessKey) {
    $fetch<Array<{ id: string, urls: { regular: string }, alt_description: string | null, links: { html: string } }>>('https://api.unsplash.com/photos/random', {
      query: {
        client_id: config.public.unsplashAccessKey,
        query: 'developer workspace technology team',
        count: 9,
        orientation: 'landscape'
      }
    }).then((result) => {
      photos.value = result.map(photo => ({
        id: photo.id,
        url: photo.urls.regular,
        alt: photo.alt_description || 'Workspace komunitas NLFTs',
        link: photo.links.html
      }))
    }).catch(() => undefined)
  }

  gsap.fromTo(
    page.value.querySelectorAll('.hero-item'),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
  )
  gsap.fromTo(
    page.value.querySelectorAll('.image-panel'),
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
  )
})
useSeoMeta({
  title: 'Members — NLFTs Developer Network',
  description: 'Kenali developer dan kontributor yang membangun ekosistem NLFTs.',
  ogTitle: 'Members — NLFTs Developer Network',
  ogDescription: 'Developer yang memiliki hasil kerja, rasa ingin tahu, dan standar tinggi.',
  ogImage: 'https://nlfts.dev/og/members.png',
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://nlfts.dev/members' }]
})
</script>

