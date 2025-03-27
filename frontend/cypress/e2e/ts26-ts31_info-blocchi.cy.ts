describe("Visualizzazione informazioni blocchi TS26-TS31", () => {

    beforeEach(() => {
        cy.registerIfNotExistsAPI(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
        cy.loginUISession(Cypress.env("loginUsername"), Cypress.env("loginPassword"));
    });

    it("TS26 - L'utente autenticato può visualizzare una breve descrizione relativa al blocco Gmail.", () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Gmail']").click().then(() => {;
            cy.get("[data-cy='Gmail-info']").should("be.visible");
        });
    });

    it("TS27 - L'utente autenticato possa visualizzare le funzioni offerte dal blocco Gmail." , () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Gmail']").click().then(() => {;
            cy.get("[data-cy='Gmail-node-features']").should("be.visible");
        });
    });

    it("TS28 - L'utente autenticato può visualizzare una breve descrizione relativa al blocco Pastebin.", () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Pastebin']").click().then(() => {;
            cy.get("[data-cy='Pastebin-info']").should("be.visible");
        });
    });

    it("TS29 - L'utente autenticato possa visualizzare le funzioni offerte dal blocco Pastebin." , () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Pastebin']").click().then(() => {;
            cy.get("[data-cy='Pastebin-node-features']").should("be.visible");
        });
    });

    it("TS30 - L'utente autenticato può visualizzare una breve descrizione relativa al blocco Calendar.", () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Calendar']").click().then(() => {;
            cy.get("[data-cy='Calendar-info']").should("be.visible");
        });
    });

    it("TS31 - L'utente autenticato possa visualizzare le funzioni offerte dal blocco Calendar." , () => {
        cy.visit("/services");
        cy.get("[data-cy='button-Calendar']").click().then(() => {;
            cy.get("[data-cy='Calendar-node-features']").should("be.visible");
        });
    });



});
