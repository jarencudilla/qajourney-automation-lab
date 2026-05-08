const BASE = 'https://playground.qajourney.net';

describe('Form Validation', () => {
  beforeEach(() => { cy.visit(`${BASE}/form/`); });

  it('TC-01 | empty submit → required errors on all fields', () => {
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-name').should('be.visible');
    cy.get('#err-email').should('be.visible');
    cy.get('#err-pass').should('be.visible');
  });

  it('TC-02 | invalid email → format error', () => {
    cy.get('[data-testid="name-input"]').type('Jane Tester');
    cy.get('[data-testid="email-input"]').type('notanemail');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-email').should('be.visible');
  });

  it('TC-03 | age below 18 → range error', () => {
    cy.get('[data-testid="name-input"]').type('Jane Tester');
    cy.get('[data-testid="email-input"]').type('jane@test.com');
    cy.get('[data-testid="age-input"]').type('10');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-age').should('be.visible');
  });

  it('TC-04 | age above 99 → range error', () => {
    cy.get('[data-testid="name-input"]').type('Jane Tester');
    cy.get('[data-testid="email-input"]').type('jane@test.com');
    cy.get('[data-testid="age-input"]').type('150');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-age').should('be.visible');
  });

  it('TC-05 | password under 6 chars → length error', () => {
    cy.get('[data-testid="name-input"]').type('Jane Tester');
    cy.get('[data-testid="email-input"]').type('jane@test.com');
    cy.get('[data-testid="password-input"]').type('abc');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-pass').should('be.visible');
  });

  it('TC-06 | all valid → success message', () => {
    cy.get('[data-testid="name-input"]').type('Jane Tester');
    cy.get('[data-testid="email-input"]').type('jane@test.com');
    cy.get('[data-testid="age-input"]').type('28');
    cy.get('[data-testid="password-input"]').type('securepass');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#form-result').should('be.visible').and('contain', 'successfully');
  });

  it('TC-07 | single char name → min length error', () => {
    cy.get('[data-testid="name-input"]').type('J');
    cy.get('[data-testid="email-input"]').type('jane@test.com');
    cy.get('[data-testid="password-input"]').type('securepass');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('#err-name').should('be.visible');
  });
});
