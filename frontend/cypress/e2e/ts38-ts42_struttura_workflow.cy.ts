import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../../src/services/dto/WorkflowDTO";
describe("Operazioni blocchi workflow TS32-TS37", () => {
    const workflow = new WorkflowDTO("test", [new NodeDTO(0, { x: -200, y: 1 }, new NodeDataDTO("Gmail")), new NodeDTO(1, { x: 200, y: 1 }, new NodeDataDTO("GCalendar"))], [new EdgeDTO("automate", 0, 1)]);
    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI(workflow);
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
    });

    it("TS38-TS39-TS41 - L'utente autenticato può visualizzare la struttura del workflow", () => {
        cy.get("[data-cy='workflow-canvas']").should("be.visible");
        cy.get("[data-cy='canvas-node-0']").should("be.visible");
        cy.get("[data-cy='canvas-node-1']").should("be.visible");
        cy.get("[data-cy='source-target-node-0-1']").should("be.visible");
        cy.get("[data-cy='edge-0-1']").should("exist");
    })

    it("TS40 - L'utente autenticato può visualizzare il nome del servizio di ogni blocco presente nel workflow", () => {       
        cy.get("[data-cy='canvas-node-0']").should("contain", "Gmail");
        cy.get("[data-cy='canvas-node-1']").should("contain", "GCalendar");
    });

    it("TS42 -  L’utente autenticato può visualizzare la descrizione di ogni arco presente nel workflow", () => {
        cy.get("[data-cy='source-target-node-0-1']").should("contain", "automate");
    });
    
});