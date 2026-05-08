// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('Form Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/form/`);
  });

  test('TC-01 | empty form submit → required errors on all fields', async ({ page }) => {
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-name')).toBeVisible();
    await expect(page.locator('#err-email')).toBeVisible();
    await expect(page.locator('#err-pass')).toBeVisible();
  });

  test('TC-02 | invalid email format → format error', async ({ page }) => {
    await page.getByTestId('name-input').fill('Jane Tester');
    await page.getByTestId('email-input').fill('notanemail');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-email')).toBeVisible();
  });

  test('TC-03 | age below 18 → range error', async ({ page }) => {
    await page.getByTestId('name-input').fill('Jane Tester');
    await page.getByTestId('email-input').fill('jane@test.com');
    await page.getByTestId('age-input').fill('10');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-age')).toBeVisible();
  });

  test('TC-04 | age above 99 → range error', async ({ page }) => {
    await page.getByTestId('name-input').fill('Jane Tester');
    await page.getByTestId('email-input').fill('jane@test.com');
    await page.getByTestId('age-input').fill('150');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-age')).toBeVisible();
  });

  test('TC-05 | password under 6 chars → length error', async ({ page }) => {
    await page.getByTestId('name-input').fill('Jane Tester');
    await page.getByTestId('email-input').fill('jane@test.com');
    await page.getByTestId('password-input').fill('abc');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-pass')).toBeVisible();
  });

  test('TC-06 | all valid → success message shown', async ({ page }) => {
    await page.getByTestId('name-input').fill('Jane Tester');
    await page.getByTestId('email-input').fill('jane@test.com');
    await page.getByTestId('age-input').fill('28');
    await page.getByTestId('password-input').fill('securepass');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#form-result')).toBeVisible();
    await expect(page.locator('#form-result')).toContainText('successfully');
  });

  test('TC-07 | single char name → min length error', async ({ page }) => {
    await page.getByTestId('name-input').fill('J');
    await page.getByTestId('email-input').fill('jane@test.com');
    await page.getByTestId('password-input').fill('securepass');
    await page.getByTestId('submit-btn').click();
    await expect(page.locator('#err-name')).toBeVisible();
  });

});
