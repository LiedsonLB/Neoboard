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

        cy.wait(1000);
    });

    it('Test show password', () => {
        cy.get("#see-password-login")
            .should('have.class', 'fa-solid fa-eye')

        cy.get("#see-password-login")
            .click()

        cy.get("#see-password-login")
            .should('not.have.class', 'fa-solid fa-eye')
            .and('have.class', 'fa-solid fa-eye-slash')

        cy.wait(1000);
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

        cy.wait(1000);
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

        cy.wait(1000);
    })

    it('Test reset password modals is visible', () => {
        cy.get('#link-resetPassword')
            .click();

        cy.get('.modal-reset')
            .should('be.visible');

        cy.wait(1000);
    });
    it('Test reset password filling error', () => {
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

        cy.wait(1000);
    })
    it('Test reset password error', () => {
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

        cy.wait(1000);
    })
    it('Test reset password successfully', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const mensage = 'senha'

        cy.get('#link-resetPassword')
            .click()

        cy.get('.input-reset-email').type(newEmail)
            .should('have.value', newEmail)

        cy.get('.send-reset')
            .click()

        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')

        cy.wait(1000);
    })
    it('Test buton cadaster page', () => {
        cy.get('#link-cadaster')
            .click()
        cy.wait(1000);
    })

    it('Test successful login', () => {
        cy.intercept('POST', '**/login', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    user: {
                        token: 'seu-token-de-acesso',
                        email: 'kaiosimeao@gmail.com',
                    }
                }
            }) 
        });
        cy.visit('http://localhost:3000');

        cy.get('.email').type('kaiosimeao@gmail.com');
        cy.get('.password').type('kaio1234');

        cy.get('.login-btn').click();

        cy.wait(3000);

        cy.get('#logo-aside').should('be.visible')
    });

})