<script setup lang="ts">
import gsap from 'gsap'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hero = ref(null)

const neverOneChars = ['N', 'e', 'v', 'e', 'r']
const sayChars = ['S', 'a', 'y']
const neverTwoChars = ['N', 'e', 'v', 'e', 'r']

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const neverOne = gsap.utils.toArray('.never-one-char')
    const say = gsap.utils.toArray('.say-char')
    const neverTwo = gsap.utils.toArray('.never-two-char')

    /*
     * Initial state
     */
    gsap.set(neverOne, {
      x: -80,
      opacity: 0,
    })

    gsap.set(say, {
      y: -100,
      opacity: 0,
    })

    gsap.set(neverTwo, {
      opacity: 0,
      filter: 'blur(18px)',
      y: 0,
    })

    /*
     * MASTER TIMELINE
     */
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    })

    /*
     * 1. NEVER
     *
     * Setiap huruf datang dari kiri.
     * Ada sedikit overlap sehingga terasa seperti
     * huruf berikutnya "keluar" dari huruf sebelumnya.
     */
    tl.to(neverOne, {
      x: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.14,
      ease: 'power3.out',
    })

    /*
     * 2. SAY
     *
     * Muncul dari atas ke bawah.
     */
    tl.to(
      say,
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power4.out',
      },
      '+=0.15'
    )

    /*
     * Y GLITCH
     *
     * Karena Y adalah index 2.
     */
    const y = say[2]

    tl.to(
      y,
      {
        keyframes: [
          {
            opacity: 0.2,
            x: -5,
            skewX: -12,
            duration: 0.05,
          },
          {
            opacity: 1,
            x: 4,
            skewX: 8,
            duration: 0.04,
          },
          {
            opacity: 0.15,
            x: -3,
            skewX: -5,
            duration: 0.05,
          },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 0.06,
          },
        ],
      },
      '+=0.05'
    )

    /*
     * Sedikit glitch kedua supaya tidak
     * terasa seperti animasi biasa.
     */
    tl.to(
      y,
      {
        keyframes: [
          {
            opacity: 0.4,
            x: 3,
            duration: 0.04,
          },
          {
            opacity: 1,
            x: -2,
            duration: 0.04,
          },
          {
            opacity: 0.1,
            x: 0,
            duration: 0.035,
          },
          {
            opacity: 1,
            duration: 0.05,
          },
        ],
      },
      '+=0.08'
    )

    /*
     * 3. NEVER KEDUA
     *
     * Ganjil:
     * N, v, r -> dari atas
     *
     * Genap:
     * e, e -> dari bawah
     *
     * Semua dimulai dengan blur.
     */
    neverTwo.forEach((char, index) => {
      const fromY = index % 2 === 0 ? -100 : 100

      tl.to(
        char,
        {
          y: fromY,
          opacity: 0,
          filter: 'blur(18px)',
          duration: 0,
        },
        '<'
      )
    })

    tl.to(
      neverTwo,
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: {
          each: 0.12,
          from: 'start',
        },
        ease: 'power4.out',
      },
      '+=0.12'
    )

    /*
     * Tambahkan sedikit settle effect
     * pada Never terakhir.
     */
    tl.to(
      neverTwo,
      {
        y: 0,
        scale: 1,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.out',
      },
      '>-0.15'
    )
  }, hero.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

// SEO Implementation
useSeoMeta({
  title: 'NLFTs — Komunitas Developer & Startup Teknologi Indonesia',
  ogTitle: 'NLFTs — Komunitas Developer & Startup Teknologi Indonesia',
  description: 'NLFTs adalah startup berbasis komunitas developer open-source terbesar di Indonesia. Bergabung dengan 100+ developer aktif, kolaborasi proyek, dan bangun teknologi generasi berikutnya bersama.',
  ogDescription: 'Komunitas developer open-source Indonesia. 100+ kontributor aktif, proyek open-source, dan ekosistem teknologi modern berbasis Nuxt, Vue, TypeScript.',
  ogImage: 'https://nlfts.dev/og/main.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogUrl: 'https://nlfts.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NLFTs — Komunitas Developer Indonesia',
  twitterDescription: 'Startup berbasis komunitas developer open-source Indonesia. Bergabung dengan 100+ developer aktif.',
  twitterImage: 'https://nlfts.dev/og/main.png',
})

