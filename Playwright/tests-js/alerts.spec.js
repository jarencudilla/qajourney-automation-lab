// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('JavaScript Alerts', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/alerts/`);
  });

  test('TC-01 | alert() → dismissed, result updates', async ({ page }) => {
    page.on('dialog', dialog => {
      expect(dialog.type()).toBe('alert');
      dialog.accept();
    });
    await page.getByTestId('alert-btn').click();
    await expect(page.getByTestId('dialog-result')).toContainText('dismissed');
  });

  test('TC-02 | confirm() → accept → result shows true', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.getByTestId('confirm-btn').click();
    await expect(page.getByTestId('dialog-result')).toContainText('true');
  });

  test('TC-03 | confirm() → dismiss → result shows false', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss());
    await page.getByTestId('confirm-btn').click();
    await expect(page.getByTestId('dialog-result')).toContainText('false');
  });

  test('TC-04 | prompt() → enter value → appears in result', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept('QAJourney test value'));
    await page.getByTestId('prompt-btn').click();
    await expect(page.getByTestId('dialog-result')).toContainText('QAJourney test value');
  });

  test('TC-05 | prompt() → dismiss → null shown in result', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss());
    await page.getByTestId('prompt-btn').click();
    await expect(page.getByTestId('dialog-result')).toContainText('null');
  });

});
