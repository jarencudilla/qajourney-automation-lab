const BASE = 'https://playground.qajourney.net';

describe('Basic UI Elements', () => {
  beforeEach(() => { cy.visit(`${BASE}/basic-ui/`); });

  it('TC-01 | text input accepts typed value', () => {
    cy.get('[data-testid="text-input"]').type('Hello QAJourney')
      .should('have.value', 'Hello QAJourney');
  });

  it('TC-02 | email input accepts valid email', () => {
    cy.get('[data-testid="email-input"]').type('tester@qajourney.net')
      .should('have.value', 'tester@qajourney.net');
  });

  it('TC-03 | dropdown default is empty', () => {
    cy.get('[data-testid="dropdown-select"]').should('have.value', '');
  });

  it('TC-04 | dropdown selection updates value', () => {
    cy.get('[data-testid="dropdown-select"]').select('playwright')
      .should('have.value', 'playwright');
  });

  it('TC-05 | checkbox toggles state', () => {
    cy.get('[data-testid="checkbox-option-1"]').should('not.be.checked');
    cy.get('[data-testid="checkbox-option-1"]').check().should('be.checked');
    cy.get('[data-testid="checkbox-option-1"]').uncheck().should('not.be.checked');
  });

  it('TC-06 | radio buttons are mutually exclusive', () => {
    cy.get('[data-testid="radio-yes"]').check().should('be.checked');
    cy.get('[data-testid="radio-no"]').check().should('be.checked');
    cy.get('[data-testid="radio-yes"]').should('not.be.checked');
  });

  it('TC-07 | capture button outputs all field states', () => {
    cy.get('[data-testid="text-input"]').type('test value');
    cy.get('[data-testid="dropdown-select"]').select('cypress');
    cy.get('[data-testid="checkbox-option-1"]').check();
    cy.get('[data-testid="radio-yes"]').check();
    cy.get('[data-testid="action-btn"]').click();
    cy.get('[data-testid="output-area"]')
      .should('be.visible')
      .and('contain', 'test value')
      .and('contain', 'cypress')
      .and('contain', 'true')
      .and('contain', 'yes');
  });
});
