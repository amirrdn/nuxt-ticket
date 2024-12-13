// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true, // Aktifkan fitur auto-import untuk folder `pages`
  dir: {
    pages: './pages', // Direktori default untuk halaman
    layouts: './layouts', // Direktori default untuk layout
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
        },
      ],
    },
  },
})