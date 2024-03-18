describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Mira",
      username: "mira",
      password: "parola",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username").type("mira");
      cy.get("#password").type("parola");
      cy.get("#login-button").click();

      cy.contains("Mira is logged-in");
      cy.contains('Logout')
    });

    it("fails with wrong credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username").type("john");
      cy.get("#password").type("wrongpass");
      cy.get("#login-button").click();

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains("Log in to application");
      cy.get("#username").type("mira");
      cy.get("#password").type("parola");
      cy.get("#login-button").click();
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.testcypress.com')
      cy.get("#submit-button").click();
      cy.contains('a blog created by cypress')
    })
  })
});
