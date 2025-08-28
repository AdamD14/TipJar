import { test, expect } from "@playwright/test";

test.describe("explorer ui", () => {
  test("loads /explore and shows heading", async ({ page }) => {
    await page.goto("/explore");
    await expect(page.getByRole("heading", { name: /discover creators/i })).toBeVisible();
  });

  test("loads /discover as well", async ({ page }) => {
    await page.goto("/discover");
    await expect(page.getByRole("heading", { name: /discover creators/i })).toBeVisible();
  });
});
