describe("Avviso servizi non collegati TS25", () => {
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("TestWorkflow");
    });

    it("TS25 - L'utente autenticato riceve un avviso in caso non abbia collegato i servizi Google.", () => {
        cy.visit("/workflow/TestWorkflow").then(() => {
            cy.get("[data-cy='button-Gmail']").should("have.css", "color", "rgb(148, 148, 148)");
            cy.get("[data-cy='button-GCalendar']").should("have.css", "color", "rgb(148, 148, 148)");
            cy.get("[data-cy='typo-unavailable-services-workflow']").should("be.visible");
        });
    });
});
