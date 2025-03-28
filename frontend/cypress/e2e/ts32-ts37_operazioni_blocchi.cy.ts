require('@4tw/cypress-drag-drop')
describe("Operazioni blocchi workflow TS32-TS37", () => {

    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.deleteAllWorkflowAPI();
        cy.createWorkflowAPI("test");
        cy.loginByGoogleApi();
        cy.visit("/workflow/test");
    });

    it("TS26 - L'utente autenticato può aggiungere un blocco in un workflow", () => {
        
        cy.get('[data-cy=Pastebin-draggable]')
            .trigger('mousedown')
            .trigger('mousemove', {pageX: 300, pageY: 100})
            .trigger('mouseup')

        // cy.get("[data-cy='button-Gmail']").drag("[data-cy='workflow-canvas']", {
        //     source: { x: 100, y: 100 },
        //     target: { x: 100, y: 100 },
        //     force: true,
        // });
        // cy.get("[data-cy='Pastebin-draggable']").drag("[data-cy='workflow-canvas']", {
        //     target: { x: 200, y: 200 },
        //     force: true,
        // });

        // cy.get('[data-cy=button-Gmail]').trigger("mousemove")
        // .trigger("mousedown", { which: 1 })
        // .trigger("mousemove", {
        //     clientX: 300,
        //     clientY: 30,
        //     screenX: 300,
        //     screenY: 30,
        //     pageX: 800,
        //     pageY: 130,
        // })
        // .trigger("mouseup", { force: true });

    });

    

});