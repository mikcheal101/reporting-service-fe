import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Reports', () => {
  test('displays reports list', async ({ page }) => {
    await page.goto('/report');
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });

  test('shows add report button', async ({ page }) => {
    await page.goto('/report');
    const createBtn = page.locator('button:has-text("Add Report")');
    await expect(createBtn).toBeVisible();
  });
});
