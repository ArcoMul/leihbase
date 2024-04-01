// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {},
  },

  app: {
    head: {
      title: "Leihapp",
    },
  },

  modules: ["@pinia/nuxt", "./modules/pocketbase"],

  pocketbase: {
    serverBaseUrl: process.env.POCKETBASE_SERVER_BASE_URL,
    clientBaseUrl: process.env.POCKETBASE_CLIENT_BASE_URL,
  },

  devtools: { enabled: true },
  // plugins: ["~/plugins/pocketbase"],

  vue: {
    compilerOptions: {
      // treat all tags with a dash as custom elements
      isCustomElement: (tag) => tag.startsWith("sl-"),
    },
  },
});
