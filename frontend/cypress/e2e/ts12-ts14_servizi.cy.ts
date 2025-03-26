describe("Servizi TS12-TS14", () => {
    it("TS12 - L'utente autenticato può associare un account Google da utilizzare per i servizi", () => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.visit("/services");
        cy.get("[data-cy='services-google-button']").click();
    });
});
