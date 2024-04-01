export function usePocketbase() {
  const nuxtApp = useNuxtApp();
  const { $pocketbase: pb } = nuxtApp;

  const isValid = useState(() => pb?.authStore.isValid);

  async function login(email, password) {
    await pb.collection("users").authWithPassword(email, password);
    isValid.value = pb.authStore.isValid;
  }

  function logout() {
    pb.authStore.clear();
    isValid.value = false;
  }

  return {
    pb,
    isValid,
    login,
    logout,
  };
}
