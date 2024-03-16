describe('Blog app', () => {

  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })
})