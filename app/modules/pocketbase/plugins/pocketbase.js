import PocketBase from "pocketbase";
import { useUserStore } from "../stores/user";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();

  const url = process.client
    ? config.public.pocketbase.clientBaseUrl
    : config.public.pocketbase.serverBaseUrl;

  const pb = new PocketBase(url);

  const cookie = useCookie("pb_auth", {
    path: "/",
    secure: true,
    sameSite: "lax",
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800,
  });

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token, cookie.value?.model);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  if (pb.authStore.isValid) {
    userStore.login({ name: pb.authStore.model.name });
  } else {
    userStore.logout();
  }

  return {
    provide: { pocketbase: pb },
  };
});
