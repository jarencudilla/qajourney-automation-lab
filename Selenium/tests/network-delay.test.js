const { Builder, By, until } = require('selenium-webdriver');

const BASE = 'https://playground.qajourney.net';

describe('Network Delays', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => { await driver.quit(); });

  it('TC-01 | auto-load → visible after 3s', async () => {
    await driver.get(`${BASE}/network-delay/`);
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="auto-content"]'))), 5000);
  });

  it('TC-02 | manual trigger → content appears', async () => {
    await driver.get(`${BASE}/network-delay/`);
    await driver.findElement(By.css('[data-testid="manual-trigger-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="manual-content"]'))), 5000);
  });

  it('TC-03 | fast load → content within 2s', async () => {
    await driver.get(`${BASE}/network-delay/`);
    await driver.findElement(By.css('[data-testid="fast-trigger-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="fast-content"]'))), 2000);
  });
});
