import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Settings - Users', () => {
  test('displays users list', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('shows add user button', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('button', { name: 'Add User' }).first()).toBeVisible();
  });

  test('displays roles section', async ({ page }) => {
    await page.goto('/settings');
    await page.getByRole('button', { name: 'Roles' }).first().click();
    await expect(page.locator('table').first()).toBeVisible();
  });
});
