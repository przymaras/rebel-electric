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
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            fontShouldBeLoaded();
            cy.getByTestId('TitleBox').should('be.visible');
            cy.getByTestId('TitleBox').compareSnapshot(
              `HangarAddEbikeTitleBox-${lang}-${width}x${height}`
            );
          });

          it('should render CategorySelectorIntro', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelectorIntro').should('be.visible');
            cy.getByTestId('CategorySelectorIntro').compareSnapshot(
              `HangarAddEbikeCategorySelectorIntro-${lang}-${width}x${height}`
            );
          });

          it('should render CategorySelector', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('CategorySelector').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('CategorySelector').compareSnapshot(
              `HangarCategorySelector-${lang}-${width}x${height}`
            );
          });

          it('should render ChooseCategoryToGetForm when category not selected', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('ChooseCategoryToGetForm').should('be.visible');
          });

          it('should not render any form when category not selected', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Form').should('not.exist');
          });

          it('should not render any form when category other than eBike selected', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catECar').click({ force: true });
            cy.getByTestId('Form').should('not.exist');
            cy.getByTestId('FormNotPrepared').should('be.visible');
            cy.getByTestId('Slide-catEMoto').click({ force: true });
            cy.getByTestId('Form').should('not.exist');
            cy.getByTestId('FormNotPrepared').should('be.visible');
            cy.getByTestId('Slide-catOther').click({ force: true });
            cy.getByTestId('Form').should('not.exist');
            cy.getByTestId('FormNotPrepared').should('be.visible');
          });

          it('should render add ebike form when ebike or monster bike category selected', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Form').should('be.visible');
            cy.getByTestId('AddEbikeForm').should('be.visible');
            cy.getByTestId('FormNotPrepared').should('not.exist');
            cy.getByTestId('ChooseCategoryToGetForm').should('not.exist');
            cy.getByTestId('Slide-catMonster').click();
            cy.getByTestId('Form').should('be.visible');
            cy.getByTestId('AddEbikeForm').should('be.visible');
            cy.getByTestId('FormNotPrepared').should('not.exist');
            cy.getByTestId('ChooseCategoryToGetForm').should('not.exist');
          });

          it('should match snapshot of required form section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            fontShouldBeLoaded();
            cy.getByTestId('AddEbikeFormRequired').compareSnapshot(
              `HangarAddEbikeFormRequired-${lang}-${width}x${height}`
            );
          });

          it('should match snapshot of optional form section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            fontShouldBeLoaded();
            cy.getByTestId('AddEbikeFormOptional').compareSnapshot(
              `HangarAddEbikeFormOptional-${lang}-${width}x${height}`
            );
          });

          it.only('should show error messages in every section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('SubmitButton').click();
            cy.get('select[name="wheelSize"]').select('other');
            cy.get('select[name="brakes"]').select('other');
            cy.get('select[name="ctrlManuf"]').select('other');
            cy.get('select[name="ctrlModel"]').select('other');
            cy.get('select[name="motorManuf"]').select('other');
            cy.get('select[name="motorModel"]').select('other');
            cy.get('select[name="batteryCase"]').select('other');
            cy.get('select[name="cellsType"]').select('other');
            cy.get('select[name="batVoltage"]').select('other');
            cy.get('input[name="mass"]').type('5');
            cy.get('input[name="vmax"]').type('5');
            cy.get('input[name="range"]').type('5');
            cy.get('input[name="totalCost"]').type('5');
            cy.get('input[name="ctrlCurrent"]').type('23454323453425');
            cy.get('input[name="capacity"]').type('4');

            fontShouldBeLoaded();

            cy.getByTestId('CategoryErrorMessage').compareSnapshot(
              `HangarAddEbikeCategoryErrorMessage-${lang}-${width}x${height}`
            );

            cy.getByTestId('AddEbikeFormRequired').compareSnapshot(
              `HangarAddEbikeFormRequiredError-${lang}-${width}x${height}`
            );

            cy.getByTestId('AddEbikeFormOptional').compareSnapshot(
              `HangarAddEbikeFormOptionalError-${lang}-${width}x${height}`
            );

            cy.getByTestId('SubmitSection').compareSnapshot(
              `HangarAddEbikeFormSubmitButtonError-${lang}-${width}x${height}`
            );
          });
        });
      });
    });
  });
});
