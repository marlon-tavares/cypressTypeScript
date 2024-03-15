import { loginPwa, loginAdmin } from 'cypress/support/login';

describe('Teste de login', () => {
  it('deve fazer login no PWA com sucesso', () => {
    loginPwa();
    cy.visit(Cypress.env('URL_PWA'));
  });


  it('deve fazer login no Admin com sucesso', () => {
    loginAdmin();
  });

});