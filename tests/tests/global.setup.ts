import { expect, test as setup } from "@playwright/test";
import PocketBase from "pocketbase";

setup.describe.configure({ mode: "serial" });

setup.describe("setup", () => {
  setup("create location", async ({}) => {
    const pb = new PocketBase("http://127.0.0.1:8080");

    // or as super-admin
    const adminData = await pb.admins.authWithPassword(
      "test@example.com",
      "1234567890"
    );

    // list and filter "example" collection records
    try {
      const result = await pb.collection("location").create({
        active: true,
        name: "Test Store",
        address: "Example Street 1, Example City",
        slug: "test-store",
      });
    } catch (err) {
      console.log(err.response.data);
    }
  });

  setup("wait for homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Test Store | Leihbase");
  });
});
