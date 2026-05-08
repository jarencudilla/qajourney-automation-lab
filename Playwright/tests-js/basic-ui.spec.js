// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('Basic UI Elements', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/basic-ui/`);
  });

  test('TC-01 | text input accepts and displays typed value', async ({ page }) => {
    await page.getByTestId('text-input').fill('Hello QAJourney');
    await expect(page.getByTestId('text-input')).toHaveValue('Hello QAJourney');
  });

  test('TC-02 | email input accepts valid email', async ({ page }) => {
    await page.getByTestId('email-input').fill('tester@qajourney.net');
    await expect(page.getByTestId('email-input')).toHaveValue('tester@qajourney.net');
  });

  test('TC-03 | dropdown default is empty placeholder', async ({ page }) => {
    await expect(page.getByTestId('dropdown-select')).toHaveValue('');
  });

  test('TC-04 | dropdown selection updates value', async ({ page }) => {
    await page.getByTestId('dropdown-select').selectOption('playwright');
    await expect(page.getByTestId('dropdown-select')).toHaveValue('playwright');
  });

  test('TC-05 | checkbox toggles between checked and unchecked', async ({ page }) => {
    const cb = page.getByTestId('checkbox-option-1');
    await expect(cb).not.toBeChecked();
    await cb.check();
    await expect(cb).toBeChecked();
    await cb.uncheck();
    await expect(cb).not.toBeChecked();
  });

  test('TC-06 | radio buttons are mutually exclusive', async ({ page }) => {
    await page.getByTestId('radio-yes').check();
    await expect(page.getByTestId('radio-yes')).toBeChecked();
    await page.getByTestId('radio-no').check();
    await expect(page.getByTestId('radio-no')).toBeChecked();
    await expect(page.getByTestId('radio-yes')).not.toBeChecked();
  });

  test('TC-07 | capture button outputs all current field states', async ({ page }) => {
    await page.getByTestId('text-input').fill('test value');
    await page.getByTestId('dropdown-select').selectOption('cypress');
    await page.getByTestId('checkbox-option-1').check();
    await page.getByTestId('radio-yes').check();
    await page.getByTestId('action-btn').click();
    await expect(page.getByTestId('output-area')).toBeVisible();
    await expect(page.getByTestId('output-area')).toContainText('test value');
    await expect(page.getByTestId('output-area')).toContainText('cypress');
    await expect(page.getByTestId('output-area')).toContainText('true');
    await expect(page.getByTestId('output-area')).toContainText('yes');
  });

});
