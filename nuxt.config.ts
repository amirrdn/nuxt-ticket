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
  vite: {
    server: {
      proxy: process.env.NODE_ENV !== 'production' ? {
        '/amenities': {
          target: 'https://project-exterior-technical-test-app.up.railway.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/amenities/, '/amenities'),
        },
      } : undefined,
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://project-exterior-technical-test-app.up.railway.app',
    },
  },
});
