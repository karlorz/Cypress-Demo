// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  // Caching session when logging in via page visit
  cy.session(name, () => {
    cy.visit("/login");
    cy.get("[data-test=name]").type(name);
    cy.get("[data-test=password]").type("s3cr3t");
    cy.get("form").contains("Log In").click();
    cy.url().should("contain", "/login-successful");
  });

  // Caching session when logging in via API
  cy.session(username, () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: { username, password },
    }).then(({ body }) => {
      window.localStorage.setItem("authToken", body.token);
    });
  });
});
