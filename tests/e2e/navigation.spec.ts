import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates between marketing pages', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveTitle(/Next.js 16/);

    // Go to about
    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('About Us');

    // Go to pricing
    await page.goto('/pricing');
    await expect(page.locator('h1')).toContainText('Pricing');

    // Back to home
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Next.js 16.1.1');
  });

  test('navigates between dashboard pages', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');

    await page.goto('/settings');
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('page loads are fast', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});
