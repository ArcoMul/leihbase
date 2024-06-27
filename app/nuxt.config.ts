// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    plausibleTrackingDomain: "", // NUXT_PLAUSIBLE_TRACKING_DOMAIN
    public: {
      pocketbase: {
        serverBaseUrl: "", // NUXT_PUBLIC_POCKETBASE_SERVER_BASE_URL
        clientBaseUrl: "", // NUXT_PUBLIC_POCKETBASE_CLIENT_BASE_URL
      },
    },
  },

  app: {
    head: {
      title: "Leihbase",
      link: [
        { rel: "favicon", type: "image/png", href: "/favicon-192x192.png" },
        { rel: "stylesheet", href: "/fonts/inter/inter.css" },
      ],
    },
  },

  build: {
    transpile: ["vuejs3-datepicker"],
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
