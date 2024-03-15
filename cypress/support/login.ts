import 'cypress-plugin-api';
 function loginPwa(): void {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1280, 900);
  
    const username = Cypress.env('USERNAME_PWA');
    const password = Cypress.env('PASSWORD_PWA');
    const variables = {
      username: `${username}`,
      password: `${password}`,
    };
  
    const query = `mutation Login(
      $username: Username!,
      $password: String!,
    ) {
      login(
        username: $username,
        password: $password,
      ) {
        ... on Session {
          token,
        }
      }
    }`;
  
    cy.api({
      method: 'POST',
      url: Cypress.env('API_PWA'),
      body: {
        query,
        variables,
      },
    }).then((response) => {
      if (response.body.errors) {
        throw response.body.errors[0].message;
      } else {
        const token = response.body.data.login.token;
        cy.setCookie('token', token);   
        window.localStorage.setItem('token', token);
        window.localStorage.setItem(
          'notification-permission-last-check',
          String(new Date().getTime()),
        );
      }
      expect(response.status).to.equal(200);
    });
  }

 function loginAdmin() {
    cy.clearCookies();
    cy.clearLocalStorage();
    var url = Cypress.env('URL_ADMIN');
    cy.visit(url);
    cy.viewport(1280, 900);
    cy.get('#admin_user_username').clear().type(Cypress.env('USERNAME_ADMIN'));
    cy.get('#admin_user_password').clear().type(Cypress.env('PASSWORD_ADMIN'), { log: false });
    cy.get('input[type="submit"]').click();
  }

  export { loginPwa, loginAdmin };