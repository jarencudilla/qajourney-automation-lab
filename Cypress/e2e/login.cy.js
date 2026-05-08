const BASE = 'https://playground.qajourney.net';

describe('Login Scenario', () => {

  beforeEach(() => {
    cy.visit(`${BASE}/login/`);
  });

  // ── HAPPY PATH ──────────────────────────────────────────────────────────
  it('TC-01 | valid credentials (admin) → success message', () => {
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('admin123');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#msg-ok').should('be.visible').and('contain', 'Login successful');
  });

  it('TC-01b | valid credentials (tester) → success message', () => {
    cy.get('[data-testid="username-input"]').type('tester');
    cy.get('[data-testid="password-input"]').type('test456');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#msg-ok').should('be.visible');
  });

  // ── SAD PATH ─────────────────────────────────────────────────────────────
  it('TC-02 | wrong password → error message shown', () => {
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#msg-err').should('be.visible');
    cy.get('#msg-ok').should('not.be.visible');
  });

  it('TC-03 | empty username → validation error', () => {
    cy.get('[data-testid="password-input"]').type('admin123');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#err-user').should('be.visible').and('contain', 'required');
  });

  it('TC-04 | empty password → validation error', () => {
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#err-pass').should('be.visible').and('contain', 'required');
  });

  it('TC-05 | both fields empty → both errors shown', () => {
    cy.get('[data-testid="login-button"]').click();
    cy.get('#err-user').should('be.visible');
    cy.get('#err-pass').should('be.visible');
  });

  // ── EDGE CASES ───────────────────────────────────────────────────────────
  it('TC-06 | 3x wrong password → account locked', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('[data-testid="username-input"]').clear().type('admin');
      cy.get('[data-testid="password-input"]').clear().type('wrongpassword');
      cy.get('[data-testid="login-button"]').click();
    }
    cy.get('#msg-locked').should('be.visible').and('contain', 'locked');
  });

  it('TC-07 | SQL injection → rejected, no bypass', () => {
    cy.get('[data-testid="username-input"]').type("' OR 1=1 --");
    cy.get('[data-testid="password-input"]').type('anything');
    cy.get('[data-testid="login-button"]').click();
    cy.get('#msg-ok').should('not.be.visible');
  });

});
