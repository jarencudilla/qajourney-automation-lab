const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE = 'https://playground.qajourney.net';
const T = 5000;

describe('Dynamic DOM', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(`${BASE}/dynamic-dom/`);
  });

  afterEach(async () => { await driver.quit(); });

  it('TC-01 | show element → visible', async () => {
    await driver.findElement(By.css('[data-testid="show-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="dynamic-element"]'))), T);
  });

  it('TC-03 | delayed element → appears after 3s', async () => {
    await driver.findElement(By.css('[data-testid="delay-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="delayed-element"]'))), 6000);
  });

  it('TC-04 | add item → in list', async () => {
    await driver.findElement(By.css('[data-testid="list-input"]')).sendKeys('My test item');
    await driver.findElement(By.css('[data-testid="add-btn"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="dom-item-1"]')), T);
    const text = await driver.findElement(By.css('[data-testid="dom-item-1"]')).getText();
    assert.ok(text.includes('My test item'));
  });

  it('TC-07 | toggle disabled → input disabled', async () => {
    await driver.findElement(By.css('[data-testid="toggle-disable-btn"]')).click();
    const enabled = await driver.findElement(By.css('[data-testid="disabled-input"]')).isEnabled();
    assert.strictEqual(enabled, false);
  });
});
