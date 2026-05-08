const BASE = 'https://playground.qajourney.net';

describe('Broken Link Testing', () => {
  beforeEach(() => { cy.visit(`${BASE}/broken-links/`); });

  it('TC-01 | valid external link → 200', () => {
    cy.get('[data-testid="link-valid-home"]').invoke('attr', 'href').then((href) => {
      cy.request({ url: href, failOnStatusCode: false })
        .its('status').should('eq', 200);
    });
  });

  it('TC-03 | broken link 1 → 404', () => {
    cy.get('[data-testid="link-broken-1"]').invoke('attr', 'href').then((href) => {
      cy.request({ url: `${BASE}${href}`, failOnStatusCode: false })
        .its('status').should('eq', 404);
    });
  });

  it('TC-04 | broken link 2 → 404', () => {
    cy.get('[data-testid="link-broken-2"]').invoke('attr', 'href').then((href) => {
      cy.request({ url: `${BASE}${href}`, failOnStatusCode: false })
        .its('status').should('eq', 404);
    });
  });

  it('TC-06 | crawl all data-testid links and log status codes', () => {
    cy.get('a[data-testid]').each(($link) => {
      const href = $link.attr('href');
      const testid = $link.attr('data-testid');
      const fullUrl = href.startsWith('http') ? href : `${BASE}${href}`;
      cy.request({ url: fullUrl, failOnStatusCode: false }).then((res) => {
        cy.log(`${testid} | ${fullUrl} → ${res.status}`);
      });
    });
  });
});
