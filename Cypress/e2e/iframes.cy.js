const BASE = 'https://playground.qajourney.net';

describe('iFrame Interaction', () => {
  beforeEach(() => { cy.visit(`${BASE}/iframes/`); });

  it('TC-01 | content iframe → heading text readable', () => {
    cy.get('[data-testid="content-iframe"]').its('0.contentDocument.body')
      .find('[data-testid="iframe-heading"]')
      .should('be.visible')
      .and('contain', 'INSIDE IFRAME');
  });

  it('TC-02 | form iframe → fill input', () => {
    cy.get('[data-testid="form-iframe"]').its('0.contentDocument.body')
      .find('[data-testid="iframe-input"]')
      .type('Hello from Cypress')
      .should('have.value', 'Hello from Cypress');
  });

  it('TC-03 | form iframe → submit → result appears', () => {
    cy.get('[data-testid="form-iframe"]').its('0.contentDocument.body').then(($body) => {
      cy.wrap($body).find('[data-testid="iframe-input"]').type('QA test submission');
      cy.wrap($body).find('[data-testid="iframe-submit"]').click();
      cy.wrap($body).find('[data-testid="iframe-result"]')
        .should('be.visible')
        .and('contain', 'QA test submission');
    });
  });

  it('TC-04 | iframe element not reachable from parent', () => {
    cy.get('[data-testid="iframe-input"]').should('not.exist');
  });
});
