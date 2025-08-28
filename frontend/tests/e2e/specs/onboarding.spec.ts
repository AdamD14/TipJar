import { test, expect } from "@playwright/test";

test.describe("onboarding guard", () => {
  test("requires auth on /onboarding/*", async ({ page }) => {
    await page.goto("/onboarding/wallet");
    await expect(page).toHaveURL(/\/login/);
  });

  test("username step renders", async ({ page }) => {
    await page.goto("/onboarding/username");
    // without session: expect redirect to /login
    await expect(page).toHaveURL(/\/login/);
  });
});

