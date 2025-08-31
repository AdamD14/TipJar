import { test, expect } from '@playwright/test';

test.describe('choose username', () => {
  test('displays form', async ({ page }) => {
    await page.goto('/choose-username');
    await expect(page.getByRole('heading', { name: /choose your username/i })).toBeVisible();
  });
});
