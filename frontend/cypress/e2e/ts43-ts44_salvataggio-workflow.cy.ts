import { WorkflowDTO, NodeDTO, NodeDataDTO, EdgeDTO } from "../../src/services/dto/WorkflowDTO";

describe("Salvataggio workflow TS43-TS44", () => {
    beforeEach(() => {
        const workflow = new WorkflowDTO(
            "test",
            [
                new NodeDTO(0, { x: -200, y: 1 }, new NodeDataDTO("Gmail")),
                new NodeDTO(1, { x: 200, y: 1 }, new NodeDataDTO("GCalendar")),
                new NodeDTO(2, { x: 800, y: 1 }, new NodeDataDTO("Gmail"))
            ],
            [new EdgeDTO("automate", 0, 1), new EdgeDTO("automate again", 1, 2)]
        );
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI(workflow);
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
    });

    it("TS43 - L'utente può salvare un workflow", () => {
        cy.visit("/workflow/test").then(() => {
            cy.get("[data-cy='delete-button-node-2']")
                .click()
                .then(() => {
                    cy.get("[data-cy='button-save-workflow']")
                        .click()
                        .then(() => {
                            cy.visit("/workflow/test");
                            cy.get("[data-cy='canvas-node-0']").should("exist");
                            cy.get("[data-cy='canvas-node-1']").should("exist");
                            cy.get("[data-cy='canvas-node-2']").should("not.exist");
                        });
                });
        });
    });

    it("TS44 - L'utente può visualizzare un messaggio di avviso che informa del fallimento nel salvataggio del workflow", () => {
        //Genera un workflow con un nodo e quindi non valido
        cy.get("[data-cy='delete-button-node-2']").click();
        cy.get("[data-cy='delete-button-node-1']").click();
        cy.get("[data-cy='canvas-node-1']").should("not.exist");
        cy.get("[data-cy='canvas-node-2']").should("not.exist");
        cy.get("[data-cy='button-save-workflow']")
            .click()
            .then(() => {
                cy.get("[data-cy='snackbar-workflow'").should("contain", "Cannot save the workflow");
            });
    });
});
