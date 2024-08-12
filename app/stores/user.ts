import type { RecordModel } from "pocketbase";

interface State {
  name: string | null;
  hasInitialData: boolean;
  reservations: RecordModel[] | [];
  locations: RecordModel[] | [];
  authenticationIntent: {
    intent: "reservation" | null;
    path: string | null;
  };
  banner: string | null;
}

export const useUserStore = defineStore<"user", State>("user", {
  state: () => ({
    name: null,
    hasInitialData: false,
    reservations: [],
    locations: [],
    authenticationIntent: {
      intent: null,
      path: null,
    },
    banner: null,
  }),
  actions: {
    login({ name }: { name?: string } = {}) {
      const { pb } = usePocketbase();
      // Store user name
      this.name = name || pb.authStore?.model?.name;
      // Fetch initial data
      this.fetchInitialData();
    },
    logout() {
      this.name = null;
    },
    async fetchInitialData() {
      await Promise.all([
        this.fetchUserReservations(),
        this.fetchUserLocations(),
      ]);
      this.hasInitialData = true;
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
    async fetchUserLocations() {
      const { pb } = usePocketbase();
      if (pb.authStore?.model?.id) {
        const locations = await pb.collection("location").getFullList();
        this.locations = locations;
      }
    },
    setAuthenticationIntent(intent: null | "reservation", path: string) {
      this.authenticationIntent.intent = intent;
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
