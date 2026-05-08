# Cypress — QAJourney Automation Lab

Cypress scripts for [playground.qajourney.net](https://playground.qajourney.net).

## Setup

```bash
npm install
```

## Run Tests

```bash
# Headless (CI)
npm test

# Interactive (Cypress Test Runner)
npm run test:open

# Headed
npm run test:headed
```

## Test Files

| File | Module | TCs |
|------|--------|-----|
| `login.cy.js` | Login Scenario | 7 |
| `form-validation.cy.js` | Form Validation | 7 |
| `basic-ui.cy.js` | Basic UI Elements | 7 |
| `dynamic-dom.cy.js` | Dynamic DOM | 7 |
| `alerts.cy.js` | JavaScript Alerts | 5 |
| `iframes.cy.js` | iFrame Interaction | 4 |
| `network-delay.cy.js` | Network Delays | 4 |
| `broken-links.cy.js` | Broken Links | 4 |

## Key Locator Patterns

```javascript
// Standard selector
cy.get('[data-testid="username-input"]').type('admin');

// Frame interaction (srcdoc iframes)
cy.get('[data-testid="form-iframe"]').its('0.contentDocument.body')
  .find('[data-testid="iframe-input"]').type('value');

// Wait for delayed element
cy.get('[data-testid="auto-content"]', { timeout: 5000 }).should('be.visible');

// Dialog stubs
cy.on('window:alert', (text) => { expect(text).to.contain('expected'); });
cy.on('window:confirm', () => true);
cy.window().then((win) => { cy.stub(win, 'prompt').returns('value'); });

// Request assertion (broken links)
cy.request({ url: '/broken-path', failOnStatusCode: false }).its('status').should('eq', 404);
```

## Related Reading

- [Cypress Automation Testing Guide](https://qajourney.net/cypress-automation-testing-guide/)
- [Cypress Full-Stack Testing](https://qajourney.net/cypress-full-stack-testing-api-ui/)
