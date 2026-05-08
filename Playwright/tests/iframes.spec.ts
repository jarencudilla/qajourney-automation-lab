import { test, expect } from '@playwright/test';

const BASE = 'https://playground.qajourney.net';

test.describe('iFrame Interaction', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/iframes/`);
  });

  test('TC-01 | content iframe → heading text readable', async ({ page }) => {
    const frame = page.frameLocator('[data-testid="content-iframe"]');
    await expect(frame.locator('[data-testid="iframe-heading"]')).toBeVisible();
    await expect(frame.locator('[data-testid="iframe-heading"]')).toContainText('INSIDE IFRAME');
  });

  test('TC-02 | form iframe → fill input', async ({ page }) => {
    const frame = page.frameLocator('[data-testid="form-iframe"]');
    await frame.locator('[data-testid="iframe-input"]').fill('Hello from Playwright');
    await expect(frame.locator('[data-testid="iframe-input"]')).toHaveValue('Hello from Playwright');
  });

  test('TC-03 | form iframe → submit → result appears', async ({ page }) => {
    const frame = page.frameLocator('[data-testid="form-iframe"]');
    await frame.locator('[data-testid="iframe-input"]').fill('QA test submission');
    await frame.locator('[data-testid="iframe-submit"]').click();
    await expect(frame.locator('[data-testid="iframe-result"]')).toBeVisible();
    await expect(frame.locator('[data-testid="iframe-result"]')).toContainText('QA test submission');
  });

  test('TC-04 | iframe element not reachable from parent context', async ({ page }) => {
    // Trying to locate iframe-input from parent should return 0 matches
    const count = await page.locator('[data-testid="iframe-input"]').count();
    expect(count).toBe(0);
  });

  test('TC-05 | submit empty iframe input → result shows empty string', async ({ page }) => {
    const frame = page.frameLocator('[data-testid="form-iframe"]');
    await frame.locator('[data-testid="iframe-submit"]').click();
    await expect(frame.locator('[data-testid="iframe-result"]')).toContainText('Submitted:');
  });

});
