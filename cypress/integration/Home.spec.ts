/// <reference types="cypress" />
import { viewports, languages } from '../support/constants';

describe('Home Page', () => {
  languages.forEach((lang) => {
    context(`in ${lang} language`, () => {
      viewports.forEach(({ width, height }) => {
        context(`on ${width}x${height} size`, () => {
          it('should render intro section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('IntroSection').should('be.visible');
            cy.getByTestId('IntroLogo').should('be.visible');
            cy.getByTestId('IntroText').should('be.visible');
            cy.getByTestId('IntroSection').compareSnapshot(
              `IntroSection-${lang}-${width}x${height}`
            );
          });

          it('should render hangar section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('HangarSection').should('be.visible');
            cy.getByTestId('BtnLinkHangar').click();
            cy.url().should('eq', `http://localhost:3000/${lang}/hangar`);
            cy.go('back');
            cy.url().should('eq', `http://localhost:3000/${lang}`);
            cy.getByTestId('InfoBoxHangar').should('be.visible');
            cy.getByTestId('HangarSection').compareSnapshot(
              `HangarSection-${lang}-${width}x${height}`
            );
          });

          it('should render RECENTLY ADDED VEHICLES section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('RecentBox').should('be.visible');
            cy.contains('TEST PROJECT 1', { matchCase: false }).should('be.visible');
            cy.getByTestId('Recent_627fc2dc9e3d40a69cbc1104').click();
            cy.url().should('eq', `http://localhost:3000/${lang}/hangar/627fc2dc9e3d40a69cbc1104`);
            cy.go('back');
            cy.url().should('eq', `http://localhost:3000/${lang}`);
            cy.getByTestId('RecentBox').compareSnapshot(`RecentBox-${lang}-${width}x${height}`);
          });

          it('should render knowledge base section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('KnowledgeBaseSection').should('be.visible');
            cy.getByTestId('BtnLinkKnowledgeBase').click();
            cy.url().should('eq', `http://localhost:3000/${lang}/knowledge`);
            cy.go('back');
            cy.url().should('eq', `http://localhost:3000/${lang}`);
            cy.getByTestId('InfoBoxKnowledgeBase').should('be.visible');
            cy.getByTestId('KnowledgeBaseSection').compareSnapshot(
              `KnowledgeBaseSection-${lang}-${width}x${height}`
            );
          });

          it('should render announcement section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('AnnouncementSection').should('be.visible');
            cy.getByTestId('AnnouncementSection').compareSnapshot(
              `AnnouncementSection-${lang}-${width}x${height}`
            );
          });

          it('should render register section', () => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000/${lang}`);
            cy.getByTestId('RegisterSection').should('be.visible');
            cy.getByTestId('BtnLinkRegister').click();
            cy.url().should('eq', `http://localhost:3000/${lang}/users/add`);
            cy.go('back');
            cy.url().should('eq', `http://localhost:3000/${lang}`);
            cy.getByTestId('InfoBoxRegister').should('be.visible');
            cy.getByTestId('RegisterSection').compareSnapshot(
              `RegisterSection-${lang}-${width}x${height}`
            );
          });
        });
      });
    });
  });
});
