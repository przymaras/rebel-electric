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
            cy.getByTestId('TitleBox').should('be.visible');
            cy.getByTestId('TitleBox').compareSnapshot(`HangarTitleBox-${lang}-${width}x${height}`);
          });

          it('should render CategorySelectorIntro', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('CategorySelectorIntro').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelectorIntro').compareSnapshot(
              `HangarCategorySelectorIntro-${lang}-${width}x${height}`
            );
          });

          it('should render CategorySelector', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('CategorySelector').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelector').compareSnapshot(
              `HangarCategorySelector-${lang}-${width}x${height}`
            );
          });

          it('should render SearchBar', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('SearchBar').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('SearchBar').compareSnapshot(
              `HangarSearchBar-${lang}-${width}x${height}`
            );
          });

          it('should render SearchResultSortBar', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('SearchResultSortBar').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('SearchResultSortBar').compareSnapshot(
              `HangarSearchResultSortBar-${lang}-${width}x${height}`
            );
          });

          it('should render DataBarLabels', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('DataBarLabels').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('DataBarLabels').compareSnapshot(
              `HangarDataBarLabels-${lang}-${width}x${height}`
            );
          });

          it('should render DataBarsHeadingContainer', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('DataBarsHeadingContainer').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('DataBarsHeadingContainer').compareSnapshot(
              `HangarDataBarsHeadingContainer-${lang}-${width}x${height}`
            );
          });

          it('should render vehiclesWrapper', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            cy.getByTestId('vehiclesWrapper').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('vehiclesWrapper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('vehiclesWrapper').compareSnapshot(
              `HangarVehiclesWrapper-${lang}-${width}x${height}`
            );
          });
        });
      });
    });
  });
});
