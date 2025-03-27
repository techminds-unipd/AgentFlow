describe("Servizi TS12-TS14", () => {
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.visit("/services");
    });

    it("TS12 - L'utente autenticato può associare un account Google da utilizzare per i servizi", () => {
        cy.window().its("localStorage.GoogleAccountToken").should("be.undefined");
        cy.get("[data-cy='services-google-button']").should("contain", "Link your Google account");
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.window().its("localStorage.GoogleAccountToken").should("be.not.undefined");
        cy.get("[data-cy='services-google-button']").should("contain", "Unlink your Google account");
    });

    it("TS14 - L'utente autenticato può disassociare un account Google precedentemente associato", () => {
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.get("[data-cy='services-google-button']").should("contain", "Unlink your Google account");
        cy.get("[data-cy='services-google-button']").click();
        cy.window().its("localStorage.GoogleAccountToken").should("be.undefined");
    });
})