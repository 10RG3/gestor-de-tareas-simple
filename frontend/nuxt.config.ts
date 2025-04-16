// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'src/', // Cambia la ruta de origen a 'src'

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt', // Módulo de Pinia para Nuxt
    '@nuxt/test-utils'
  ],

  typescript: {
    strict: true
  },

  // Configuración de puerto para desarrollo
  devServer: {
    port: 3001
  },

  // Proxy para las llamadas a la API
  routeRules: {
    '/api/**': { proxy: { to: 'http://localhost:3100/api/**' } }
  },

  // // Auto-imports
  // imports: {
  //   dirs: ['~/stores']
  // },

  compatibilityDate: '2025-04-15'
})