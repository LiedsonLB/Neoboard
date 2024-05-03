/// <reference types="cypress" />

describe('Test login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Test input values', () => {
        const testEmail = 'Test@email.com'
        const testPassword = 'Test password'

        cy.get('.email')
        .type(testEmail)
        .should('have.value', testEmail)

        cy.get('.password')
        .type(testPassword)
        .should('have.value', testPassword)
    });
    
    it('Test show password', () => {
        cy.get("#see-password-login")
        .should('have.class', 'fa-solid fa-eye')

        cy.get("#see-password-login")
        .click()

        cy.get("#see-password-login")
        .should('not.have.class', 'fa-solid fa-eye')
        .and('have.class', 'fa-solid fa-eye-slash')
    })

    it('Test login empty field', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const mensage = "Atenção"

        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)

        cy.get('.login-btn')
        .click()

        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    it('Test login error', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const newPassword = 'errorpassword'
        const mensage = 'Erro'

        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)

        cy.get('.password')
        .type(newPassword)
        .should('have.value', newPassword)

        cy.get('.login-btn')
        .click()

        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    it('Test reset password modals is visible', ()=> {
        const title ='Redefinir Senha'

        cy.get('#link-resetPassword')
        .click()

        cy.contains('.modal-reset', title)
        .find('.reset-title')
        .should('be.visible')
    })

    
    it('Test reset password filling error', ()=> {
        const mensage = 'Erro'

        cy.get('#link-resetPassword')
        .click()

        cy.get('.input-reset-email')
        .should('not.have.value')

        cy.get('.send-reset')
        .click()

        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    
    it('Test reset password error', ()=> {
        const erroEmail = 'olaMundos123@gmail'
        const mensage = 'Erro'

        cy.get('#link-resetPassword')
        .click()

        cy.get('.input-reset-email')
        .type(erroEmail)
        .should('have.value', erroEmail)

        cy.get('.send-reset')
        .click()

        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    
    it('Test reset password successfully', ()=> {
        const newEmail = 'liedsonbarros123@gmail.com'
        const mensage = 'Redefinição Enviada'

        cy.get('#link-resetPassword')
        .click()

        cy.get('.input-reset-email').type(newEmail)
        .should('have.value', newEmail)
        
        cy.get('.send-reset')
        .click()

        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    
    it('Test buton cadaster page', () => {
        cy.get('#link-cadaster')
        .click()
    })
    it('Test successful login', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const newPassword = 'kleberson2014'

        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)

        cy.get('.password')
        .type(newPassword)
        .should('have.value', newPassword)

        cy.get('.login-btn').click()

        cy.wait(3000)
    })
})