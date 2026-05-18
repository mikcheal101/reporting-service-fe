import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Navigation', () => {
  test.describe('Sidebar navigation', () => {
    const navItems = [
      { name: 'Dashboard', url: /.*dashboard/ },
      { name: 'Connection', url: /.*connection/ },
      { name: 'Report definition', url: /.*report/ },
      { name: 'Report Types', url: /.*report-type/ },
      { name: 'Scheduled reports', url: /.*scheduled-report/ },
      { name: 'Settings', url: /.*settings/ },
    ];

    for (const item of navItems) {
      test(`navigates to ${item.name}`, async ({ page }) => {
        await page.goto('/dashboard');
        await page.click(`text=${item.name}`);
        await expect(page).toHaveURL(item.url);
        await expect(page.locator('h1, h2, h3, h4, h5').first()).toBeVisible();
      });
    }
  });

  test('signs out from sidebar', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Logout');
    await expect(page).toHaveURL('/signin');
  });

  test('navigates back to dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Connection');
    await page.waitForURL('/connection');
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
