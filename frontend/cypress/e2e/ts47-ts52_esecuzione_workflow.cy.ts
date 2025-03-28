import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../../src/services/dto/WorkflowDTO";
describe("Operazioni blocchi workflow TS32-TS37", () => {
    const workflow = new WorkflowDTO("test", [new NodeDTO(0, { x: -200, y: 1 }, new NodeDataDTO("Gmail")), new NodeDTO(1, { x: 200, y: 1 }, new NodeDataDTO("GCalendar"))], [new EdgeDTO("Get the last email from Tullio Vardanega and create an event", 0, 1)]);
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI(workflow);
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
    });

    // it("TS47 - L’utente autenticato può mandare in esecuzione un workflow", () => {
    //     cy.wait(500);
    //     cy.get("[data-cy=execute-button]").click()
    //     .then(() => {
    //         cy.get("[data-cy=execute-result-dialog]").should("be.visible");
    //     });
    // })

    it("TS48 - L’utente autenticato , dopo aver mandato in esecuzione un workflow con una struttura non valida, visualizzi un messaggio d’errore", () => {
        cy.get("[data-cy='delete-source-target-node-0-1']").click();
        cy.get("[data-cy=execute-button]").click()
    });


});