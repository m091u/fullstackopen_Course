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
    cy.contains("Login");
  });

  it("login form can be opened", function () {
    cy.contains("Login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username").type("mira");
      cy.get("#password").type("parola");
      cy.get("#login-button").click();

      cy.contains("Mira is logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username").type("john");
      cy.get("#password").type("parola");
      cy.get("#login-button").click();
    });
  });
});
