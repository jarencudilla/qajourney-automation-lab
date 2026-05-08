// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('Dynamic DOM', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/dynamic-dom/`);
  });

  test('TC-01 | show element → becomes visible', async ({ page }) => {
    await page.getByTestId('show-btn').click();
    await expect(page.getByTestId('dynamic-element')).toBeVisible();
  });

  test('TC-02 | hide element → no longer visible', async ({ page }) => {
    await page.getByTestId('show-btn').click();
    await page.getByTestId('hide-btn').click();
    await expect(page.getByTestId('dynamic-element')).not.toBeVisible();
  });

  test('TC-03 | delayed element → appears after 3 seconds', async ({ page }) => {
    await page.getByTestId('delay-btn').click();
    await expect(page.getByTestId('delayed-element')).toBeVisible({ timeout: 5000 });
  });

  test('TC-04 | add item → appears in list', async ({ page }) => {
    await page.getByTestId('list-input').fill('My test item');
    await page.getByTestId('add-btn').click();
    await expect(page.getByTestId('dom-item-1')).toBeVisible();
    await expect(page.getByTestId('dom-item-1')).toContainText('My test item');
  });

  test('TC-05 | add empty input → nothing added to list', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await expect(page.getByTestId('dom-list')).not.toContainText('dom-item-1');
  });

  test('TC-06 | remove item → gone from DOM', async ({ page }) => {
    await page.getByTestId('list-input').fill('Item to remove');
    await page.getByTestId('add-btn').click();
    await expect(page.getByTestId('dom-item-1')).toBeVisible();
    await page.locator('[data-testid="dom-item-1"] button').click();
    await expect(page.getByTestId('dom-item-1')).not.toBeAttached();
  });

  test('TC-07 | toggle disabled → input becomes disabled', async ({ page }) => {
    await page.getByTestId('toggle-disable-btn').click();
    await expect(page.getByTestId('disabled-input')).toBeDisabled();
    await page.getByTestId('toggle-disable-btn').click();
    await expect(page.getByTestId('disabled-input')).toBeEnabled();
  });

});
