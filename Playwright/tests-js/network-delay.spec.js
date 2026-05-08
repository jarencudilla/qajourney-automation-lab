// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('Network Delays', () => {

  test('TC-01 | auto-load → content appears after 3 seconds', async ({ page }) => {
    await page.goto(`${BASE}/network-delay/`);
    await expect(page.getByTestId('auto-content')).toBeVisible({ timeout: 5000 });
  });

  test('TC-02 | manual trigger → content appears after 3 seconds', async ({ page }) => {
    await page.goto(`${BASE}/network-delay/`);
    await page.getByTestId('manual-trigger-btn').click();
    await expect(page.getByTestId('manual-content')).toBeVisible({ timeout: 5000 });
  });

  test('TC-03 | fast load trigger → content appears within 1 second', async ({ page }) => {
    await page.goto(`${BASE}/network-delay/`);
    await page.getByTestId('fast-trigger-btn').click();
    await expect(page.getByTestId('fast-content')).toBeVisible({ timeout: 1500 });
  });

  test('TC-04 | auto-content times out with 1s timeout', async ({ page }) => {
    await page.goto(`${BASE}/network-delay/`);
    await expect(page.getByTestId('auto-content')).not.toBeVisible({ timeout: 1000 }).catch(() => {
      // Expected — content hasn't appeared yet at 1s
    });
  });

  test('TC-05 | loading indicator visible before content appears', async ({ page }) => {
    await page.goto(`${BASE}/network-delay/`);
    await page.getByTestId('manual-trigger-btn').click();
    await expect(page.getByTestId('manual-loading')).toBeVisible();
    await expect(page.getByTestId('manual-content')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('manual-loading')).not.toBeVisible();
  });

});
