Cypress.on('uncaught:exception', (err: Error, runnable) => {
    // retornar false para evitar que o Cypress falhe quando ocorrerem erros não capturados
    return false;
  });
  