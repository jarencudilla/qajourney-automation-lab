import { test, expect } from '@playwright/test';

const BASE = 'https://playground.qajourney.net';

test.describe('Login Scenario', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/login/`);
  });

  // ── HAPPY PATH ──────────────────────────────────────────────────────────
  test('TC-01 | valid credentials (admin) → success message', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#msg-ok')).toBeVisible();
    await expect(page.locator('#msg-ok')).toContainText('Login successful');
  });

  test('TC-01b | valid credentials (tester) → success message', async ({ page }) => {
    await page.getByTestId('username-input').fill('tester');
    await page.getByTestId('password-input').fill('test456');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#msg-ok')).toBeVisible();
  });

  // ── SAD PATH ─────────────────────────────────────────────────────────────
  test('TC-02 | wrong password → error message shown', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#msg-err')).toBeVisible();
    await expect(page.locator('#msg-ok')).not.toBeVisible();
  });

  test('TC-03 | empty username → validation error on username', async ({ page }) => {
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#err-user')).toBeVisible();
    await expect(page.locator('#err-user')).toContainText('required');
  });

  test('TC-04 | empty password → validation error on password', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#err-pass')).toBeVisible();
    await expect(page.locator('#err-pass')).toContainText('required');
  });

  test('TC-05 | both fields empty → both validation errors shown', async ({ page }) => {
    await page.getByTestId('login-button').click();
    await expect(page.locator('#err-user')).toBeVisible();
    await expect(page.locator('#err-pass')).toBeVisible();
  });

  // ── EDGE CASES ───────────────────────────────────────────────────────────
  test('TC-06 | 3x wrong password → account locked message', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.getByTestId('username-input').fill('admin');
      await page.getByTestId('password-input').fill('wrongpassword');
      await page.getByTestId('login-button').click();
    }
    await expect(page.locator('#msg-locked')).toBeVisible();
    await expect(page.locator('#msg-locked')).toContainText('locked');
  });

  test('TC-07 | SQL injection in username → rejected, no bypass', async ({ page }) => {
    await page.getByTestId('username-input').fill("' OR 1=1 --");
    await page.getByTestId('password-input').fill('anything');
    await page.getByTestId('login-button').click();
    await expect(page.locator('#msg-ok')).not.toBeVisible();
  });

});
