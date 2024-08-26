import { Page } from "@playwright/test";

export async function waitForHydration(page: Page) {
  // Wait for dehydration
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false);
  // Wait extra 500ms to be more sure events are bound to elements
  await page.waitForTimeout(500);
}
