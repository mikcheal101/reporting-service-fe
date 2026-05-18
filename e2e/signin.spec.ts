import { test, expect } from '@playwright/test';

test.describe('Sign In', () => {
  test('redirects to signin when unauthenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/signin');
  });

  test('shows signin page with all elements', async ({ page }) => {
    await page.goto('/signin');
    await expect(page.locator('h2')).toContainText('Welcome back');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Sign in');
  });

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input[name="username"]', 'wrong@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('[role="status"]')).toBeVisible({ timeout: 5000 });
  });

  test('shows error with empty form submission', async ({ page }) => {
    await page.goto('/signin');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="username"]:invalid')).toBeVisible();
  });
});
