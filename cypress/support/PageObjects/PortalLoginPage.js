class PortalLoginPage {
    constructor() {
        this.login_url = Cypress.env("login_url");
        this.login_credentials = Cypress.env("login_credentials");
        this.login_credentials_pairs = Object.keys(this.login_credentials);
        this.login_credentials_length = this.login_credentials_pairs.length;
    }

    clearInputFields() {
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').clear();
    }

    inputBothLoginCredentials(name, password) {
        cy.get(':nth-child(1) > .form-control').type(name);
        cy.get(':nth-child(2) > .form-control').type(password);
    }

    getErrorMessageBox() {
        return cy.get('.has-error > .help-block');
    }

    getLoginFormNameField() {
        return cy.get(':nth-child(1) > .form-control');
    }

    getLoginFormPasswordField() {
        return cy.get(':nth-child(2) > .form-control');
    }

    clickLoginButton() {
        return cy.get('.btn').click();
    }

}

export default PortalLoginPage