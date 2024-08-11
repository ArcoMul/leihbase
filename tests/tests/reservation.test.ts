import { test, expect } from "@playwright/test";
import { waitForHydration } from "../lib/utils";

test.describe("reservation", () => {
  test("user can reserve a product", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByTestId("product-card").click();
    await page.waitForURL(/\/l\/test-store\/p\/(.+)/);
    await expect(page.url()).toContain("/l/test-store/p/");
    await waitForHydration(page);
    await page.waitForTimeout(300);
    await expect(page.getByTestId("product-page-h1")).toBeDefined();
    await page.getByTestId("reserve-button").click();
    await page.waitForURL(/\/signup/);
    await expect(page.url()).toContain("/signup");
    await waitForHydration(page);
  });
});
