<script setup lang="ts">

type Contributor = {
  id: number
  name: string
  avatar: string
  moto: string
  role: string
  focus: string
  github: string
  techStack: string[]
}

type ContributorInput = Omit<Contributor, 'id' | 'role' | 'focus' | 'github'> & {
  role?: string
  focus?: string
  github?: string
}

const contributors: ContributorInput[] = [
  {
    name: 'Nairha',
    avatar: 'https://avatars.githubusercontent.com/u/204519754?s=130&v=4',
    moto: 'Desain yang indah dimulai dari pikiran yang jernih',
    techStack: ['framer', 'angular', 'typescript', 'once ui'],
    focus: 'cloud engineering',
    role: "Founder"
  },
  {
    name: 'davingm',
    avatar: 'https://avatars.githubusercontent.com/u/228851591?v=4',
    moto: 'Kode adalah puisi, dan saya menulis yang indah',
    techStack: ['Vue', 'Nuxt', 'TypeScript', 'Tailwind'],
    role: 'Maintainer',
    focus: 'Developer Experience',
    github: 'https://github.com/davingm'
  },
  {
    name: 'sidikqst',
    avatar: 'https://avatars.githubusercontent.com/u/230048582?s=130&v=4',
    moto: 'Tidak ada yang tidak mungkin bagiku',
    techStack: ['AWS', 'Terraform', 'nuxt', 'Kubernetes', 'vuejs'],
    role: 'Nuxt team',
    focus: 'Nuxt Core System',
    github: 'https://github.com/davingm'
  },
  {
    name: 'Radietya',
    avatar: 'https://avatars.githubusercontent.com/u/226198461?s=130&v=4',
    moto: 'Backend yang tangguh, frontend yang indah',
    techStack: ['laravel', 'django', 'python', 'react', 'php', 'javascript'],
    role: 'CTO NLFTs',
    focus: 'Developer Experience',
    github: 'https://github.com/davingm'
  },
  {
    name: 'Cery',
    avatar: 'https://avatars.githubusercontent.com/u/190081649?s=130&v=4',
    moto: 'Bangun sesuatu yang berarti',
    techStack: ['Node.js', 'hexo', 'rust', 'git']
  },
  {
    name: 'yanfe1',
    avatar: 'https://avatars.githubusercontent.com/u/238488059?s=130&v=4',
    moto: 'Frontend dengan sentuhan artistik',
    techStack: ['React', 'Next.js', 'Chakra UI', 'Jest']
  },
  {
    name: 'Mugi',
    avatar: 'https://avatars.githubusercontent.com/u/289261759?s=130&v=4',
    moto: 'Data adalah cerita, saya pandai bercerita',
    techStack: ['html', 'sass', 'SQL', 'Tableau']
  },
  {
    name: 'titu',
    avatar: 'https://avatars.githubusercontent.com/u/222330932?s=130&v=4',
    moto: 'Kesederhanaan adalah kecanggihan tertinggi',
    techStack: ['Go', 'net', 'Kafka', 'Redis']
  },
  {
    name: 'bagas',
    avatar: 'https://avatars.githubusercontent.com/u/284604593?s=130&v=4',
    moto: 'Mobile first, karena dunia ada di genggaman',
    techStack: ['Flutter', 'Dart', 'Firebase', 'GraphQL']
  },
  {
    name: 'fandy',
    avatar: 'https://avatars.githubusercontent.com/u/216720543?s=130&v=4',
    moto: 'Keamanan bukan fitur, tapi fondasi',
    techStack: ['TypeScript', 'astrojs', 'pyqt', 'docker']
  },
  {
    name: 'Ajrin',
    avatar: 'https://github.com/BeedBest.png',
    moto: 'Tulis kode yang bisa dibaca manusia',
    techStack: ['html', 'css', 'javascript']
  },
  {
    name: 'teguh',
    avatar: 'https://avatars.githubusercontent.com/u/228839856?s=130&v=4',
    moto: 'AI untuk semua orang',
    techStack: ['TensorFlow', 'php', 'laravel', 'AWS', 'tailwind']
  },
  {
    name: 'Ahmad',
    avatar: 'https://avatars.githubusercontent.com/u/225441519?s=130&v=4',
    moto: 'Dari ide ke produk dalam hitungan jam',
    techStack: ['PHP', 'Laravel', 'Livewire', 'MySQL']
  },
  {
    name: 'Rehan',
    avatar: 'https://avatars.githubusercontent.com/u/218329504?s=130&v=4',
    moto: 'Javascript ada di mana-mana',
    techStack: ['JavaScript', 'Node', 'next', 'laravel', 'react']
  },
  {
    name: 'Habsy',
    avatar: 'https://github.com/clarkaiden.png',
    moto: 'Rapi, cepat, dan efisien',
    techStack: ['html', 'css', 'javascript']
  },
  {
    name: 'Vahlzzz',
    avatar: 'https://avatars.githubusercontent.com/u/202130049?s=130&v=4',
    moto: 'Desain sistem yang scalable',
    techStack: ['nuxt', 'threejs', 'typescript', 'laravel', 'vuejs']
  },
  {
    name: 'hanif',
    avatar: 'https://avatars.githubusercontent.com/u/232500114?s=130&v=4',
    moto: 'Kode bersih, hati tenang',
    techStack: ['laravel', 'php', 'tailwind', 'livewire']
  },
  {
    name: 'Bara',
    avatar: 'https://avatars.githubusercontent.com/u/228843429?s=130&v=4',
    moto: 'Desain yang inklusif untuk semua',
    techStack: ['nuxtjs', 'vuejs', 'typescript', 'javascript']
  },
  {
    name: 'Destkaa',
    avatar: 'https://avatars.githubusercontent.com/u/228332586?s=130&v=4',
    moto: 'Analisis data mengubah dunia',
    techStack: ['nuxt', 'java', 'tailwind', 'postgresql']
  },
  {
    name: 'Fakhri',
    avatar: 'https://avatars.githubusercontent.com/u/228840381?s=130&v=4',
    moto: 'Kode adalah alat, bukan tujuan',
    techStack: ['Go', 'laravel', 'php', 'nuxt', 'vuejs']
  },
  {
    name: 'Ilaman',
    avatar: 'https://avatars.githubusercontent.com/u/228839961?s=130&v=4',
    moto: 'Pemrograman fungsional membawa kedamaian',
    techStack: ['Haskell', 'Scala', 'nuxt', 'Kafka']
  },
  {
    name: 'jauf',
    avatar: 'https://avatars.githubusercontent.com/u/167701174?s=130&v=4',
    moto: 'Kualitas adalah kebiasaan',
    techStack: ['html', 'laravel', 'php', 'tailwind']
  },
  {
    name: 'feri',
    avatar: 'https://avatars.githubusercontent.com/u/234127916?s=130&v=4',
    moto: 'Kreativitas tanpa batas',
    techStack: ['vuejs', 'laravel', 'php', 'tailwind']
  },
  {
    name: 'ashiro tanka',
    avatar: '/team/siro.webp',
    moto: 'Selalu belajar, selalu berkembang',
    techStack: []
  },
  {
    name: 'nafis',
    avatar: 'https://avatars.githubusercontent.com/u/182593937?s=130&v=4',
    moto: 'フロントエンド開発とUI/UXデザインに特に興味があります。 @NLFTs @Vercel',
    techStack: ['react', 'next', 'tailwind', 'typescript', 'javascript']
  }
]

