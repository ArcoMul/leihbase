import { expect, test as setup } from "@playwright/test";
import PocketBase from "pocketbase";

setup.describe.configure({ mode: "serial" });

setup.describe("setup", () => {
  setup("create location", async ({}) => {
    const pb = new PocketBase("http://127.0.0.1:8080");

    // Auth as admin
    await pb.admins.authWithPassword("test@example.com", "1234567890");

    // Create test store
    try {
      await pb.collection("location").create({
        active: true,
        name: "Test Store",
        address: "Example Street 1, Example City",
        slug: "test-store",
      });
    } catch (err) {
      console.log("Error creating test store", err.response.data);
    }
  });

  // Wait for homepage to load with extra long timeout
  // as Nuxt first needs to finish building
  setup("wait for homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Test Store | Leihbase", { timeout: 30000 });
  });
});
