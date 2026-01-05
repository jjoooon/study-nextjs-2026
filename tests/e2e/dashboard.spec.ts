import { test, expect } from '@playwright/test';

test.describe('Dashboard Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
  });

  test('dashboard page loads', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('displays dashboard stats', async ({ page }) => {
    // Wait for stats to load
    await page.waitForSelector('[class*="bg-white"]', { timeout: 5000 });

    // Check if stats section is visible
    const statsSection = page.locator('.grid');
    await expect(statsSection).toBeVisible();
  });

  test('navigates to settings page', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('sidebar is visible', async ({ page }) => {
    // Check for sidebar presence
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
  });
});
