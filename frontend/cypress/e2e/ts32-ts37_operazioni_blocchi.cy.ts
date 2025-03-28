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

    it("TS32-TS33 - L'utente autenticato può aggiungere un blocco in un workflow, trascinandolo nell'area drag and drop", () => {
        const dataTransfer = new DataTransfer();

        cy.get('[data-cy=Pastebin-draggable]')
            .trigger('dragstart', { dataTransfer })
            .wait(200);

        cy.get('[data-cy=workflow-canvas]')
            .trigger('dragover', { dataTransfer })
            .wait(200)
            .trigger('drop', { dataTransfer })
            .wait(500);

        cy.get('[data-cy=Pastebin-draggable]')
            .trigger('dragend');

        //id del prossimo nodo aggiunto è 2
        cy.get("[data-cy='canvas-node-2']").should("exist");
    });

    it("TS34 - L'utente autenticato può eliminare un blocco in un workflow.", () => {
        cy.get("[data-cy='delete-button-node-1']").click();
        cy.get("[data-cy='canvas-node-1']").should("not.exist");       
    });

    it("TS35 - L'utente autenticato può collegare due blocchi in un workflow." , () => {
        cy.get("[data-cy='delete-source-target-node-0-1']").click();
        cy.get("[data-cy='source-target-node-0-1']").should("not.exist");
        cy.get("[data-cy='source-button-node-0']").click();
        cy.get("[data-cy='target-button-node-1']").click();
        cy.get("[data-cy='source-target-node-0-1']").should("exist");
    });

    it("TS36 - L'utente autenticato può scollegare due blocchi in un workflow." , () => {
        cy.get("[data-cy='delete-source-target-node-0-1']").click();
        cy.get("[data-cy='source-target-node-0-1']").should("not.exist");
    });

    it("TS37 - L'utente autenticato può inserire una descrizione dell'automazione in linguaggio naturale tra due blocchi collegati.", () => {
        for(let i = 0; i < 15; i++)
            cy.get("[data-cy='source-target-node-0-1']").type("{backspace}");
        cy.get("[data-cy='source-target-node-0-1']").type("Test descrizione");
        cy.get("[data-cy='source-target-node-0-1']").should("have.value", "Test descrizione");
    });

});