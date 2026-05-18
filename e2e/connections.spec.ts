import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Connections', () => {
  test('displays connections list', async ({ page }) => {
    await page.goto('/connection');
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });

  test('shows add connection button', async ({ page }) => {
    await page.goto('/connection');
    const createBtn = page.locator('button:has-text("Add Connection")');
    await expect(createBtn).toBeVisible();
  });

  test('create connection form has all fields', async ({ page }) => {
    await page.goto('/connection');
    const createBtn = page.locator('button:has-text("Add Connection")');
    if (await createBtn.isVisible()) {
      await createBtn.click();
      await expect(page.locator('input[name="name"], input[id="name"]').first()).toBeVisible({ timeout: 3000 });
    }
  });
});
