const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE = 'https://playground.qajourney.net';
const T = 5000;

describe('Form Validation', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(`${BASE}/form/`);
  });

  afterEach(async () => { await driver.quit(); });

  it('TC-01 | empty submit → required errors', async () => {
    await driver.findElement(By.css('[data-testid="submit-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-name'))), T);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-email'))), T);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-pass'))), T);
  });

  it('TC-02 | invalid email → format error', async () => {
    await driver.findElement(By.css('[data-testid="name-input"]')).sendKeys('Jane Tester');
    await driver.findElement(By.css('[data-testid="email-input"]')).sendKeys('notanemail');
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('password123');
    await driver.findElement(By.css('[data-testid="submit-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-email'))), T);
  });

  it('TC-06 | all valid → success message', async () => {
    await driver.findElement(By.css('[data-testid="name-input"]')).sendKeys('Jane Tester');
    await driver.findElement(By.css('[data-testid="email-input"]')).sendKeys('jane@test.com');
    await driver.findElement(By.css('[data-testid="age-input"]')).sendKeys('28');
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('securepass');
    await driver.findElement(By.css('[data-testid="submit-btn"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('form-result'))), T);
    const text = await driver.findElement(By.id('form-result')).getText();
    assert.ok(text.includes('successfully'));
  });
});