const videoFrame = ref<HTMLIFrameElement | null>(null)
const videoPlaying = ref(true)

const toggleVideo = () => {
  const command = videoPlaying.value ? 'pauseVideo' : 'playVideo'
  videoFrame.value?.contentWindow?.postMessage(JSON.stringify({
    event: 'command',
    func: command,
    args: []
  }), '*')
  videoPlaying.value = !videoPlaying.value
}

</script>

<template>
<main>
  <div class="relative overflow-hidden bg-[#ededed] text-gray-950 dark:bg-[#090909] dark:text-white">
      <section
    ref="hero"
    class="relative mx-1 mt-4 overflow-hidden rounded-[18px] bg-[#111111] px-4 pb-24 pt-12 text-white transition-colors duration-500 sm:mx-3 sm:mt-5 sm:pb-32 sm:pt-16"
  >
    <div
      class="relative z-10 mx-auto flex max-w-[1500px] flex-col items-center text-center"
    >
      <div class="flex items-center gap-3 text-sm font-medium sm:gap-4 sm:text-base">
        <span>Nuxt Indonesia</span>

        <span
          class="rounded border border-zinc-400 px-2 py-1 font-normal leading-none dark:border-zinc-600"
        >
          Aug 22, 2026
        </span>

        <span class="hidden sm:inline">
          Developer Community
        </span>
      </div>
      <h1
        class="mt-12 max-w-[1200px] text-[clamp(4.25rem,11.8vw,11.5rem)] font-bold uppercase leading-[0.83] tracking-[-0.07em] sm:mt-14"
      >
        <!-- BARIS PERTAMA: Never Say -->
        <span class="flex items-baseline justify-center whitespace-nowrap">
          <!-- NEVER -->
          <span
            ref="neverOne"
            aria-label="Never"
          >
            <span
              v-for="(char, index) in neverOneChars"
              :key="`never-one-${index}`"
              class="never-one-char inline-block"
            >
              {{ char }}
            </span>
          </span>

          <!-- SAY -->
          <span
            ref="say"
            class="ml-[0.08em]"
            aria-label="Say"
          >
            <span
              v-for="(char, index) in sayChars"
              :key="`say-${index}`"
              class="say-char inline-block"
            >
              {{ char }}
            </span>
          </span>
        </span>

        <!-- BARIS KEDUA: Never -->
        <span
          ref="neverTwo"
          class="mt-1 block whitespace-nowrap"
          aria-label="Never"
        >
          <span
            v-for="(char, index) in neverTwoChars"
            :key="`never-two-${index}`"
            class="never-two-char inline-block"
          >
            {{ char }}
          </span>
        </span>
      </h1>
    </div>
  </section>
