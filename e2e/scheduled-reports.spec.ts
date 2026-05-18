import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth', 'user.json');

test.use({ storageState: AUTH_FILE });

test.describe('Scheduled Reports', () => {
  test('displays scheduled reports list', async ({ page }) => {
    await page.goto('/scheduled-report');
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test('shows pending and completed tabs', async ({ page }) => {
    await page.goto('/scheduled-report');
    await expect(page.getByRole('tab', { name: /pending/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /completed/i })).toBeVisible();
  });
});
