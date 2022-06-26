/* eslint-disable import/no-extraneous-dependencies */
import compareSnapshotCommand from 'cypress-visual-regression/dist/command';

compareSnapshotCommand({
  errorThreshold: 0.1,
});

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});
