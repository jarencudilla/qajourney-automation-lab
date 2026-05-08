# Playwright — QAJourney Automation Lab

Playwright scripts for [playground.qajourney.net](https://playground.qajourney.net). TypeScript and JavaScript versions included.

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# TypeScript (all browsers)
npx playwright test

# TypeScript (single browser)
npx playwright test --project=chromium

# JavaScript
npx playwright test tests-js/

# Headed (watch it run)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Interactive UI
npx playwright test --ui

# View report
npx playwright show-report
```

## Test Files

| File | Module | TCs |
|------|--------|-----|
| `login.spec.ts` | Login Scenario | 7 |
| `form-validation.spec.ts` | Form Validation | 7 |
| `basic-ui.spec.ts` | Basic UI Elements | 7 |
| `dynamic-dom.spec.ts` | Dynamic DOM | 7 |
| `alerts.spec.ts` | JavaScript Alerts | 5 |
| `iframes.spec.ts` | iFrame Interaction | 5 |
| `network-delay.spec.ts` | Network Delays | 5 |
| `broken-links.spec.ts` | Broken Links | 6 |

`tests-js/` contains the same files as `tests/` but in CommonJS JavaScript.

## Key Locator Patterns

```typescript
// Preferred — stable, framework-agnostic
page.getByTestId('username-input')

// Frame switching
const frame = page.frameLocator('[data-testid="form-iframe"]');
await frame.locator('[data-testid="iframe-input"]').fill('value');

// Explicit wait
await expect(page.getByTestId('delayed-element')).toBeVisible({ timeout: 5000 });

// Dialog handling
page.on('dialog', dialog => dialog.accept());
```

## Related Reading

- [Playwright for QA Testing](https://qajourney.net/playwright-for-qa-testing/)
- [Playwright Automation — Real World](https://qajourney.net/playwright-automation-qa-real-world/)
- [Playwright Visual Regression](https://qajourney.net/playwright-visual-regression-testing-guide/)
- [How to Optimize Playwright Scripts](https://qajourney.net/how-to-optimize-playwright-scripts-for-performance-testing/)
