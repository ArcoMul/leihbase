import { Page } from "@playwright/test";

export function waitForHydration(page: Page) {
  return page.waitForFunction(
    () => window.useNuxtApp?.().isHydrating === false
  );
}