</div>

  <!-- Feature grid -->
  <section class="relative mx-1 mt-10 overflow-hidden rounded-[18px] bg-[#f2f2f2] px-3 py-3 text-zinc-900 transition-colors duration-500 dark:bg-[#111111] dark:text-white sm:mx-3 sm:mt-14 sm:px-7 sm:py-5">
    <div class="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#cfcfcf_0.8px,transparent_0.8px)] [background-size:12px_12px] dark:opacity-40 dark:[background-image:radial-gradient(#474747_0.8px,transparent_0.8px)]" />
    <div class="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-[350px_350px]">
      <article class="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[6px] border border-zinc-300 bg-white p-7 dark:border-zinc-700/70 dark:bg-[#151515] lg:col-span-8 lg:row-span-1">
        <div class="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-[4px] bg-[#1A1A1A]">
          <Icon name="simple-icons:nuxt" class="h-8 w-8 text-[#00DC82]" />
        </div>
        <div class="absolute left-16 top-16 h-7 w-7 rounded-[3px] bg-[#ff5b22]" />
        <div class="max-w-[380px]">
          <h2 class="text-base font-semibold tracking-tight">Komunitas untuk workflow developer modern</h2>
          <p class="mt-2 text-sm leading-[1.25] text-zinc-600 dark:text-zinc-400">Berbagi pengetahuan, membangun website, dan berkolaborasi melalui Git, open source, serta tools yang dipakai developer setiap hari.</p>
        </div>
      </article>

      <article class="flex min-h-[300px] flex-col rounded-[6px] bg-[#ff5b22] p-7 text-white lg:col-span-4 lg:row-span-1">
        <h2 class="max-w-[300px] text-base font-semibold leading-tight">Satu ruang untuk ide, kode, dan kolaborasi</h2>
        <p class="mt-2 max-w-[315px] text-sm font-medium leading-[1.25]">Terhubung dengan developer Indonesia untuk bertukar insight, menemukan rekan, dan menciptakan solusi digital yang berdampak.</p>
      </article>

      <article class="relative flex min-h-[300px] flex-col justify-end rounded-[6px] border border-zinc-300 bg-white p-7 dark:border-zinc-700/70 dark:bg-[#151515] lg:col-span-4 lg:row-span-1">
        <div class="max-w-[300px]">
          <h2 class="text-base font-semibold tracking-tight">Ruang diskusi private ( non-kompromi )</h2>
          <p class="mt-2 text-sm leading-[1.25] text-zinc-600 dark:text-zinc-400">Ruang privat untuk diskusi terbuka, pertukaran ide, dan perdebatan teknis tanpa kompromi terhadap kualitas maupun kebebasan berpikir.</p>
        </div>
      </article>

      <article class="relative min-h-[350px] overflow-hidden rounded-[6px] border border-zinc-300 bg-white p-7 dark:border-zinc-700/70 dark:bg-[#151515] lg:col-span-8 lg:row-span-1">
        <div class="max-w-[380px]">
          <h2 class="text-base font-semibold tracking-tight">Melangkah bersama teknologi paling mutakhir</h2>
          <p class="mt-2 text-sm leading-[1.25] text-zinc-600 dark:text-zinc-400">Eksplorasi AI, cloud, framework modern, dan tools terbaru untuk membangun pengalaman web yang lebih cerdas, cepat, dan relevan.</p>
        </div>
        <div class="absolute bottom-0 right-0 w-[62%] max-w-[560px] translate-y-1 overflow-hidden rounded-tl-[12px] border border-zinc-300 bg-zinc-100 shadow-2xl dark:border-zinc-700 dark:bg-[#191919]">
          <div class="border-b border-zinc-300 px-4 py-3 text-[11px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Menyiapkan ruang kolaborasi developer...</div>
          <div class="space-y-2 px-4 py-3 text-[11px] text-zinc-600 dark:text-zinc-500">
            <div class="text-[#ff5b22]"><span class="mr-2 inline-block h-2 w-2 rounded-full bg-[#ff5b22]" />3 project kolaborasi aktif</div>
            <div><span class="mr-2 text-zinc-500 dark:text-zinc-600">↳</span><strong class="rounded bg-zinc-200 px-2 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">web-community</strong><span class="mx-2">→</span>berbagi insight</div>
            <div><span class="mr-2 text-zinc-500 dark:text-zinc-600">↳</span><strong class="rounded bg-zinc-200 px-2 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">open-source</strong><span class="mx-2">→</span>membangun solusi</div>
            <div class="pt-1 text-[#ff5b22]">▦ Eksplorasi teknologi modern...</div>
          </div>
          <div class="border-t border-zinc-300 px-3 py-3 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">&gt; <span class="ml-1 inline-block h-3 w-1 animate-pulse bg-zinc-500 align-middle dark:bg-zinc-400" /></div>
        </div>
      </article>
    </div>
  </section>

  <ProfileSection />
  <BlogSection />
  <DevSection />
  <TestimonialsSection />
  <Cta />
</main>
</template>
<style scoped>
::selection {
  background: rgba(16, 185, 129, 0.3);
  color: inherit;
}
</style>
