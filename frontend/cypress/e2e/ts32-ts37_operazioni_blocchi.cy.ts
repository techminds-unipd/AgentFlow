require('@4tw/cypress-drag-drop')
describe("Operazioni blocchi workflow TS32-TS37", () => {

    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.saveWorkflowAPI("test");
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
    });

    it("TS32 - L'utente autenticato può aggiungere un blocco in un workflow", () => {
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

    it("TS33 - L'utente autenticato, per poter aggiungere un blocco in un workflow, lo deve trascinare nell'area drag and drop", () => {
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
        cy.wait(500);
        cy.get("[data-cy='source-button-node-0']").click();
        cy.wait(500);
        cy.get("[data-cy='target-button-node-1']").click();
        cy.wait(500);
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