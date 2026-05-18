import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Dashboard', () => {
  test('loads dashboard after signin', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('displays sidebar navigation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();
  });

  test('navigates to connection page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Connection');
    await expect(page).toHaveURL(/.*connection/);
  });

  test('navigates to report definition page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Report definition');
    await expect(page).toHaveURL(/.*report/);
  });

  test('navigates to report types page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Report Types');
    await expect(page).toHaveURL(/.*report-type/);
  });

  test('navigates to scheduled reports page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Scheduled reports');
    await expect(page).toHaveURL(/.*scheduled-report/);
  });

  test('navigates to settings page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Settings');
    await expect(page).toHaveURL(/.*settings/);
  });
});
