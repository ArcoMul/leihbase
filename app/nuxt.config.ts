// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      pocketbase: {
        serverBaseUrl: "", // NUXT_PUBLIC_POCKETBASE_SERVER_BASE_URL
        clientBaseUrl: "", // NUXT_PUBLIC_POCKETBASE_CLIENT_BASE_URL
      },
    },
  },

  app: {
    head: {
      title: "Leihapp",
    },
  },

  modules: ["@pinia/nuxt", "./modules/pocketbase", "@nuxtjs/i18n"],

  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      // treat all tags with a dash as custom elements
      isCustomElement: (tag) => tag.startsWith("sl-"),
    },
  },
});
