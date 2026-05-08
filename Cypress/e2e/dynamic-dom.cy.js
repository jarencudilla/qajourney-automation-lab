const BASE = 'https://playground.qajourney.net';

describe('Dynamic DOM', () => {
  beforeEach(() => { cy.visit(`${BASE}/dynamic-dom/`); });

  it('TC-01 | show element → becomes visible', () => {
    cy.get('[data-testid="show-btn"]').click();
    cy.get('[data-testid="dynamic-element"]').should('be.visible');
  });

  it('TC-02 | hide element → no longer visible', () => {
    cy.get('[data-testid="show-btn"]').click();
    cy.get('[data-testid="hide-btn"]').click();
    cy.get('[data-testid="dynamic-element"]').should('not.be.visible');
  });

  it('TC-03 | delayed element → appears after 3 seconds', () => {
    cy.get('[data-testid="delay-btn"]').click();
    cy.get('[data-testid="delayed-element"]', { timeout: 5000 }).should('be.visible');
  });

  it('TC-04 | add item → appears in list', () => {
    cy.get('[data-testid="list-input"]').type('My test item');
    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="dom-item-1"]').should('be.visible').and('contain', 'My test item');
  });

  it('TC-05 | empty input → nothing added', () => {
    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="dom-list"]').children().should('have.length', 0);
  });

  it('TC-06 | remove item → gone from DOM', () => {
    cy.get('[data-testid="list-input"]').type('Item to remove');
    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="dom-item-1"]').should('exist');
    cy.get('[data-testid="dom-item-1"] button').click();
    cy.get('[data-testid="dom-item-1"]').should('not.exist');
  });

  it('TC-07 | toggle disabled → input disabled state changes', () => {
    cy.get('[data-testid="toggle-disable-btn"]').click();
    cy.get('[data-testid="disabled-input"]').should('be.disabled');
    cy.get('[data-testid="toggle-disable-btn"]').click();
    cy.get('[data-testid="disabled-input"]').should('not.be.disabled');
  });
});
