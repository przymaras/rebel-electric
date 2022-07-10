/// <reference types="cypress" />
import { viewports, languages } from '../support/constants';
import { fontShouldBeLoaded } from '../support/utils';

describe('Hangar', () => {
  languages.forEach((lang) => {
    context(`in ${lang} language`, () => {
      viewports.forEach(({ width, height }) => {
        context(`on ${width}x${height} size`, () => {
          it('should render TitleBox', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('TitleBox')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarTitleBox-${lang}-${width}x${height}`);
          });

          it('should render CategorySelectorIntro', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelectorIntro')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarCategorySelectorIntro-${lang}-${width}x${height}`);
          });

          it('should render CategorySelector', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('CategorySelector')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarCategorySelector-${lang}-${width}x${height}`);
          });

          it('should render SearchBar', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('SearchBar')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarSearchBar-${lang}-${width}x${height}`);
          });

          it('should render SearchResultSortBar', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('SearchResultSortBar')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarSearchResultSortBar-${lang}-${width}x${height}`);
          });

          it('should render DataBarLabels', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('DataBarLabels')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarDataBarLabels-${lang}-${width}x${height}`);
          });

          it('should render DataBarsHeadingContainer', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('DataBarsHeadingContainer').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('DataBarsHeadingContainer')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarDataBarsHeadingContainer-${lang}-${width}x${height}`);
          });

          it('should render vehiclesWrapper', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('vehiclesWrapper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('vehiclesWrapper')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarVehiclesWrapper-${lang}-${width}x${height}`);
          });

          it('should refine search when search text entered', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('SearchBarInput').type('test project 1');
            fontShouldBeLoaded();
            cy.getByTestId('vehiclesWrapper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('vehiclesWrapper')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarRefinedSearch-${lang}-${width}x${height}`);
          });

          it('should have sticky legend', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`).scrollTo(0, 1000);
            fontShouldBeLoaded();
            cy.screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.compareSnapshot(`HangarStickyLegend-${lang}-${width}x${height}`, {
              capture: 'viewport',
            });
          });

          it('should sort by most viewed', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('SortBy').select(1);
            fontShouldBeLoaded();
            cy.getByTestId('vehiclesWrapper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('vehiclesWrapper')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarSortMostViewed-${lang}-${width}x${height}`);
          });

          it('should sort by most liked', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('SortBy').select(2);
            fontShouldBeLoaded();
            cy.getByTestId('vehiclesWrapper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('vehiclesWrapper')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarSortMostLiked-${lang}-${width}x${height}`);
          });

          it('should refine search by category ebike DIY Hardtail', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Slide-catDiy').click();
            cy.getByTestId('Slide-catHardtail').click();
            cy.contains(/^test project 1$/i).should('not.exist');
            cy.contains(/^test project 2$/i).should('not.exist');
            cy.contains(/^test project 3$/i).should('not.exist');
            cy.contains(/^test project 4$/i).should('not.exist');
            cy.contains(/^test project 5$/i).should('not.exist');
            cy.contains(/^test project 6$/i).should('not.exist');
            cy.contains(/^test project 7$/i).should('not.exist');
            cy.contains(/^test project 8$/i).should('not.exist');
            cy.contains(/^test project 9$/i).should('not.exist');
            cy.contains(/^test project 10$/i).should('not.exist');
            cy.contains(/^test project 11$/i).should('exist');
            cy.contains(/^test project 12$/i).should('exist');
            cy.contains(/^test project 13$/i).should('not.exist');
            cy.contains(/^test project 14$/i).should('exist');
            cy.contains(/^test project 15$/i).should('exist');
          });

          it('should refine search by category ebike DIY Full', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Slide-catDiy').click();
            cy.getByTestId('Slide-catFull').click();
            cy.contains(/^test project 1$/i).should('exist');
            cy.contains(/^test project 2$/i).should('exist');
            cy.contains(/^test project 3$/i).should('exist');
            cy.contains(/^test project 4$/i).should('exist');
            cy.contains(/^test project 5$/i).should('exist');
            cy.contains(/^test project 6$/i).should('exist');
            cy.contains(/^test project 7$/i).should('exist');
            cy.contains(/^test project 8$/i).should('exist');
            cy.contains(/^test project 9$/i).should('exist');
            cy.contains(/^test project 10$/i).should('exist');
            cy.contains(/^test project 11$/i).should('not.exist');
            cy.contains(/^test project 12$/i).should('not.exist');
            cy.contains(/^test project 13$/i).should('exist');
            cy.contains(/^test project 14$/i).should('not.exist');
            cy.contains(/^test project 15$/i).should('not.exist');
          });

          it('should refine search by category ebike DIY Full FrontHub', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Slide-catDiy').click();
            cy.getByTestId('Slide-catFull').click();
            cy.getByTestId('Slide-catFrontHub').click();
            cy.contains(/^test project 1$/i).should('exist');
            cy.contains(/^test project 2$/i).should('not.exist');
            cy.contains(/^test project 3$/i).should('exist');
            cy.contains(/^test project 4$/i).should('not.exist');
            cy.contains(/^test project 5$/i).should('not.exist');
            cy.contains(/^test project 6$/i).should('not.exist');
            cy.contains(/^test project 7$/i).should('not.exist');
            cy.contains(/^test project 8$/i).should('not.exist');
            cy.contains(/^test project 9$/i).should('not.exist');
            cy.contains(/^test project 10$/i).should('not.exist');
            cy.contains(/^test project 11$/i).should('not.exist');
            cy.contains(/^test project 12$/i).should('not.exist');
            cy.contains(/^test project 13$/i).should('not.exist');
            cy.contains(/^test project 14$/i).should('not.exist');
            cy.contains(/^test project 15$/i).should('not.exist');
          });

          it('should enter vehicle page after vehicle click', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.contains(/^test project 1$/i).click();
            cy.url().should('eq', `http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            cy.contains(/^test project 1$/i).should('exist');
          });
        });
      });
    });
  });
});