const members: Contributor[] = contributors.map((contributor, index) => ({
  ...contributor,
  id: index + 1,
  role: contributor.role || 'Contributor',
  focus: contributor.focus || contributor.techStack[0] || 'Open source',
  github: contributor.github || `https://github.com/${contributor.name}`
}))

const search = ref('')
const activeRole = ref('All')
const currentPage = ref(1)
const pageSize = 10

const roles = computed(() => ['All', ...new Set(members.map(member => member.role))])

const filteredMembers = computed(() => {
  const query = search.value.trim().toLowerCase()

  return members.filter((member) => {
    const matchesRole = activeRole.value === 'All' || member.role === activeRole.value
    const matchesSearch = !query || [member.name, member.moto, member.role, member.focus, ...member.techStack]
      .join(' ')
      .toLowerCase()
      .includes(query)

    return matchesRole && matchesSearch
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredMembers.value.length / pageSize)))

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredMembers.value.slice(start, start + pageSize)
})

const setRole = (role: string) => {
  activeRole.value = role
  currentPage.value = 1
}

const setPage = (page: number) => {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

watch(search, () => {
  currentPage.value = 1
})

watch(totalPages, (pageCount) => {
  if (currentPage.value > pageCount) currentPage.value = pageCount
})

/**
 * Hanya teknologi yang benar-benar kita izinkan
 * untuk dirender sebagai Simple Icons.
 */
const techIcons: Record<string, string> = {
  vue: 'i-simple-icons-vuedotjs',
  vuejs: 'i-simple-icons-vuedotjs',

  nuxt: 'i-simple-icons-nuxt',
  nuxtjs: 'i-simple-icons-nuxt',

  typescript: 'i-simple-icons-typescript',
  javascript: 'i-simple-icons-javascript',

  react: 'i-simple-icons-react',

  next: 'i-simple-icons-nextdotjs',

  angular: 'i-simple-icons-angular',

  tailwind: 'i-simple-icons-tailwindcss',

  html: 'i-simple-icons-html5',
  css: 'i-simple-icons-css3',
  sass: 'i-simple-icons-sass',

  'node.js': 'i-simple-icons-nodedotjs',
  node: 'i-simple-icons-nodedotjs',

  php: 'i-simple-icons-php',
  laravel: 'i-simple-icons-laravel',
  livewire: 'i-simple-icons-livewire',

  python: 'i-simple-icons-python',
  django: 'i-simple-icons-django',

  rust: 'i-simple-icons-rust',
  go: 'i-simple-icons-go',

  haskell: 'i-simple-icons-haskell',
  scala: 'i-simple-icons-scala',

  java: 'i-simple-icons-openjdk',

  aws: 'i-simple-icons-amazonwebservices',
  terraform: 'i-simple-icons-terraform',
  kubernetes: 'i-simple-icons-kubernetes',
  docker: 'i-simple-icons-docker',

  kafka: 'i-simple-icons-apachekafka',
  redis: 'i-simple-icons-redis',

  mysql: 'i-simple-icons-mysql',
  postgresql: 'i-simple-icons-postgresql',

  flutter: 'i-simple-icons-flutter',
  dart: 'i-simple-icons-dart',
  firebase: 'i-simple-icons-firebase',

  graphql: 'i-simple-icons-graphql',

  git: 'i-simple-icons-git',

  jest: 'i-simple-icons-jest',

  framer: 'i-simple-icons-framer',

  astrojs: 'i-simple-icons-astro',

  threejs: 'i-simple-icons-threedotjs',

  tableau: 'i-simple-icons-tableau',

  tensorflow: 'i-simple-icons-tensorflow',

  hexo: 'i-simple-icons-hexo',

  pyqt: 'i-simple-icons-qt',

  'chakra ui': 'i-simple-icons-chakraui',

  net: 'i-simple-icons-dotnet'
}


const getTechIcon = (tech: string) => {
  return techIcons[tech.trim().toLowerCase()] ?? 'i-lucide-code-2'
}

</script>

<template>
  <main
    ref="page"
    class="
      min-h-screen
      overflow-x-hidden

      bg-white
      text-zinc-950

      dark:bg-[#0a0a0a]
      dark:text-white
    "
  >
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header
      class="
        mx-auto
        max-w-[1200px]
        px-5
        pb-14
        pt-20

        sm:px-8
        sm:pt-28

        lg:px-10
        lg:pb-16
      "
    >
      <p
        data-label
        class="
          mb-5
          text-[10px]
          font-medium
          uppercase
          tracking-[0.2em]

          text-zinc-400

          dark:text-zinc-500
        "
      >
        Community
      </p>

      <h1
        data-title
        class="
          text-[clamp(3.5rem,9vw,7rem)]
          font-semibold
          leading-[0.9]
          tracking-[-0.075em]
        "
      >
        Members
      </h1>

      <div
        data-description
        class="
          mt-7
          flex
          max-w-[720px]
          flex-col
          gap-3

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <p
          class="
            max-w-[580px]
            text-[15px]
            leading-7

            text-zinc-500

            dark:text-zinc-400
          "
        >
          Temui developer dan pembuat produk
          yang menjadi bagian dari komunitas.
        </p>

        <span
          class="
            shrink-0
            text-xs
            tabular-nums

            text-zinc-400

            dark:text-zinc-500
          "
        >
          {{ members.length }} members
        </span>
      </div>
    </header>

    <!-- =====================================================
         CONTROLS
    ====================================================== -->

    <section
      data-controls
      class="
        mx-auto
        max-w-[1200px]
        border-y
        border-zinc-200

        dark:border-white/[0.09]
      "
    >
      <div
        class="
          flex
          flex-col

          lg:flex-row
          lg:items-center
        "
      >
        <!-- SEARCH -->

        <div
          class="
            flex
            h-14
            shrink-0
            items-center
            gap-3

            border-b
            border-zinc-200
            px-5

            dark:border-white/[0.09]

            sm:px-8

            lg:w-[340px]
            lg:border-b-0
            lg:border-r
            lg:px-5
          "
        >
          <UIcon
            name="i-lucide-search"
            class="
              size-4
              shrink-0

              text-zinc-400

              dark:text-zinc-600
            "
          />

          <input
            v-model="search"
            data-search
            type="search"
            autocomplete="off"
            placeholder="Search members..."
            class="
              min-w-0
              flex-1
              bg-transparent
              text-sm
              outline-none

              text-zinc-900
              placeholder:text-zinc-400

              dark:text-white
              dark:placeholder:text-zinc-600
            "
          />

          <kbd
            class="
              hidden
              border
              border-zinc-200
              px-1.5
              py-0.5
              font-mono
              text-[9px]
              text-zinc-400

              dark:border-white/[0.08]
              dark:text-zinc-600

              sm:block
            "
          >
            /
          </kbd>
        </div>

        <!-- ROLE FILTER -->

        <div
          class="
            member-filter-scroll
            flex
            min-w-0
            items-center
            overflow-x-auto
            px-5

            sm:px-8

            lg:px-5
          "
        >
          <button
            v-for="role in roles"
            :key="role"
            type="button"
            class="
              relative
              h-14
              shrink-0
              px-3
              text-xs
              font-medium
              transition-colors
            "
            :class="
              activeRole === role
                ? `
                  text-zinc-950
                  dark:text-white
                `
                : `
                  text-zinc-400
                  hover:text-zinc-800

                  dark:text-zinc-500
                  dark:hover:text-zinc-300
                `
            "
            @click="setRole(role)"
          >
            {{ role }}

            <span
              v-if="activeRole === role"
              class="
                absolute
                bottom-0
                left-3
                right-3
                h-px

                bg-zinc-950

                dark:bg-white
              "
            />
          </button>
        </div>
      </div>
    </section>

    <!-- =====================================================
         TABLE HEADER
    ====================================================== -->

    <section
      class="
        mx-auto
        max-w-[1200px]
      "
    >
      <div
        class="
          hidden
          grid-cols-[minmax(280px,2fr)_1fr_1fr_1.2fr_24px]
          gap-6
          border-b
          border-zinc-200
          px-5
          py-3

          text-[9px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-zinc-400

          dark:border-white/[0.09]
          dark:text-zinc-600

          sm:px-8

          md:grid

          lg:px-10
        "
      >
        <span>Member</span>
        <span>Role</span>
        <span>Focus</span>
        <span>Stack</span>
        <span />
      </div>

      <!-- ===================================================
           EMPTY STATE
      ==================================================== -->

      <div
        v-if="paginatedMembers.length === 0"
        class="
          flex
          min-h-[300px]
          items-center
          justify-center
          border-b
          border-zinc-200
          text-sm
          text-zinc-400

          dark:border-white/[0.09]
          dark:text-zinc-600
        "
      >
        Tidak ada member yang cocok.
      </div>

      <!-- ===================================================
           MEMBER ROW
      ==================================================== -->

      <article
        v-for="member in paginatedMembers"
        :key="member.id"
        data-member-row
        class="
          group
          border-b
          border-zinc-200
          px-5
          py-6

          dark:border-white/[0.09]

          sm:px-8

          md:grid
          md:grid-cols-[minmax(280px,2fr)_1fr_1fr_1.2fr_24px]
          md:items-center
          md:gap-6
          md:py-5

          lg:px-10
        "
      >
        <!-- MEMBER -->

        <div
          class="
            flex
            min-w-0
            items-center
            gap-4
          "
        >
          <img
            :src="member.avatar"
            :alt="member.name"
            loading="lazy"
            decoding="async"
            class="
              size-11
              shrink-0
              rounded-full
              object-cover
              transition-all
              duration-300
            "
          />

          <div class="min-w-0">
            <h2
              class="
                truncate
                text-[14px]
                font-medium
                tracking-[-0.01em]
              "
            >
              {{ member.name }}
            </h2>

            <p
              class="
                mt-1
                truncate
                text-xs

                text-zinc-400

                dark:text-zinc-600
              "
            >
              {{ member.moto }}
            </p>
          </div>
        </div>

        <!-- MOBILE META -->

        <div
          class="
            mt-4
            flex
            flex-wrap
            gap-x-4
            gap-y-1

            md:hidden
          "
        >
          <span
            class="
              text-xs

              text-zinc-600

              dark:text-zinc-400
            "
          >
            {{ member.role }}
          </span>

          <span
            class="
              text-xs

              text-zinc-400

              dark:text-zinc-600
            "
          >
            {{ member.focus }}
          </span>
        </div>

        <!-- ROLE -->

        <div
          class="
            hidden
            text-sm

            text-zinc-600

            dark:text-zinc-400

            md:block
          "
        >
          {{ member.role }}
        </div>

        <!-- FOCUS -->

        <div
          class="
            hidden
            text-sm

            text-zinc-400

            dark:text-zinc-500

            md:block
          "
        >
          {{ member.focus }}
        </div>

        <!-- STACK WITH ICONS -->

        <div
          class="
            mt-4
            flex
            min-w-0
            items-center
            gap-3

            md:mt-0
          "
        >
          <div
            v-for="technology in member.techStack.slice(0, 4)"
            :key="technology"
            class="
              group/tech
              flex
              size-6
              shrink-0
              items-center
              justify-center
            "
            :title="technology"
          >
          <UIcon
          :name="getTechIcon(technology)"
          class="
            size-4
            transition-all
            duration-200
          "
        />
          </div>

          <span
            v-if="member.techStack.length > 4"
            class="
              text-[10px]
              text-zinc-400

              dark:text-zinc-600
            "
          >
            +{{ member.techStack.length - 4 }}
          </span>
        </div>

        <!-- ARROW -->

        <div
          class="
            hidden

            md:flex
            md:justify-end
          "
        >
          <a
            :href="member.github"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open ${member.name} on GitHub`"
            class="
              text-zinc-300
              transition-all
              duration-200

              group-hover:translate-x-0.5
              group-hover:text-zinc-900

              dark:text-zinc-700
              dark:group-hover:text-white
            "
          >
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-4"
            />
          </a>
        </div>
      </article>
    </section>

    <!-- =====================================================
         PAGINATION
    ====================================================== -->

    <nav
      v-if="totalPages > 1"
      class="
        mx-auto
        flex
        max-w-[1200px]
        items-center
        justify-between
        px-5
        py-8

        sm:px-8

        lg:px-10
      "
    >
      <button
        type="button"
        :disabled="currentPage === 1"
        class="
          flex
          items-center
          gap-2
          text-xs

          text-zinc-400
          transition-colors
          hover:text-zinc-950
          disabled:pointer-events-none
          disabled:opacity-30

          dark:text-zinc-600
          dark:hover:text-white
        "
        @click="setPage(currentPage - 1)"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-3.5"
        />

        Previous
      </button>

      <div class="flex items-center">
        <button
          v-for="number in totalPages"
          :key="number"
          type="button"
          class="
            size-8
            text-xs
            transition-colors
          "
          :class="
            currentPage === number
              ? `
                text-zinc-950
                dark:text-white
              `
              : `
                text-zinc-400
                hover:text-zinc-950

                dark:text-zinc-600
                dark:hover:text-white
              `
          "
          @click="setPage(number)"
        >
          {{ number }}
        </button>
      </div>

      <button
        type="button"
        :disabled="
          currentPage === totalPages
        "
        class="
          flex
          items-center
          gap-2
          text-xs

          text-zinc-400
          transition-colors
          hover:text-zinc-950
          disabled:pointer-events-none
          disabled:opacity-30

          dark:text-zinc-600
          dark:hover:text-white
        "
        @click="setPage(currentPage + 1)"
      >
        Next

        <UIcon
          name="i-lucide-arrow-right"
          class="size-3.5"
        />
      </button>
    </nav>
  </main>
</template>

<style scoped>
/* =========================================================
 * CUSTOM HORIZONTAL SCROLLBAR
 * ======================================================= */

.member-filter-scroll {
  scrollbar-width: thin;
  scrollbar-color:
    rgb(212 212 216 / 0.8)
    transparent;
}

.member-filter-scroll::-webkit-scrollbar {
  height: 3px;
}

.member-filter-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.member-filter-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgb(212 212 216 / 0.8);
}

.member-filter-scroll::-webkit-scrollbar-thumb:hover {
  background: rgb(161 161 170 / 0.9);
}

/* Dark mode */

:global(.dark)
.member-filter-scroll {
  scrollbar-color:
    rgb(63 63 70 / 0.9)
    transparent;
}

:global(.dark)
.member-filter-scroll::-webkit-scrollbar-thumb {
  background: rgb(63 63 70 / 0.9);
}

:global(.dark)
.member-filter-scroll::-webkit-scrollbar-thumb:hover {
  background: rgb(82 82 91 / 1);
}

/* Search */

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  appearance: none;
}

/* Reduced motion */

@media (prefers-reduced-motion: reduce) {
  .member-filter-scroll {
    scroll-behavior: auto;
  }
}
</style>