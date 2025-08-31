import { test, expect } from '@playwright/test';

test.describe('withdrawals page', () => {
  test('renders withdraw form', async ({ page }) => {
    await page.goto('/creator/withdrawals');
    await expect(page.getByRole('heading', { name: /withdraw funds/i })).toBeVisible();
  });
});
