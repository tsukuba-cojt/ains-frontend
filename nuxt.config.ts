// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  imports: {
    autoImport: false,
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['src/*'],
        },
      },
    },
  },
  modules: [],
  ssr: false,
})
