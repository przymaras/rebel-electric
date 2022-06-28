/// <reference types="cypress" />
import { viewports, languages } from '../support/constants';
import { fontShouldBeLoaded } from '../support/utils';

describe.only('Hangar-CategorySelector', () => {
  languages.forEach((lang) => {
    context(`in ${lang} language`, () => {
      viewports.forEach(({ width, height }) => {
        context(`on ${width}x${height} size`, () => {
          it('should render eBikeCategory 1', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}/hangar`);
            fontShouldBeLoaded();
            cy.getByTestId('Slide-catEbike').click();
            cy.getByTestId('Slide-catDiy').click();
            cy.getByTestId('Slide-catHardtail').click();
            cy.getByTestId('Slide-catRearHub').click();
            cy.getByTestId('Slide-catMidPower').click().wait(500);
            cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
            cy.getByTestId('CategorySelector').compareSnapshot(
              `HangarCategorySelectorEbike1-${lang}-${width}x${height}`
            );
          });
        });
      });
      context(`on 1440x890 size`, () => {
        it('should render eBikeCategory 2', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catDiy').click();
          cy.getByTestId('Slide-catHardtail').click();
          cy.getByTestId('Slide-catFrontHub').click();
          cy.getByTestId('Slide-catMidPower').click().wait(500);
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike2-${lang}-1440x890`
          );
        });
        it('should render eBikeCategory 3', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catDiy').click();
          cy.getByTestId('Slide-catHardtail').click();
          cy.getByTestId('Slide-catMidDrive').click();
          cy.getByTestId('Slide-catMidPower').click().wait(500);
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike3-${lang}-1440x890`
          );
        });
        it('should render eBikeCategory 4', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catDiy').click();
          cy.getByTestId('Slide-catFull').click();
          cy.getByTestId('Slide-catRearHub').click();
          cy.getByTestId('Slide-catMidPower').click().wait(500);
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike4-${lang}-1440x890`
          );
        });
        it('should render eBikeCategory 5', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catDiy').click();
          cy.getByTestId('Slide-catFull').click();
          cy.getByTestId('Slide-catFrontHub').click();
          cy.getByTestId('Slide-catMidPower').click().wait(500);
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike5-${lang}-1440x890`
          );
        });
        it('should render eBikeCategory 6', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catDiy').click();
          cy.getByTestId('Slide-catFull').click();
          cy.getByTestId('Slide-catMidDrive').click();
          cy.getByTestId('Slide-catMidPower').click().wait(500);
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike6-${lang}-1440x890`
          );
        });
        it('should render eBikeCategory 7', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEbike').click();
          cy.getByTestId('Slide-catFactory').click();
          cy.getByTestId('Slide-catFull').click();
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEbike7-${lang}-1440x890`
          );
        });
        it('should render monsterBikeCategory 1', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catMonster').click();
          cy.getByTestId('Slide-catMonsterMountain').click();
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorMonsterbike1-${lang}-1440x890`
          );
        });
        it('should render eMotoCategory 1', () => {
          cy.viewport(1440, 890);
          cy.visit(`http://localhost:3000/${lang}/hangar`);
          fontShouldBeLoaded();
          cy.getByTestId('Slide-catEMoto').click();
          cy.getByTestId('Slide-catFactory').click();
          cy.getByTestId('CategorySelector').screenshot(); //Without this screenshot images are not fully loaded in comparesnapshot. It acts like a delay.
          cy.getByTestId('CategorySelector').compareSnapshot(
            `HangarCategorySelectorEMoto1-${lang}-1440x890`
          );
        });
      });
    });
  });
});
