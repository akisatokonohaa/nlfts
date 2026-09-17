// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  // Global SEO defaults are managed cleanly in app.vue via useHead and useSeoMeta
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  runtimeConfig: {
    turnstileSecretKey: process.env.SECRET_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    supabaseSecretKey: process.env.SECRET_SUPA_KEY || '',
    public: {
      turnstileSiteKey: process.env.SITE_KEY || '',
      unsplashAccessKey: process.env.NUXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
      supabaseUrl: process.env.PROJECT_URL || process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.PUBLISHABLE_KEY || process.env.SUPABASE_KEY || ''
    }
  },

  css: ['~/assets/css/main.css'],

  image: {
    // Use @nuxt/image built-in optimizer (sharp is already installed)
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    // ipx provider for local static images
    provider: 'ipx'
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag === 'app-root'
    }
  },

  routeRules: {
    // IPX and Auth routes: dynamic SSR/client only (jangan prerender ke disk)
    '/_ipx/**': { prerender: false },
    '/auth/**': {
      prerender: false,
      headers: { 'cache-control': 'no-store, no-cache, must-revalidate, max-age=0' }
    },
    '/api/**': {
      prerender: false,
      headers: { 'cache-control': 'no-store, no-cache, must-revalidate, max-age=0' }
    },
    // Contact page: SSR (has form + API + Turnstile, jangan di-cache)
    '/contact': {
      prerender: false,
      headers: { 'cache-control': 'no-store, no-cache, must-revalidate, max-age=0' }
    },
    // Docs redirect: SSR
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    // All other routes: SSG (prerendered)
    '/blog/**': { prerender: true },
    '/docs/**': { prerender: true },
    '/**': {
      prerender: true,
      headers: {
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'SAMEORIGIN',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  },

  compatibilityDate: '2024-07-11',

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  nitro: {
    prerender: {
      failOnError: false,
      ignore: ['/_ipx'],
      routes: [
        '/',
        '/blog',
        '/changelog',
        '/signup',
        '/blocked',
        '/rss.xml',
        '/atom.xml',
        '/feed.xml',
        '/docs/getting-started'
      ],
      crawlLinks: true
    },
    // Beritahu Nitro bahwa better-sqlite3 adalah native module — jangan di-bundle.
    // Ini mencegah ERR_DLOPEN_FAILED di Vercel karena binary .node tidak boleh
    // di-inline ke dalam bundle JavaScript.
    externals: {
      external: ['better-sqlite3']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
