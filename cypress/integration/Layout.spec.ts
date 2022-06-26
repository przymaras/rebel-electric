/// <reference types="cypress" />
import { viewports, languages, DESKTOP_WIDTH } from '../support/constants';
import { fontShouldBeLoaded } from '../support/utils';

describe('Layout', () => {
  languages.forEach((lang) => {
    context(`in ${lang} language`, () => {
      viewports.forEach(({ width, height }) => {
        context(`on ${width}x${height} size`, () => {
          it('should render Header components', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('Header').should('be.visible');
            cy.getByTestId('HeaderLogo').should('be.visible');
            cy.getByTestId('HeaderText').contains('REBEL ELECTRIC').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('Header').compareSnapshot(`Header-${lang}-${width}x${height}`);
          });

          it('should render and toggle Nav component', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('Nav').should('exist');
            cy.getByTestId('ToggleNavButton').should('exist');
            if (width < DESKTOP_WIDTH) {
              cy.getByTestId('ToggleNavButton').should('be.visible');
              cy.getByTestId('Nav').should('not.be.visible');
              fontShouldBeLoaded();
              cy.compareSnapshot(`Mobile-nav-hidden-${lang}-${width}x${height}`, {
                capture: 'viewport',
                clip: { x: 0, y: 0, width: width - 17, height },
              });
              cy.getByTestId('ToggleNavButton').click();
              cy.scrollTo('top');
              fontShouldBeLoaded();
              cy.compareSnapshot(`Mobile-nav-visible-${lang}-${width}x${height}`, {
                capture: 'viewport',
              });
              cy.getByTestId('Nav').should('be.visible');
              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('Nav').should('not.be.visible');
            } else {
              cy.getByTestId('ToggleNavButton').should('not.be.visible');
              cy.getByTestId('Nav').should('be.visible');
            }
          });

          it('shoud render and follow NavItem links', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);

            if (width < DESKTOP_WIDTH) {
              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('NavLinkHome').click();
              cy.getByTestId('Nav').should('not.be.visible');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('NavLinkKnowledgeBase').click();
              cy.getByTestId('Nav').should('not.be.visible');
              cy.url().should('eq', `http://localhost:3000/${lang}/knowledge`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('NavLinkHangar').click();
              cy.getByTestId('Nav').should('not.be.visible');
              cy.url().should('eq', `http://localhost:3000/${lang}/hangar`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('NavLinkAddNew').click();
              cy.getByTestId('Nav').should('not.be.visible');
              cy.url().should('eq', `http://localhost:3000/${lang}/hangar/add`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('ToggleNavButton').click();
              cy.getByTestId('NavLinkLogin').click();
              cy.getByTestId('Nav').should('not.be.visible');
              cy.url().should('eq', `http://localhost:3000/${lang}/users/login`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);
            } else {
              cy.getByTestId('NavLinkHome').click();
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('NavLinkKnowledgeBase').click();
              cy.url().should('eq', `http://localhost:3000/${lang}/knowledge`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('NavLinkHangar').click();
              cy.url().should('eq', `http://localhost:3000/${lang}/hangar`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('NavLinkAddNew').click();
              cy.url().should('eq', `http://localhost:3000/${lang}/hangar/add`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);

              cy.getByTestId('NavLinkLogin').click();
              cy.url().should('eq', `http://localhost:3000/${lang}/users/login`);
              cy.go('back');
              cy.url().should('eq', `http://localhost:3000/${lang}`);
            }
          });
          it('should render Footer components', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('Footer').should('be.visible');
            cy.getByTestId('FooterLogo').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('Footer').compareSnapshot(`Footer-${lang}-${width}x${height}`);
          });
        });
      });
    });
  });
});
