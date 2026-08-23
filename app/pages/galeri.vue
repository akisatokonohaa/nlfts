<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  category: string
  member: string
  role: string
  year: string
  featured?: boolean
  size?: 'large' | 'medium' | 'small'
}

const categories = [
  'All',
  'Web Design',
  'Development',
  'Branding',
  'UI/UX',
  'Creative'
]

const activeCategory = ref('All')
const selectedItem = ref<GalleryItem | null>(null)

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Arc Studio',
    description: 'Minimal digital studio experience with a strong editorial direction.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=85',
    category: 'Web Design',
    member: 'Davin',
    role: 'Product Designer',
    year: '2026',
    featured: true,
    size: 'large'
  },
  {
    id: 2,
    title: 'Mono Interface',
    description: 'A monochrome interface experiment focused on typography and spacing.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85',
    category: 'UI/UX',
    member: 'Raka',
    role: 'UI Designer',
    year: '2026',
    size: 'medium'
  },
  {
    id: 3,
    title: 'Open Source Lab',
    description: 'Experimental developer workspace for an open source project.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    category: 'Development',
    member: 'Fikri',
    role: 'Fullstack Developer',
    year: '2026',
    size: 'small'
  },
  {
    id: 4,
    title: 'North Identity',
    description: 'Visual identity exploration for an independent technology studio.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=85',
    category: 'Branding',
    member: 'Naufal',
    role: 'Brand Designer',
    year: '2026',
    size: 'medium'
  },
  {
    id: 5,
    title: 'Digital Objects',
    description: 'A collection of digital objects and generative visual experiments.',
    image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=1400&q=85',
    category: 'Creative',
    member: 'Rizky',
    role: 'Creative Developer',
    year: '2026',
    size: 'large'
  },
  {
    id: 6,
    title: 'System 01',
    description: 'Design system exploration built around a strict visual language.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85',
    category: 'UI/UX',
    member: 'Alif',
    role: 'Product Designer',
    year: '2026',
    size: 'small'
  },
  {
    id: 7,
    title: 'Terminal',
    description: 'A developer-focused landing page with an experimental interface.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    category: 'Development',
    member: 'Yoga',
    role: 'Frontend Developer',
    year: '2026',
    size: 'medium'
  },
  {
    id: 8,
    title: 'Object / 08',
    description: 'Visual study exploring form, contrast and digital materials.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1400&q=85',
    category: 'Creative',
    member: 'Fauzan',
    role: 'Creative Technologist',
    year: '2026',
    size: 'medium'
  }
]

const filteredItems = ref<GalleryItem[]>(galleryItems)

const filterItems = async (category: string) => {
  if (activeCategory.value === category) return

  const elements = document.querySelectorAll('.gallery-item')

  await gsap.to(elements, {
    opacity: 0,
    y: 12,
    duration: 0.2,
    stagger: 0.025,
    ease: 'power2.in'
  })

  activeCategory.value = category

  filteredItems.value =
    category === 'All'
      ? galleryItems
      : galleryItems.filter(item => item.category === category)

  await nextTick()

  gsap.fromTo(
    '.gallery-item',
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.05,
      ease: 'power3.out'
    }
  )
}

const openItem = (item: GalleryItem) => {
  selectedItem.value = item

  nextTick(() => {
    gsap.fromTo(
      '.lightbox-content',
      {
        opacity: 0,
        scale: 0.97,
        y: 12
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power3.out'
      }
    )
  })

  document.body.style.overflow = 'hidden'
}

const closeItem = () => {
  gsap.to('.lightbox-content', {
    opacity: 0,
    scale: 0.98,
    y: 10,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      selectedItem.value = null
      document.body.style.overflow = ''
    }
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedItem.value) {
    closeItem()
  }
}

let ctx: gsap.Context | null = null

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  ctx = gsap.context(() => {
    const intro = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    })

    intro
      .from('.gallery-eyebrow', {
        opacity: 0,
        y: 12,
        duration: 0.5
      })
      .from(
        '.gallery-title',
        {
          opacity: 0,
          y: 25,
          duration: 0.7
        },
        '-=0.25'
      )
      .from(
        '.gallery-description',
        {
          opacity: 0,
          y: 15,
          duration: 0.55
        },
        '-=0.4'
      )
      .from(
        '.gallery-filter',
        {
          opacity: 0,
          y: 10,
          duration: 0.45
        },
        '-=0.25'
      )

    gsap.utils.toArray<HTMLElement>('.gallery-item').forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          once: true
        }
      })
    })

    gsap.utils.toArray<HTMLElement>('.stat-item').forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true
        }
      })
    })
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  ctx?.revert()
})

