/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login')
    })
  
    it('create message', () => {
      // https://on.cypress.io/type
      cy.get('.auth__form-container_fields-content_input_signin > input').eq(0)
      .type('username')
      cy.get('.auth__form-container_fields-content_input_signin > input').eq(1)
      .type('password')
      cy.get('form').submit()
      cy.get('.team-channel-list__header > svg').eq(0).click()
      cy.get('.channel-name-input__wrapper > input')
      .type('Test_Channel')
      cy.get('.user-item__name-wrapper').eq(4).click()
      cy.get('.user-item__name-wrapper').eq(6).click()
      cy.get('.create-channel__button-wrapper > p').click()
      cy.get('.str-chat__textarea > textarea')
      .type('Test complete{enter}')
    })
  
})