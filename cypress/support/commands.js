Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Polhmann')
    cy.get('#email').type('lari@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
