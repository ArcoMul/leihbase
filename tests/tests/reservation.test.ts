import { test, expect } from "@playwright/test";
import { waitForHydration, waitForClientMount } from "../lib/utils";

test.describe("reservation", () => {
  test("visitor can reserve a product", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);

    // Navigate to product page
    await waitForClientMount(page.getByTestId("product-card"));
    await page.getByTestId("product-card").click();
    await page.waitForURL(/\/l\/test-store\/p\/(.+)/);
    await expect(page.url()).toContain("/l/test-store/p/");
    await expect(page.getByTestId("product-page-h1")).toBeVisible();

    // Click reserve (logged out)
    await waitForClientMount(page.getByTestId("reserve-button"));
    await page.getByTestId("reserve-button").click();
    await expect(page).toHaveURL("/signup");

    // Signup
    await page.getByTestId("name-input").fill("John2");
    await page.getByTestId("email-input").fill("john2@example.com");
    await page.getByTestId("password-input").fill("123456789");
    await page.getByTestId("tac-checkbox").check();
    await page.getByTestId("submit-button").click();
    await page.waitForURL(/\/l\/test-store\/p\/(.+)/);

    // Reserve
    await expect(page.url()).toContain("/l/test-store/p/");
    await waitForClientMount(page.getByTestId("reserve-button"));
    await page.getByTestId("reserve-button").click();
    await expect(page.getByTestId("opening-hours")).toBeVisible();
    // enter start
    await page.getByTestId("start-input").click();
    await expect(page.getByTestId("start-input-calendar")).toBeVisible();
    await page
      .getByTestId("start-input-calendar")
      .locator("shadow=calendar-month >> td button:not([aria-disabled=true])")
      .nth(0)
      .click();
    // enter end
    await page.getByTestId("end-input").click();
    await expect(page.getByTestId("end-input-calendar")).toBeVisible();
    await page
      .getByTestId("end-input-calendar")
      .locator("shadow=calendar-month >> td button:not([aria-disabled=true])")
      .nth(1)
      .click();
    // submit
    await page.getByTestId("reserve-submit").click();

    await expect(page.getByTestId("opening-hours")).toBeHidden();
  });
});
