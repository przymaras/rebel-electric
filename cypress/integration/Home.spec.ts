/// <reference types="cypress" />

describe('Home Page EN', () => {
  before(() => {
    cy.viewport('macbook-16');
  });
  it('renders RECENTLY ADDED VEHICLES', () => {
    cy.visit('http://localhost:3000/en');
    cy.contains('RECENTLY ADDED VEHICLES', { matchCase: false }).should('exist');
  });
});
