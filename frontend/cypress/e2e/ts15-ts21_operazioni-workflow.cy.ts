describe("Visualizzazione, creazione, eliminazione workflow TS15-TS21", () => {
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
    });
    it("TS15 - L'utente visualizza la lista dei workflow creati", () => {
        cy.visit("/dashboard");
        cy.createWorkflowAPI("Pluto");
        cy.createWorkflowAPI("Pippo");
        cy.createWorkflowAPI("Esempio");
    });
});
