import { test, expect } from "@playwright/test";
import { waitForHydration, waitForClientMount } from "../lib/utils";

test.describe("reservation", () => {
  test("user can reserve a product", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForClientMount(page.getByTestId("product-card"));
    await page.getByTestId("product-card").click();
    await page.waitForURL(/\/l\/test-store\/p\/(.+)/);
    await expect(page.url()).toContain("/l/test-store/p/");
    await expect(page.getByTestId("product-page-h1")).toBeDefined();
    await waitForClientMount(page.getByTestId("reserve-button"));
    await page.getByTestId("reserve-button").click();
    await expect(page).toHaveURL("/signup");
  });
});
