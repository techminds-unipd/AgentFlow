describe("Registrazione TS7-TS11", () => {
    it("TS7 - L'utente non autenticato può registrarsi", () => {
        const username = new Date().toISOString().replace(/[-:.]/g, "");
        cy.registerUI(username, "Test.1234");
        cy.loginUI(username, "Test.1234");
    });

    it("TS8 - L'utente non autenticato può inserire lo username per la registrazione", () => {
        cy.visit("/signup");
        cy.get("[data-cy='signup-username-input']").should("be.visible");
    });

    it("TS9 - L'utente non autenticato può inserire la password per la registrazione", () => {
        cy.visit("/signup");
        cy.get("[data-cy='signup-password-input']").should("be.visible");
    });

    it("TS10 - L'utente non autenticato può confermare la password per la registrazione", () => {
        cy.visit("/signup");
        cy.get("[data-cy='signup-passwordConfirm-input']").should("be.visible");
    });

    it("TS11 - L'utente non autenticato riceve un messaggio di errore in caso abbia inserito credenziali non valide per la registrazione", () => {
        cy.visit("/signup");
        cy.get("[data-cy='signup-submit']").click();
        cy.get("#username-helper-text").should("be.visible");
        cy.get("#password-helper-text").should("be.visible");
        cy.get("#confirmPassword-helper-text").should("be.visible");
    });
});
