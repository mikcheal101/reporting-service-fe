import { test as setup, expect } from '@playwright/test';

const AUTH_FILE = 'e2e/.auth/user.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/signin');
  await page.fill('input[name="username"]', 'super-admin@samlemail.com');
  await page.fill('input[name="password"]', 'super-admin@samlemail.com||Password@1234567890');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard', { timeout: 10000 });
  await page.context().storageState({ path: AUTH_FILE });
});
