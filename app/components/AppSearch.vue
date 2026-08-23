<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

type SearchItem = {
  id: string
  label: string
  description?: string
  icon?: string
  to: string
}

const props = defineProps<{
  files: any[]
  navigation: any[]
  links: any[]
}>()

const isOpen = defineModel<boolean>('open', {
  default: false,
})

const query = ref('')
const input = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

/* ---------------------------------------------
 * Search data
 * --------------------------------------------- */

const contentItems = computed<SearchItem[]>(() =>
  (props.files || []).map(file => ({
    id: file.id,
    label: file.title || 'Halaman',
    description: file.titles?.join(' › ') || 'Dokumentasi',
    icon: 'i-lucide-hash',
    to: file.id.split('#')[0],
  })),
)

const navigationItems = computed<SearchItem[]>(() => {
  const flatten = (items: any[]): SearchItem[] => {
    return items.flatMap(item => [
      {
        id: item.path,
        label: item.title || 'Halaman',
        description: item.description || 'Dokumentasi',
        icon: 'i-lucide-file-text',
        to: item.path,
      },
      ...(item.children
        ? flatten(item.children)
        : []),
    ])
  }

  return flatten(props.navigation || [])
})

const quickLinkItems = computed<SearchItem[]>(() =>
  (props.links || []).map(link => ({
    id: link.to,
    label: link.label || link.title || 'Tautan',
    description: 'Akses Cepat',
    icon: link.icon || 'i-lucide-arrow-up-right',
    to: link.to,
  })),
)

const allItems = computed(() => [
  ...quickLinkItems.value,
  ...navigationItems.value,
  ...contentItems.value,
])

/* ---------------------------------------------
 * Search
 * --------------------------------------------- */

const results = computed<SearchItem[]>(() => {
  const search = query.value.trim().toLowerCase()

  if (!search) return []

  return allItems.value
    .filter(item => {
      const label = String(item.label || '').toLowerCase()
      const description = String(
        item.description || '',
      ).toLowerCase()

      return (
        label.includes(search) ||
        description.includes(search)
      )
    })
    .slice(0, 8)
})

const hasResults = computed(() => results.value.length > 0)

/* ---------------------------------------------
 * Open / Close
 * --------------------------------------------- */

const openSearch = async () => {
  isOpen.value = true

  await nextTick()

  input.value?.focus()
}

const closeSearch = () => {
  isOpen.value = false
  query.value = ''
  selectedIndex.value = 0
}

/* ---------------------------------------------
 * Select
 * --------------------------------------------- */

const selectItem = (item: SearchItem) => {
  if (!item?.to) return

  closeSearch()
  navigateTo(item.to)
}

/* ---------------------------------------------
 * Keyboard
 * --------------------------------------------- */

const handleKeyboard = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()

  if (
    (event.metaKey || event.ctrlKey) &&
    key === 'k'
  ) {
    event.preventDefault()

    if (isOpen.value) {
      closeSearch()
    } else {
      openSearch()
    }

    return
  }

  if (!isOpen.value) return

  if (key === 'escape') {
    event.preventDefault()
    closeSearch()
    return
  }

  if (key === 'arrowdown') {
    event.preventDefault()

    if (!results.value.length) return

    selectedIndex.value =
      (selectedIndex.value + 1) %
      results.value.length

    return
  }

  if (key === 'arrowup') {
    event.preventDefault()

    if (!results.value.length) return

    selectedIndex.value =
      selectedIndex.value <= 0
        ? results.value.length - 1
        : selectedIndex.value - 1

    return
  }

  if (key === 'enter') {
    event.preventDefault()

    const item =
      results.value[selectedIndex.value]

    if (item) {
      selectItem(item)
    }
  }
}

watch(query, () => {
  selectedIndex.value = 0
})

watch(isOpen, async value => {
  if (!value) return

  await nextTick()

  input.value?.focus()
})

