const BASE = 'https://playground.qajourney.net';

describe('Network Delays', () => {

  it('TC-01 | auto-load → content appears after 3 seconds', () => {
    cy.visit(`${BASE}/network-delay/`);
    cy.get('[data-testid="auto-content"]', { timeout: 5000 }).should('be.visible');
  });

  it('TC-02 | manual trigger → content appears', () => {
    cy.visit(`${BASE}/network-delay/`);
    cy.get('[data-testid="manual-trigger-btn"]').click();
    cy.get('[data-testid="manual-content"]', { timeout: 5000 }).should('be.visible');
  });

  it('TC-03 | fast load → content appears within 1.5s', () => {
    cy.visit(`${BASE}/network-delay/`);
    cy.get('[data-testid="fast-trigger-btn"]').click();
    cy.get('[data-testid="fast-content"]', { timeout: 1500 }).should('be.visible');
  });

  it('TC-05 | loading indicator visible before content', () => {
    cy.visit(`${BASE}/network-delay/`);
    cy.get('[data-testid="manual-trigger-btn"]').click();
    cy.get('[data-testid="manual-loading"]').should('be.visible');
    cy.get('[data-testid="manual-content"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="manual-loading"]').should('not.be.visible');
  });
});
