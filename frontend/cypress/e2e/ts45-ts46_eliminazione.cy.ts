describe("Eliminazione workflow TS45-TS46", () => {
    
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("prova");
    });

    it("TS45 - L'utente autenticato possa cancellare un workflow.", () => {
        cy.deleteWorkflowUI("prova");
        cy.get("[data-cy='workflow-prova']").should("not.exist");
        cy.get("[data-cy='delete-workflow-snackbar-message']").should("have.css", "background-color", "rgb(46, 125, 50)");
    });

    it("TS46 - L'utente autenticato visualizzi un messaggio di avviso che informa del fallimento nell'eliminazione del workflow.", () => {
        cy.visit("/dashboard");
        cy.intercept(
            'DELETE',
            'http://localhost:3000/workflow/delete/prova',
            { statusCode: 500 }
          ).as('getServerFailure')
        cy.deleteWorkflowUI("prova");
        cy.get("[data-cy='delete-workflow-snackbar-message']").should("contain", "Failed to delete workflow.");

        cy.deleteWorkflowAPI("prova");
    });

});