onMounted(() => {
  window.addEventListener(
    'keydown',
    handleKeyboard,
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'keydown',
    handleKeyboard,
  )
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999]"
      >
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Tutup pencarian"
          class="
            absolute inset-0
            h-full w-full
            cursor-default
            bg-black/40
            backdrop-blur-[2px]
            dark:bg-black/75
          "
          @click="closeSearch"
        />

        <!-- Search Palette -->
        <div
          class="
            absolute left-1/2 top-0
            flex h-full w-full
            -translate-x-1/2
            flex-col
            overflow-hidden

            bg-white
            text-zinc-900

            dark:bg-[#0d0d0d]
            dark:text-zinc-100

            sm:top-[12vh]
            sm:h-auto
            sm:max-h-[70vh]
            sm:w-[calc(100%-48px)]
            sm:max-w-[680px]

            sm:rounded-[14px]

            border
            border-zinc-200
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]

            dark:border-white/[0.09]
            dark:shadow-[0_30px_100px_rgba(0,0,0,0.65)]
          "
        >

          <!-- Search Input -->
          <div
            class="
              flex h-[64px]
              shrink-0
              items-center

              border-b
              border-zinc-200

              px-5

              dark:border-white/[0.07]
            "
          >
            <UIcon
              name="i-lucide-search"
              class="
                mr-3
                size-[18px]
                shrink-0
                text-zinc-400

                dark:text-white/30
              "
            />

            <input
              ref="input"
              v-model="query"
              type="search"
              autocomplete="off"
              spellcheck="false"
              placeholder="Cari dokumentasi..."
              class="
                h-full
                min-w-0
                flex-1
                bg-transparent
                text-[15px]
                font-medium
                tracking-[-0.01em]

                text-zinc-900
                outline-none

                placeholder:text-zinc-400

                dark:text-white
                dark:placeholder:text-white/25
              "
            />

            <!-- Desktop ESC -->
            <button
              type="button"
              class="
                ml-3
                hidden
                rounded-md
                border
                border-zinc-200
                bg-zinc-50
                px-2
                py-1
                text-[10px]
                font-medium
                text-zinc-400

                hover:bg-zinc-100

                dark:border-white/[0.08]
                dark:bg-white/[0.025]
                dark:text-white/30
                dark:hover:bg-white/[0.05]

                sm:block
              "
              @click="closeSearch"
            >
              ESC
            </button>

            <!-- Mobile close -->
            <button
              type="button"
              class="
                ml-2
                rounded-md
                p-1

                text-zinc-400
                hover:bg-zinc-100
                hover:text-zinc-700

                dark:text-white/30
                dark:hover:bg-white/[0.06]
                dark:hover:text-white/70

                sm:hidden
              "
              aria-label="Tutup"
              @click="closeSearch"
            >
              <UIcon
                name="i-lucide-x"
                class="size-5"
              />
            </button>
          </div>

          <!-- Results -->
          <div
            class="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              p-2
            "
          >

            <!-- Initial -->
            <div
              v-if="!query.trim()"
              class="
                flex
                min-h-[240px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <UIcon
                name="i-lucide-search"
                class="
                  mb-4
                  size-5
                  text-zinc-300

                  dark:text-white/15
                "
              />

              <p
                class="
                  text-[13px]
                  font-medium

                  text-zinc-600

                  dark:text-white/55
                "
              >
                Cari dokumentasi
              </p>

              <p
                class="
                  mt-1
                  max-w-[280px]
                  text-[11px]
                  leading-relaxed

                  text-zinc-400

                  dark:text-white/20
                "
              >
                Cari halaman, dokumentasi,
                atau informasi lainnya.
              </p>
            </div>

            <!-- No results -->
            <div
              v-else-if="!hasResults"
              class="
                flex
                min-h-[240px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <UIcon
                name="i-lucide-search-x"
                class="
                  mb-4
                  size-5

                  text-zinc-300

                  dark:text-white/15
                "
              />

              <p
                class="
                  text-[13px]
                  font-medium

                  text-zinc-600

                  dark:text-white/55
                "
              >
                Tidak ada hasil
              </p>

              <p
                class="
                  mt-1
                  max-w-[280px]
                  text-[11px]
                  leading-relaxed

                  text-zinc-400

                  dark:text-white/20
                "
              >
                Tidak menemukan apa pun untuk
                "{{ query }}".
              </p>
            </div>

            <!-- Search results -->
            <div v-else>
              <div
                class="
                  px-3
                  pb-2
                  pt-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]

                  text-zinc-400

                  dark:text-white/20
                "
              >
                Hasil Pencarian
              </div>

              <button
                v-for="(item, index) in results"
                :key="item.id"
                type="button"
                class="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-[9px]
                  px-3
                  py-3
                  text-left
                  outline-none
                  transition-none
                "
                :class="
                  selectedIndex === index
                    ? `
                      bg-zinc-100
                      dark:bg-white/[0.07]
                    `
                    : `
                      hover:bg-zinc-50
                      dark:hover:bg-white/[0.04]
                    `
                "
                @mouseenter="
                  selectedIndex = index
                "
                @click="selectItem(item)"
              >
                <!-- Icon -->
                <div
                  class="
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-md

                    border
                    border-zinc-200
                    bg-zinc-50

                    dark:border-white/[0.07]
                    dark:bg-white/[0.025]
                  "
                >
                  <UIcon
                    :name="
                      item.icon ||
                      'i-lucide-file-text'
                    "
                    class="
                      size-4

                      text-zinc-400

                      dark:text-white/30
                    "
                  />
                </div>

                <!-- Text -->
                <div
                  class="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    class="
                      truncate
                      text-[13px]
                      font-medium
                    "
                    :class="
                      selectedIndex === index
                        ? `
                          text-zinc-900
                          dark:text-white
                        `
                        : `
                          text-zinc-700
                          dark:text-white/70
                        `
                    "
                  >
                    {{ item.label }}
                  </div>

                  <div
                    v-if="item.description"
                    class="
                      mt-0.5
                      truncate
                      text-[11px]

                      text-zinc-400

                      dark:text-white/25
                    "
                  >
                    {{ item.description }}
                  </div>
                </div>

                <!-- Arrow -->
                <UIcon
                  v-if="selectedIndex === index"
                  name="i-lucide-arrow-up-right"
                  class="
                    size-3.5
                    shrink-0

                    text-zinc-400

                    dark:text-white/25
                  "
                />
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="
              flex
              h-[48px]
              shrink-0
              items-center
              justify-between

              border-t
              border-zinc-200

              px-4

              dark:border-white/[0.07]
            "
          >
            <!-- Algolia -->
            <div
              class="
                flex
                items-center
                gap-2

                text-zinc-400

                dark:text-white/25
              "
            >
              <span
                class="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.13em]
                "
              >
                Search by
              </span>

              <div
                class="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <UIcon
                  name="i-simple-icons-algolia"
                  class="
                    size-3.5

                    text-zinc-500

                    dark:text-white/35
                  "
                />

                <span
                  class="
                    text-[11px]
                    font-semibold
                    tracking-tight

                    text-zinc-500

                    dark:text-white/40
                  "
                >
                  algolia
                </span>
              </div>
            </div>

            <!-- Keyboard -->
            <div
              class="
                hidden
                items-center
                gap-3

                sm:flex
              "
            >
              <!-- Navigation -->
              <div
                class="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <kbd
                  class="
                    rounded
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-1.5
                    py-0.5
                    font-mono
                    text-[9px]
                    text-zinc-400

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                    dark:text-white/35
                  "
                >
                  ↑
                </kbd>

                <kbd
                  class="
                    rounded
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-1.5
                    py-0.5
                    font-mono
                    text-[9px]
                    text-zinc-400

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                    dark:text-white/35
                  "
                >
                  ↓
                </kbd>

                <span
                  class="
                    ml-0.5
                    text-[10px]

                    text-zinc-400

                    dark:text-white/20
                  "
                >
                  Navigate
                </span>
              </div>

              <!-- Select -->
              <div
                class="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <kbd
                  class="
                    rounded
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-1.5
                    py-0.5
                    font-mono
                    text-[9px]
                    text-zinc-400

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                    dark:text-white/35
                  "
                >
                  ↵
                </kbd>

                <span
                  class="
                    text-[10px]

                    text-zinc-400

                    dark:text-white/20
                  "
                >
                  Select
                </span>
              </div>

              <!-- Close -->
              <div
                class="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <kbd
                  class="
                    rounded
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-1.5
                    py-0.5
                    font-mono
                    text-[9px]
                    text-zinc-400

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                    dark:text-white/35
                  "
                >
                  ESC
                </kbd>

                <span
                  class="
                    text-[10px]

                    text-zinc-400

                    dark:text-white/20
                  "
                >
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>