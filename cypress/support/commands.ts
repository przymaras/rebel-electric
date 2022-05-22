/* eslint-disable import/no-extraneous-dependencies */
import compareSnapshotCommand from 'cypress-visual-regression/dist/command';

compareSnapshotCommand();

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});
