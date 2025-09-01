import { test, expect } from '@playwright/test';

test.describe('profile page tip', () => {
  test('shows not found for unknown user', async ({ page }) => {
    await page.goto('/unknownuser');
    await expect(page.getByText('Profile not found.')).toBeVisible();
  });
});
