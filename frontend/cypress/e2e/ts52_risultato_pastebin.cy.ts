import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../../src/services/dto/WorkflowDTO";
describe("Risultato Pastebin TS52", () => {
    const workflow = new WorkflowDTO("test", [new NodeDTO(0, { x: -200, y: 1 }, new NodeDataDTO("Gmail")), new NodeDTO(1, { x: 200, y: 1 }, new NodeDataDTO("Pastebin"))], [new EdgeDTO("Get the last email from Tullio Vardanega and write the email body", 0, 1)]);
    
    it("TS52 -  L’utente autenticato può visualizzare, all’interno del risultato del workflow, i link delle risorse generate", () => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI(workflow);
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
        cy.wait(500);
        cy.get("[data-cy=execute-button]").click()
        cy.wait(10000);
        cy.get("[data-cy=execute-result-dialog]").should("be.visible");
        cy.get("[data-cy=execute-result-dialog-content]").contains("AI:");
        cy.get("[data-cy=execute-result-dialog-content]").contains("https://pastebin.com");
    })
});
