describe("Login interno TS1-TS4", () => {
    it("TS1 - L’utente non autenticato può effettuare il login interno.", () => {
        cy.loginUI("test", "Test.1234");
        cy.window().its("localStorage.user").should("be.not.empty");
    });

    it("TS2 & TS3- L’utente non autenticato può inserire il proprio username per effettuare il login interno.", () => {
        cy.visit("/signin");
        cy.get("[data-cy='signin-username-input']").should("be.visible");
        cy.get("[data-cy='signin-password-input']").should("be.visible");
    });

    it("TS3 - L’utente non autenticato può inserire la password per effettuare il login interno.", () => {
        cy.visit("/signin");
        cy.get("[data-cy='signin-password-input']").should("be.visible");
    });

    it("TS4 - Verificare che l’utente non autenticato riceva un messaggio di errore in caso abbia inserito credenziali errate per il login interno.", () => {
        cy.visit("/signin");
        cy.get("[data-cy='signin-error-alert']").should("not.exist");
        cy.loginUI("Nobody", "Magic");
        cy.get("[data-cy='signin-error-alert']").should("be.visible").contains("wrong username or password");
    });
});
