// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://playground.qajourney.net';

test.describe('Broken Link Testing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/broken-links/`);
  });

  test('TC-01 | valid external link → returns 200', async ({ page }) => {
    const href = await page.getByTestId('link-valid-home').getAttribute('href');
    const response = await page.request.get(href);
    expect(response.status()).toBe(200);
  });

  test('TC-02 | valid internal link → returns 200', async ({ page }) => {
    const href = await page.getByTestId('link-valid-basic-ui').getAttribute('href');
    const response = await page.request.get(`${BASE}${href}`);
    expect(response.status()).toBe(200);
  });

  test('TC-03 | broken link 1 → returns 404', async ({ page }) => {
    const href = await page.getByTestId('link-broken-1').getAttribute('href');
    const response = await page.request.get(`${BASE}${href}`);
    expect(response.status()).toBe(404);
  });

  test('TC-04 | broken link 2 → returns 404', async ({ page }) => {
    const href = await page.getByTestId('link-broken-2').getAttribute('href');
    const response = await page.request.get(`${BASE}${href}`);
    expect(response.status()).toBe(404);
  });

  test('TC-05 | redirect link → returns 301 or 302', async ({ page }) => {
    const response = await page.request.get('https://www.qajourney.net', {
      maxRedirects: 0,
    });
    expect([301, 302]).toContain(response.status());
  });

  test('TC-06 | crawl all data-testid links and classify by status', async ({ page }) => {
    const links = await page.locator('a[data-testid]').all();
    const results = [];

    for (const link of links) {
      const testid = await link.getAttribute('data-testid') ?? '';
      const href = await link.getAttribute('href') ?? '';
      const fullUrl = href.startsWith('http') ? href : `${BASE}${href}`;
      try {
        const response = await page.request.get(fullUrl, { maxRedirects: 0 });
        results.push({ testid, href, status: response.status() });
      } catch {
        results.push({ testid, href, status: 0 });
      }
    }

    console.table(results);

    // At least one link should be 200 and one should be 404
    expect(results.some(r => r.status === 200)).toBe(true);
    expect(results.some(r => r.status === 404)).toBe(true);
  });

});
