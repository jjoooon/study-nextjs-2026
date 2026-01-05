import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('h1')).toContainText('Login');
  });

  test('register page loads', async ({ page }) => {
    await page.goto('/register');

    await expect(page.locator('h1')).toContainText('Register');
  });

  test('auth pages have consistent layout', async ({ page }) => {
    await page.goto('/login');

    // Check for centered card layout
    const container = page.locator('.max-w-md');
    await expect(container).toBeVisible();
  });
});
