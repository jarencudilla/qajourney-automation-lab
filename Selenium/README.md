# Selenium — QAJourney Automation Lab

Selenium WebDriver scripts for [playground.qajourney.net](https://playground.qajourney.net). JavaScript with Mocha test runner.

## Setup

```bash
npm install
```

Chrome must be installed. ChromeDriver is handled automatically by `selenium-webdriver` 4.x+.

## Run Tests

```bash
# All tests
npm test

# Single file
npx mocha tests/login.test.js --timeout 20000
```

## Test Files

| File | Module | TCs |
|------|--------|-----|
| `login.test.js` | Login Scenario | 7 |
| `form-validation.test.js` | Form Validation | 3 |
| `dynamic-dom.test.js` | Dynamic DOM | 4 |
| `network-delay.test.js` | Network Delays | 3 |

## Key Locator Patterns

```javascript
const { Builder, By, until } = require('selenium-webdriver');

// Element interaction
await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
await driver.findElement(By.css('[data-testid="login-button"]')).click();

// Explicit wait — always use this, never Thread.sleep()
await driver.wait(until.elementIsVisible(driver.findElement(By.id('msg-ok'))), 5000);
await driver.wait(until.elementLocated(By.css('[data-testid="dom-item-1"]')), 5000);

// Check enabled/disabled state
const enabled = await driver.findElement(By.css('[data-testid="disabled-input"]')).isEnabled();

// Check visibility
const displayed = await driver.findElement(By.id('msg-ok')).isDisplayed().catch(() => false);
```

## Related Reading

- [Selenium Automation for QA Testers](https://qajourney.net/selenium-automation-qa-testers/)
- [Test Automation Essentials](https://qajourney.net/test-automation-essentials-beginners-guide-tools-frameworks/)
