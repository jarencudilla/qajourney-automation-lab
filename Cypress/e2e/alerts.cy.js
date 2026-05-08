const BASE = 'https://playground.qajourney.net';

describe('JavaScript Alerts', () => {
  beforeEach(() => { cy.visit(`${BASE}/alerts/`); });

  it('TC-01 | alert() → dismissed, result updates', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.contain('QAJourney');
    });
    cy.get('[data-testid="alert-btn"]').click();
    cy.get('[data-testid="dialog-result"]').should('contain', 'dismissed');
  });

  it('TC-02 | confirm() → accept → result shows true', () => {
    cy.on('window:confirm', () => true);
    cy.get('[data-testid="confirm-btn"]').click();
    cy.get('[data-testid="dialog-result"]').should('contain', 'true');
  });

  it('TC-03 | confirm() → dismiss → result shows false', () => {
    cy.on('window:confirm', () => false);
    cy.get('[data-testid="confirm-btn"]').click();
    cy.get('[data-testid="dialog-result"]').should('contain', 'false');
  });

  it('TC-04 | prompt() → enter value → appears in result', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('QAJourney test value');
    });
    cy.get('[data-testid="prompt-btn"]').click();
    cy.get('[data-testid="dialog-result"]').should('contain', 'QAJourney test value');
  });

  it('TC-05 | prompt() → dismiss → null shown in result', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(null);
    });
    cy.get('[data-testid="prompt-btn"]').click();
    cy.get('[data-testid="dialog-result"]').should('contain', 'null');
  });
});
