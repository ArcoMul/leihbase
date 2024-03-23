// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrlServer: '', // NUXT_PUBLIC_API_BASE_URL_SERVER
      apiBaseUrlClient: '', // NUXT_PUBLIC_API_BASE_URL_CLIENT
    }
  },
  app: {
    head: {
      title: 'Leihapp'
    }
  },

  devtools: { enabled: true },
  plugins: ["~/plugins/pocketbase"],

  vue: {
    compilerOptions: {
      // treat all tags with a dash as custom elements
      isCustomElement: (tag) => tag.startsWith("sl-"),
    },
  },

  modules: ["@pinia/nuxt"],
});
