/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            loginUI(username: string, password: string): Chainable<void>;
            loginUISession(username: string, password: string): Chainable<void>;
            logout(): Chainable<void>;
            registerIfNotExistsAPI(username: string, password: string): Chainable<void>;
            registerUI(username: string, password: string): Chainable<void>;
            createWorkflowAPI(name: string): Chainable<void>;
            deleteWorkflowAPI(name: string): Chainable<void>;
            deleteAllWorkflowAPI(): Chainable<void>;
        }
    }
}

Cypress.Commands.add("loginUI", (username: string, password: string) => {
    cy.visit("/signin");
    cy.get("[data-cy='signin-username-input']").type(username);
    cy.get("[data-cy='signin-password-input']").type(password);
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add("loginUISession", (username: string, password: string) => {
    cy.session(
        [username, password],
        () => {
            cy.loginUI(username, password);
        },
        {
            validate: () => {
                cy.window().its("localStorage.user").should("be.not.empty");
            }
        }
    );
});

Cypress.Commands.add("registerIfNotExistsAPI", (username: string, password: string) => {
    cy.request({
        url: "http://localhost:3000/user/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        failOnStatusCode: false
    }).then((response) => {
        if (response.status !== 201 && response.body.message !== "Username already exists")
            throw new Error(response.body.message);
    });
});

Cypress.Commands.add("registerUI", (username: string, password: string) => {
    cy.visit("/signup");
    cy.get("[data-cy='signup-username-input']").type(username);
    cy.get("[data-cy='signup-password-input']").type(password);
    cy.get("[data-cy='signup-passwordConfirm-input']").type(password);
    cy.get("[data-cy='signup-submit']").click();
});

Cypress.Commands.add("logout", () => {
    cy.get("[data-cy='user-navicon']").click();
    cy.get("[data-cy='logout-navitem']").click();
    cy.get("[data-cy='logout-confirm-button']").click();
});

Cypress.Commands.add("createWorkflowAPI", (name) => {
    cy.window()
        .its("localStorage.user")
        .then((result) => {
            let user = JSON.parse(result);
            cy.request({
                url: `http://localhost:3000/workflow/create/${name}`,
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` }
            });
        });
});

Cypress.Commands.add("deleteWorkflowAPI", (name) => {
    cy.window()
        .its("localStorage.user")
        .then((result) => {
            let user = JSON.parse(result);
            cy.request({
                url: `http://localhost:3000/workflow/delete/${name}`,
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` }
            });
        });
});

Cypress.Commands.add("deleteAllWorkflowAPI", () => {
    cy.window()
        .its("localStorage.user")
        .then((result) => {
            let user = JSON.parse(result);
            cy.request({
                url: "http://localhost:3000/workflow/all",
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` }
            });
        })
        .then((response) => {
            let workflows = response.body as Array<string>;
            workflows.forEach((element) => {
                cy.deleteWorkflowAPI(element);
            });
        });
});
