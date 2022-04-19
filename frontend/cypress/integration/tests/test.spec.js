/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('.type() - type into a DOM element', () => {
      // https://on.cypress.io/type
      cy.get('.name-contact > input').eq(0)
        .type('Name')
      cy.get('.name-contact > input').eq(1)
        .type(' checking')
      cy.get('.name-contact > textarea')
        .type('Hello World')
      cy.get('.form-contact').submit()
    })

    it('submit login', () => {
      cy.get()
    })
})