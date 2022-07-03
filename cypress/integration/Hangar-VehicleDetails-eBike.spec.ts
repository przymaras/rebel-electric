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
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('TitleBox').should('be.visible');
            cy.getByTestId('TitleBox').compareSnapshot(
              `HangarVehicleDetailsTitleBox-${lang}-${width}x${height}`
            );
          });

          it('should render VehicleSwiper', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('VehicleSwiper').should('be.visible');
            cy.getByTestId('VehicleSwiper').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('VehicleSwiper').compareSnapshot(
              `HangarVehicleDetailsVehicleSwiper-${lang}-${width}x${height}`,
              0.15
            );
          });

          it('should render VehicleVeiwsCatLikes', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('VehicleVeiwsCatLikes').should('be.visible');
            cy.getByTestId('VehicleVeiwsCatLikes').compareSnapshot(
              `HangarVehicleDetailsVehicleVeiwsCatLikes-${lang}-${width}x${height}`
            );
          });

          it('should render DataTablesEbike', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('DataTablesEbike').should('be.visible');
            cy.getByTestId('DataTablesEbike').compareSnapshot(
              `HangarVehicleDetailsDataTablesEbike-${lang}-${width}x${height}`
            );
          });

          it('should render Description', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('Description').should('be.visible');
            cy.getByTestId('Description').compareSnapshot(
              `HangarVehicleDetailsDescription-${lang}-${width}x${height}`
            );
          });

          it('should render VehicleButtons', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            fontShouldBeLoaded();
            cy.getByTestId('VehicleButtons').should('be.visible');
            cy.getByTestId('VehicleButtons').compareSnapshot(
              `HangarVehicleDetailsVehicleButtons-${lang}-${width}x${height}`
            );
          });
        });
      });
    });
  });
});
