export const useUserStore = defineStore("userStore", {
  state: () => ({
    name: null,
    isAuthenticated: false,
    reservations: [],
  }),
  actions: {
    login() {
      const nuxtApp = useNuxtApp();
      this.isAuthenticated = true;
      this.name = nuxtApp.$pb.authStore.model.name;
    },
    logout() {
      this.isAuthenticated = false;
      this.name = null;
    },
    async fetchUserReservations() {
      const nuxtApp = useNuxtApp();
      const reservations = await nuxtApp.$pb
        .collection("reservations")
        .getFullList();
      this.reservations = reservations;
    },
  },
});
