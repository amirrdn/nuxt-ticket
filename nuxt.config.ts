// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  pages: true,
  dir: {
    pages: './pages',
    layouts: './layouts',
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
      proxy: {
          '/amenities': {
            target: 'https://project-exterior-technical-test-app.up.railway.app',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/amenities/, '/amenities'),
          },
        },
    },
  },
  runtimeConfig: {
    public: {
      apiEndpoint: process.env.API_BASE,
      nodeEnv: process.env.NODE_ENV
    },
  }
})
