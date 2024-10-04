import { test, expect } from "@playwright/test";
import { waitForHydration, waitForClientMount } from "../lib/utils";

test.describe("login", () => {
  test("can reach login", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByTestId("login-link").click();
    await expect(page.getByTestId("login-h1")).toBeVisible();
  });
  test("can log in", async ({ page }) => {
    await page.goto("/login");
    await waitForHydration(page);
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByTestId("password-input").fill("testtest");
    await page.getByTestId("submit-button").click();
    await page.waitForURL(/\/profile/);
    await expect(page).toHaveURL("/profile");
  });
  test("can not log in with wrong email address", async ({ page }) => {
    await page.goto("/login");
    await waitForHydration(page);
    await page.getByTestId("email-input").fill("wrong@example.com");
    await page.getByTestId("password-input").fill("testtest");
    await page.getByTestId("submit-button").click();
    await expect(page.getByTestId("login-error")).toHaveCount(1);
    await expect(page.getByTestId("login-error")).toContainText(
      "Einloggen nicht erfolgreich"
    );
  });
});
