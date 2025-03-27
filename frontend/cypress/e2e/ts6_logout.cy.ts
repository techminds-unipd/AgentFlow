describe("Logout TS6", () => {
    it("TS6 - L'utente autenticato può effettuare il logout", () => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.logout();
        cy.window().its("localStorage.user").should("be.undefined");
    });
});
