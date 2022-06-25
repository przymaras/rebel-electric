export const fontShouldBeLoaded = () => {
  cy.document().then((doc) => {
    cy.wrap(doc.fonts).invoke('check', '16px Roboto').should('be.true');
  });
};
