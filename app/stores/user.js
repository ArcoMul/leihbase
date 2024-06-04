export const useUserStore = defineStore("userStore", {
  state: () => ({
    name: null,
    reservations: [],
    reservationIntent: {
      locationSlug: null,
      productId: null,
    },
    banner: null,
  }),
  actions: {
    login({ name } = {}) {
      const { pb } = usePocketbase();
      this.name = name || pb.authStore.model.name;
    },
    logout() {
      this.name = null;
    },
    async fetchUserReservations() {
      const { pb } = usePocketbase();
      const reservations = await pb.collection("reservations").getFullList();
      this.reservations = reservations;
    },
    setReservationIntent(locationSlug, productId) {
      this.reservationIntent.locationSlug = locationSlug;
      this.reservationIntent.productId = productId;
    },
    clearReservationIntent() {
      this.reservationIntent.locationSlug = null;
      this.reservationIntent.productId = null;
    },
    showBanner(banner) {
      this.banner = banner;
    },
    resetBanner() {
      this.banner = null;
    },
  },
});
