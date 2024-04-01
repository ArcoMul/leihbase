export const useUserStore = defineStore("userStore", {
  state: () => ({
    name: null,
    reservations: [],
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
  },
});
