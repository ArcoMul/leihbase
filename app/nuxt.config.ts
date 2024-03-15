// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
