import type { RecordModel } from "pocketbase";

interface State {
  name: string | null;
  reservations: RecordModel[] | [];
  authenticationIntent: {
    path: string | null;
  };
  banner: string | null;
}

export const useUserStore = defineStore<"user", State>("user", {
  state: () => ({
    name: null,
    reservations: [],
    authenticationIntent: {
      path: null,
    },
    banner: null,
  }),
  actions: {
    login({ name }: { name?: string } = {}) {
      const { pb } = usePocketbase();
      this.name = name || pb.authStore?.model?.name;
    },
    logout() {
      this.name = null;
    },
    async fetchUserReservations() {
      const { pb } = usePocketbase();
      if (pb.authStore?.model?.id) {
        const reservations = await pb.collection("reservations").getFullList({
          filter: pb.filter("user = {:user}", {
            user: pb.authStore.model.id,
          }),
        });
        this.reservations = reservations;
      }
    },
    setAuthenticationIntent(path: string) {
      this.authenticationIntent.path = path;
    },
    clearAuthenticationIntent() {
      this.authenticationIntent.path = null;
    },
    showBanner(banner: string) {
      this.banner = banner;
    },
    resetBanner() {
      this.banner = null;
    },
  },
});
