import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../../src/services/dto/WorkflowDTO";
describe("Esecuzione workflow TS47-TS51 e TS53-TS58", () => {
    const workflow = new WorkflowDTO(
        "test",
        [
            new NodeDTO(0, { x: -200, y: 1 }, new NodeDataDTO("Gmail")),
            new NodeDTO(1, { x: 200, y: 1 }, new NodeDataDTO("GCalendar"))
        ],
        [new EdgeDTO("Get the last email from Tullio Vardanega and create an event", 0, 1)]
    );
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI(workflow);
        cy.loginByGoogleApi();
    });

    it("TS47 - L’utente autenticato può mandare in esecuzione un workflow", () => {
        cy.visit("/workflow/test").then(() => {
            cy.get("[data-cy=execute-button]").should("be.visible");
        });
    });

    it("TS48 - L’utente autenticato, dopo aver mandato in esecuzione un workflow con una struttura non valida, visualizza un messaggio d’errore", () => {
        cy.visit("/workflow/test").then(() => {
            cy.wait(1000);
            cy.get("[data-cy='delete-source-target-node-0-1']").click();
            cy.get("[data-cy=execute-button]")
                .click()
                .then(() => {
                    cy.get("[data-cy='snackbar-workflow'").should("contain", "Cannot execute the workflow");
                });
        });
    });

    it("TS49 - L’utente autenticato visualizza un messaggio che lo informa di un errore runtime nell’esecuzione del workflow", () => {
        cy.visit("/workflow/test").then(() => {
            cy.intercept("POST", "http://localhost:3000/workflow/execute", { statusCode: 500 }).as("getServerFailure");
            cy.get("[data-cy=execute-button]")
                .click()
                .then(() => {
                    cy.get("[data-cy='snackbar-workflow'").should("contain", "Cannot execute the workflow");
                });
        });
    });

    it("TS50-TS51-TS53-TS54-TS55-TS56-TS57-TS58 - L’utente autenticato può visualizzare il risultato dell’esecuzione del workflow", () => {
        cy.visit("/workflow/test").then(() => {
            cy.wait(500);
            cy.get("[data-cy=execute-button]").click();
            cy.wait(10000);
            cy.get("[data-cy=execute-result-dialog]").should("be.visible");
            cy.get("[data-cy=execute-result-dialog-content]").should("be.visible");
            // TS51
            cy.get("[data-cy=execute-result-dialog-content]").contains("ACTION:");
            cy.get("[data-cy=execute-result-dialog-content]").contains("AI:");
        });
    });
});
