const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE = 'https://playground.qajourney.net';
const T = 5000;

describe('Login Scenario', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(`${BASE}/login/`);
  });

  afterEach(async () => { await driver.quit(); });

  it('TC-01 | valid credentials → success message', async () => {
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('admin123');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    const msg = await driver.wait(until.elementIsVisible(driver.findElement(By.id('msg-ok'))), T);
    assert.ok((await msg.getText()).includes('Login successful'));
  });

  it('TC-02 | wrong password → error message', async () => {
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('wrongpassword');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('msg-err'))), T);
  });

  it('TC-03 | empty username → validation error', async () => {
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('admin123');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-user'))), T);
  });

  it('TC-04 | empty password → validation error', async () => {
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-pass'))), T);
  });

  it('TC-05 | both empty → both errors shown', async () => {
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-user'))), T);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('err-pass'))), T);
  });

  it('TC-06 | 3x wrong → account locked', async () => {
    for (let i = 0; i < 3; i++) {
      const u = await driver.findElement(By.css('[data-testid="username-input"]'));
      await u.clear(); await u.sendKeys('admin');
      const p = await driver.findElement(By.css('[data-testid="password-input"]'));
      await p.clear(); await p.sendKeys('wrongpassword');
      await driver.findElement(By.css('[data-testid="login-button"]')).click();
    }
    const locked = await driver.wait(until.elementIsVisible(driver.findElement(By.id('msg-locked'))), T);
    assert.ok((await locked.getText()).includes('locked'));
  });

  it('TC-07 | SQL injection → rejected', async () => {
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys("' OR 1=1 --");
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('anything');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    const displayed = await driver.findElement(By.id('msg-ok')).isDisplayed().catch(() => false);
    assert.strictEqual(displayed, false);
  });
});
