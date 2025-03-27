describe("Visualizzazione, creazione, eliminazione workflow TS15-TS21", () => {
    
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
    });

    it("TS15 - L'utente visualizza la lista dei workflow creati", () => {
        cy.createWorkflowAPI("Pluto").then(() => {
            cy.createWorkflowAPI("Pippo");
        }).then(() => {
            cy.visit("/dashboard");
            cy.get("[data-cy=workflow-Pluto]").should("be.visible");
            cy.get("[data-cy=workflow-Pippo]").should("be.visible");
        });
    });

    it("TS16 - L'utente autenticato, visualizzando la lista dei workflow, può visualizzare il nome di ciascun workflow sotto forma di link.", () => {
        cy.createWorkflowAPI("Pluto").then(() => {
            cy.visit("/dashboard");
            cy.get("[data-cy=workflow-Pluto]").should("be.visible");
            cy.get("[data-cy=workflow-Pluto]").should("have.attr", "href", "#");
        });
    });

    it("TS17 - L'utente autenticato, visualizzando la lista dei workflow, può visualizzare per ogni workflow nella lista un'opzione per eliminarlo.", () => {
        cy.createWorkflowAPI("Pippo").then(() => {;
            cy.visit("/dashboard");
            cy.get("[data-cy=workflow-Pippo-delete]").should("be.visible")
        });
    });

    it("TS18 - L'utente autenticato può creare un nuovo workflow.", () => {
        cy.visit("/dashboard");
        cy.createWorkflowUI("Pluto").then(() => {;
            cy.get("[data-cy=workflow-Pluto]").should("be.visible");
        });
    });

    it("TS19 - L'utente autenticato può inserire il nome del workflow che sta creando.", () => {
        cy.visit("/dashboard");
        cy.get("[data-cy=workflow-name-input]").should("be.visible");
    });

    it("TS20 - L'utente autenticato visualizza un avviso che indica la non univocità del nome del workflow inserito durante la sua creazione.", () => {
        cy.createWorkflowAPI("Pluto").then(() => {
            cy.visit("/dashboard");
            cy.createWorkflowUI("Pluto");
            cy.get("[data-cy=add-workflow-snackbar-message]").should("contain", "Something went wrong.");
        });
    });

    it("TS21 - L'utente autenticato visualizza un avviso che indica la non validità del nome del workflow inserito durante la sua creazione.", () => {
        cy.visit("/dashboard");
        cy.get("[data-cy='add-workflow-button']").click();
        cy.get("[data-cy=add-workflow-snackbar-message]").should("contain", "Please enter a valid workflow name.");
    });

});
