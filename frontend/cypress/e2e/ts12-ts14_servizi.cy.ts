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

    it("TS13 - L'utente autenticato riceve un messaggio in caso di errore nell'associazione dell'account Google per i servizi offerti dai blocchi del workflow", () => {
        cy.window().its("localStorage.GoogleAccountToken").should("be.undefined");
        cy.intercept('GET', 'http://localhost:3000/google/auth', {
            statusCode: 302,
            body: { url: "http://localhost:5173/services/addAccount" },
            headers: {
                'Location': 'http://localhost:5173/services/addAccount'
            }
        }).as('googleAuthRequest');
        cy.get("[data-cy='services-google-button']").click();
        cy.get("[data-cy='error-google-button']").should("be.visible");
    });

    it("TS14 - L'utente autenticato può disassociare un account Google precedentemente associato", () => {
        cy.loginByGoogleApi();
        cy.visit("/services");
        cy.get("[data-cy='services-google-button']").should("contain", "Unlink your Google account");
        cy.get("[data-cy='services-google-button']").click();
        cy.window().its("localStorage.GoogleAccountToken").should("be.undefined");
    });
})