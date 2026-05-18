import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Report Types', () => {
  test('displays report types list', async ({ page }) => {
    await page.goto('/report-type');
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });

  test('shows add report type button', async ({ page }) => {
    await page.goto('/report-type');
    const createBtn = page.locator('button:has-text("Add Report Type")');
    await expect(createBtn).toBeVisible();
  });
});
