describe("Servizi TS22-TS24", () => {
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.visit("/services");
    });

    it("TS22 - L'utente autenticato può visualizzare quali servizi sono stati configurati", () => {
        cy.get("[data-cy='services-button-Gmail']").should("have.css", "color", "rgb(148, 148, 148)");
        cy.get("[data-cy='services-button-Calendar']").should("have.css", "color", "rgb(148, 148, 148)");
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.get("[data-cy='services-button-Gmail']").should("have.css", "color", "rgb(241, 102, 16)");
        cy.get("[data-cy='services-button-Calendar']").should("have.css", "color", "rgb(241, 102, 16)");
    });

    it("TS23 - L'utente autenticato, visualizzando i blocchi configurati, può visualizzare il nome di ogni blocco", () => {
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.get("[data-cy='services-button-Gmail']").should("contain", "Gmail");
        cy.get("[data-cy='services-button-Calendar']").should("contain", "Calendar");
        cy.get("[data-cy='services-button-Pastebin']").should("contain", "Pastebin");
    });

    it("TS24 - L'utente autenticato, visualizzando i blocchi configurati, può visualizzare un'opzione per ottenere informazioni sul servizio associato al blocco", () => {
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.get("[data-cy='services-button-Gmail-info']").should("be.visible");
        cy.get("[data-cy='services-button-Calendar-info']").should("be.visible");
        cy.get("[data-cy='services-button-Pastebin-info']").should("be.visible");
    });

});