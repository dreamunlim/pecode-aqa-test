import PortalLoginPage from "../../support/PageObjects/PortalLoginPage";

const portalLoginPage = new PortalLoginPage();


describe("PDF cases 1 - 6", () => {

    it("1. Visit URL", () => {
        cy.visit(portalLoginPage.login_url);
    })

    // Implicit assertion of input fields
    it("4. Verify that all the input elements are present" , () => {

        cy.get("form").within(() => {
            cy.get("input[type=text]").should("have.attr", "placeholder", "Username");
            cy.get("input[type=password]").should("have.attr", "placeholder", "Password");
            cy.get("input[type=submit]").should("have.attr", "value", "Login");
        });

    })

    it("5. Verify that all the error messages appear", () => {
        // retrieve the first login pair
        var current_user = portalLoginPage.login_credentials_pairs[0];
        
        var name = portalLoginPage.login_credentials[current_user].name;
        var password = portalLoginPage.login_credentials[current_user].password;

        // fill username only to get Password error message
        portalLoginPage.clearInputFields();
        portalLoginPage.getLoginFormNameField().type(name);
        portalLoginPage.clickLoginButton();
        portalLoginPage.getErrorMessageBox().should('have.text', "Please enter your password.");
        
        // fill password only to get Username error message
        portalLoginPage.clearInputFields();
        portalLoginPage.getLoginFormPasswordField().type(password);
        portalLoginPage.clickLoginButton();
        portalLoginPage.getErrorMessageBox().should('have.text', "Please enter username.");
        
        // fill both username and password to get incorrect account error message
        portalLoginPage.clearInputFields();
        portalLoginPage.inputBothLoginCredentials(name, password);
        portalLoginPage.clickLoginButton();
        portalLoginPage.getErrorMessageBox().should('have.text', "No account found with that username.");
    })

    it("2-3, 6. Fill in the “Username” and “Password” from an environment file/ Fail login", () => {
        // login with all available crendentials
        for (var i = 0; i < portalLoginPage.login_credentials_length; ++i) {
            var current_user = portalLoginPage.login_credentials_pairs[i];
            
            cy.log("LOGIN PAIR: ", portalLoginPage.login_credentials[current_user]);

            var name = portalLoginPage.login_credentials[current_user].name;
            var password = portalLoginPage.login_credentials[current_user].password;

            // 6. Create a test-case that will fail because of unsuccessful login
            portalLoginPage.clearInputFields();
            portalLoginPage.inputBothLoginCredentials(name, password);
            portalLoginPage.clickLoginButton();

            // assume error message box to be empty on successful login, otherwise fail test
            portalLoginPage.getErrorMessageBox().should("be.empty");
        }
    })
    
})