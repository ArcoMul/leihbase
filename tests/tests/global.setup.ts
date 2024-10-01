import { expect, test as setup } from "@playwright/test";
import PocketBase from "pocketbase";

setup.describe.configure({ mode: "serial" });

setup.describe("setup", () => {
  setup("create location, product and user", async ({}) => {
    const pb = new PocketBase("http://127.0.0.1:8080");

    // Auth as admin
    await pb.admins.authWithPassword("test@example.com", "1234567890");

    // Configure mailing
    await pb.settings.update({
      smtp: {
        enabled: true,
        host: "mailhog",
        port: 1025,
      },
    });

    // Create test store
    let location;
    try {
      location = await pb.collection("location").create({
        active: true,
        name: "Test Store",
        address: "Example Street 1, Example City",
        slug: "test-store",
        opening_hours: {
          friday: [
            {
              from: "17:00",
              to: "19:00",
            },
          ],
        },
      });
    } catch (err) {
      console.log("Error creating test store", err.response.data);
    }

    // Create test product
    try {
      await pb.collection("products").create({
        active: true,
        name: "Test Product",
        location: location.id,
        deposit: 10,
        description: "<p>Lorem ipsum dolor.</p>",
      });
    } catch (err) {
      console.log("Error creating test product", err.response.data);
    }

    // Create test user
    try {
      await pb.collection("users").create({
        name: "Test User",
        email: "test@example.com",
        password: "testtest",
        passwordConfirm: "testtest",
      });
    } catch (err) {
      console.log("Error creating test user", err.response.data);
    }
  });

  // Wait for homepage to load with extra long timeout
  // as Nuxt first needs to finish building
  setup("wait for homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Test Store", { timeout: 30000 });
  });
});
