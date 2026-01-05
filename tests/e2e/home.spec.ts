import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check if main heading is visible
    await expect(page.locator('h1')).toContainText('Next.js 16.1.1');
  });

  test('displays features list', async ({ page }) => {
    await page.goto('/');

    // Check for features section
    await expect(page.locator('h2').filter({ hasText: 'Features' })).toBeVisible();

    // Check feature items
    await expect(page.locator('li:has-text("Next.js 16.1.1")')).toBeVisible();
    await expect(page.locator('li:has-text("TypeScript 5.7.3")')).toBeVisible();
    await expect(page.locator('li:has-text("Redux Toolkit 2.5.0")')).toBeVisible();
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');

    // Click on about page link (if exists) or navigate directly
    await page.goto('/about');

    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('navigates to pricing page', async ({ page }) => {
    await page.goto('/pricing');

    await expect(page.locator('h1')).toContainText('Pricing');
  });

  test('displays user data section', async ({ page }) => {
    await page.goto('/');

    // Check for User Data section heading
    await expect(page.locator('h2:has-text("User Data")')).toBeVisible();
  });
});