watch(selectedItem, value => {
  if (!value) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-white text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50"
  >

    <main>
      <!-- Intro -->
      <section class="mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 lg:px-10 lg:pb-28 lg:pt-32">
        <div class="max-w-3xl">
          <p
            class="gallery-eyebrow mb-5 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Member Gallery
          </p>

          <h1
            class="gallery-title text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            Built by the community.
          </h1>

          <p
            class="gallery-description mt-7 max-w-2xl text-base leading-7 text-zinc-500 dark:text-zinc-400 sm:text-lg sm:leading-8"
          >
            A collection of websites, interfaces, experiments and creative
            work created by members of our community.
          </p>
        </div>

        <!-- Stats -->
        <div
          class="mt-16 grid max-w-2xl grid-cols-2 gap-y-8 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:grid-cols-4"
        >
          <div class="stat-item">
            <p class="text-2xl font-semibold tracking-tight">
              48
            </p>
            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Members
            </p>
          </div>

          <div class="stat-item">
            <p class="text-2xl font-semibold tracking-tight">
              124
            </p>
            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Projects
            </p>
          </div>

          <div class="stat-item">
            <p class="text-2xl font-semibold tracking-tight">
              08
            </p>
            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Categories
            </p>
          </div>

          <div class="stat-item">
            <p class="text-2xl font-semibold tracking-tight">
              2026
            </p>
            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Collection
            </p>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="mx-auto max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
        <!-- Filter -->
        <div
          class="gallery-filter mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-zinc-200 pb-5 dark:border-zinc-800"
        >
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="relative pb-1 text-sm transition-colors"
            :class="
              activeCategory === category
                ? 'text-zinc-950 dark:text-white'
                : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
            "
            @click="filterItems(category)"
          >
            {{ category }}

            <span
              v-if="activeCategory === category"
              class="absolute -bottom-[1px] left-0 h-px w-full bg-zinc-950 dark:bg-white"
            />
          </button>
        </div>

        <!-- Gallery Grid -->
        <div
          class="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="gallery-item group mb-5 break-inside-avoid cursor-pointer"
            @click="openItem(item)"
          >
            <div class="overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="gallery-image block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </div>

            <div class="flex items-start justify-between gap-6 py-4">
              <div class="min-w-0">
                <h2
                  class="truncate text-sm font-medium tracking-tight"
                >
                  {{ item.title }}
                </h2>

                <p
                  class="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {{ item.member }} · {{ item.role }}
                </p>
              </div>

              <span
                class="shrink-0 text-xs text-zinc-400 dark:text-zinc-500"
              >
                {{ item.year }}
              </span>
            </div>
          </article>
        </div>

        <!-- Empty -->
        <div
          v-if="filteredItems.length === 0"
          class="py-24 text-center"
        >
          <p class="text-sm text-zinc-500">
            No work found in this category.
          </p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section
        class="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div
          class="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
        >
          <div
            class="flex flex-col justify-between gap-10 md:flex-row md:items-end"
          >
            <div class="max-w-xl">
              <p
                class="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
              >
                Your work belongs here
              </p>

              <h2
                class="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
              >
                Built something worth sharing?
              </h2>

              <p
                class="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base"
              >
                Share your work with other members and become part of
                the community collection.
              </p>
            </div>

            <NuxtLink
              to="/members"
              class="inline-flex w-fit items-center border border-zinc-300 px-5 py-3 text-sm font-medium transition-colors hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-zinc-950"
            >
              Explore members
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="selectedItem"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 p-5 backdrop-blur-sm dark:bg-zinc-950/95 sm:p-10"
          @click.self="closeItem"
        >
          <div
            class="lightbox-content grid max-h-[90vh] w-full max-w-6xl overflow-hidden lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            <!-- Image -->
            <div
              class="flex max-h-[70vh] items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-900 lg:max-h-[80vh]"
            >
              <img
                :src="selectedItem.image"
                :alt="selectedItem.title"
                class="max-h-full w-full object-contain"
              />
            </div>

            <!-- Information -->
            <div
              class="flex flex-col justify-between border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 lg:border-l-0"
            >
              <div>
                <div class="flex items-start justify-between gap-5">
                  <div>
                    <p
                      class="text-xs uppercase tracking-[0.15em] text-zinc-400"
                    >
                      {{ selectedItem.category }}
                    </p>

                    <h3
                      class="mt-3 text-2xl font-semibold tracking-tight"
                    >
                      {{ selectedItem.title }}
                    </h3>
                  </div>

                  <button
                    type="button"
                    class="text-sm text-zinc-400 transition-colors hover:text-zinc-950 dark:hover:text-white"
                    @click="closeItem"
                  >
                    Esc
                  </button>
                </div>

                <p
                  class="mt-6 text-sm leading-6 text-zinc-500 dark:text-zinc-400"
                >
                  {{ selectedItem.description }}
                </p>
              </div>

              <div
                class="mt-10 border-t border-zinc-200 pt-5 dark:border-zinc-800"
              >
                <div class="flex justify-between">
                  <span class="text-xs text-zinc-400">
                    Member
                  </span>

                  <span class="text-xs font-medium">
                    {{ selectedItem.member }}
                  </span>
                </div>

                <div class="mt-3 flex justify-between">
                  <span class="text-xs text-zinc-400">
                    Role
                  </span>

                  <span class="text-xs font-medium">
                    {{ selectedItem.role }}
                  </span>
                </div>

                <div class="mt-3 flex justify-between">
                  <span class="text-xs text-zinc-400">
                    Year
                  </span>

                  <span class="text-xs font-medium">
                    {{ selectedItem.year }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* Prevent images from becoming visually inconsistent
   while their dimensions are being resolved. */
.gallery-image {
  min-height: 220px;
}

@media (min-width: 640px) {
  .gallery-image {
    min-height: 260px;
  }
}
</style>