/// <reference types="cypress" />
import { viewports, languages } from '../support/constants';
import { fontShouldBeLoaded } from '../support/utils';

describe('Hangar-Add-eBike', () => {
  after(() => {
    cy.request('http://localhost:3000/api/vehicles/delete/allCypress');
  });

  languages.forEach((lang) => {
    context(`in ${lang} language`, () => {
      viewports.forEach(({ width, height }) => {
        context(`on ${width}x${height} size`, () => {
          it('should render TitleBox', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            fontShouldBeLoaded();
            cy.getByTestId('TitleBox').should('be.visible');
            cy.getByTestId('TitleBox')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeTitleBox-${lang}-${width}x${height}`);
          });

          it('should render CategorySelectorIntro', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelectorIntro').should('be.visible');
            cy.getByTestId('CategorySelectorIntro')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeCategorySelectorIntro-${lang}-${width}x${height}`);
          });

          it('should render CategorySelector', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('CategorySelector').should('be.visible');
            fontShouldBeLoaded();
            cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('CategorySelector')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarCategorySelector-${lang}-${width}x${height}`);
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
            cy.getByTestId('AddEbikeFormRequired')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeFormRequired-${lang}-${width}x${height}`);
          });

          it('should match snapshot of optional form section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            fontShouldBeLoaded();
            cy.getByTestId('AddEbikeFormOptional')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeFormOptional-${lang}-${width}x${height}`);
          });

          it('should show error messages in every section', () => {
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

            cy.getByTestId('CategoryErrorMessage')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeCategoryErrorMessage-${lang}-${width}x${height}`);

            cy.getByTestId('AddEbikeFormRequired')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeFormRequiredError-${lang}-${width}x${height}`);

            cy.getByTestId('AddEbikeFormOptional')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeFormOptionalError-${lang}-${width}x${height}`);

            cy.getByTestId('SubmitSection')
              .should('be.visible')
              .wait(200)
              .compareSnapshot(`HangarAddEbikeFormSubmitButtonError-${lang}-${width}x${height}`);
          });

          it('should add ebike', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/add`);
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Slide-catDiy').click();
            cy.getByTestId('Slide-catHardtail').click();
            cy.getByTestId('Slide-catRearHub').click();

            cy.get('input[name="projectName"]').type('CypressProject');
            cy.get('.filepond--browser').selectFile('./cypress/uploads/KonaCoillerDeelux.jpg', {
              action: 'select',
              force: true,
            });
            cy.get('.filepond--file-status-main')
              .contains('Upload complete', { timeout: 10000 })
              .should('exist');
            cy.get('textarea[name="description"]').type('Test description');

            cy.get('input[name="bikeBase"]').type('Test Base');
            cy.get('select[name="wheelSize"]').select('other');
            cy.get('input[name="wheelOther"]').type('Test wheelOther');
            cy.get('select[name="brakes"]').select('other');
            cy.get('input[name="brakesOther"]').type('Test brakesOther');
            cy.get('input[name="mass"]').type('123');
            cy.get('input[name="massUnit"]').check('kg');
            cy.get('input[name="vmax"]').type('234');
            cy.get('input[name="vmaxUnit"]').check('kph');
            cy.get('input[name="range"]').type('345');
            cy.get('input[name="rangeUnit"]').check('km');
            cy.get('input[name="totalCost"]').type('456');
            cy.get('input[name="totalCostCurrency"]').check('PLN');

            cy.get('select[name="ctrlManuf"]').select('other');
            cy.get('input[name="ctrlManufOther"]').type('Test ctrlManufOther');
            cy.get('select[name="ctrlModel"]').select('other');
            cy.get('input[name="ctrlModelOther"]').type('Test ctrlModelOther');
            cy.get('input[name="ctrlCurrent"]').type('567');
            cy.get('select[name="motorManuf"]').select('other');
            cy.get('input[name="motorManufOther"]').type('Test motorManufOther');
            cy.get('select[name="motorModel"]').select('other');
            cy.get('input[name="motorModelOther"]').type('Test motorModelOther');

            cy.get('select[name="batteryCase"]').select('other');
            cy.get('input[name="batteryCaseOther"]').type('Test batteryCaseOther');
            cy.get('select[name="cellsType"]').select('other');
            cy.get('input[name="cellsTypeOther"]').type('Test cellsTypeOther');
            cy.get('select[name="batVoltage"]').select('other');
            cy.get('input[name="batVoltageOther"]').type('36');
            cy.get('input[name="capacity"]').type('789');
            cy.get('input[name="capacityUnit"]').check('Wh');

            cy.getByTestId('SubmitButton').click();
            cy.get(`[data-testid=vehiclesWrapper]`, { timeout: 15000 }).should('be.visible');
          });
        });
      });
    });
  });

  context('after adding ebike', () => {
    it('should have added six CypressProjects to database', () => {
      cy.viewport(1440, 890);
      cy.visit(`http://localhost:3000/en/hangar`).wait(21000); //SSG revelidate 20sec
      cy.visit(`http://localhost:3000/en/hangar`).wait(5000); //SSG revalidate send old version
      cy.visit(`http://localhost:3000/en/hangar`);
      cy.getByTestId('vehiclesWrapper')
        .get('h2:contains(CypressProject)')
        .should('have.length', '6');
    });

    it('should have correct values in added project', () => {
      cy.viewport(1440, 890);
      cy.visit(`http://localhost:3000/en/hangar`);
      cy.contains('CypressProject').click();
      cy.getByTestId('DataTablesEbike').should('exist');
      cy.getByTestId('TitleBox').contains('CypressProject').should('exist');
      cy.contains('Test description').should('exist');
      cy.contains('Base:').contains('Test Base').should('exist');
      cy.contains('Wheel size:').contains('Test wheelOther').should('exist');
      cy.contains('Brakes:').contains('Test brakesOther').should('exist');
      cy.contains('V max:').contains('234 kph').should('exist');
      cy.contains('Weight after mod.:').contains('123 kg').should('exist');
      cy.contains('Average range:').contains('345 km').should('exist');
      cy.contains('Cost:').contains('456 PLN').should('exist');
      cy.contains('Controller manufacturer:').contains('Test ctrlManufOther').should('exist');
      cy.contains('Controller model:').contains('Test ctrlModelOther').should('exist');
      cy.contains('Max. controller current:').contains('567 A').should('exist');
      cy.contains('Max. power:').contains('20412 W').should('exist');
      cy.contains('Energy consumption:').contains('2.29 Wh/km').should('exist');
      cy.contains('Motor type:').contains('Rear HUB').should('exist');
      cy.contains('Motor manufacturer:').contains('Test motorManufOther').should('exist');
      cy.contains('Motor model:').contains('Test motorModelOther').should('exist');
      cy.contains('Battery case type:').contains('Test batteryCaseOther').should('exist');
      cy.contains('Cells type:').contains('Test cellsTypeOther').should('exist');
      cy.contains('Nominal voltage:').contains('36 V').should('exist');
      cy.contains('Capacity [Wh]:').contains('789').should('exist');
      cy.contains('Capacity [Ah]:').contains('21.92').should('exist');
    });
  });
});
