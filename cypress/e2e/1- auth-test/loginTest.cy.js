/// <reference types="cypress" />
describe('Test login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Test input values', () => {
        const testEmail = 'Test@email.com'
        const testPassword = 'Test password'

        //passando uma valor para o input e verificando se o valor foi passado
        cy.get('.email')
        .type(testEmail)
        .should('have.value', testEmail)
        //passando uma valor para o input e verificando se o valor foi passado
        cy.get('.password')
        .type(testPassword)
        .should('have.value', testPassword)
    });
    it('Test show password', () => {
        //verificando se o botão está com a classe correta  
        cy.get("#see-password-login")
        .should('have.class', 'fa-solid fa-eye')
        //clique no botão
        cy.get("#see-password-login")
        .click()
        //verificando se o botão está sem a classe antiga e se esta com a nova classe   
        cy.get("#see-password-login")
        .should('not.have.class', 'fa-solid fa-eye')
        .and('have.class', 'fa-solid fa-eye-slash')
    })

    it('Test login empty field', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const mensage = "Atenção"

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)
        // Clica no botão de login
        cy.get('.login-btn')
        .click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    it('Test login error', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const newPassword = 'errorpassword'
        const mensage = 'Erro'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)
        // Encontra o campo de password pelo atributo 'name' e insere o novo password
        cy.get('.password')
        .type(newPassword)
        .should('have.value', newPassword)
        // Clica no botão de login
        cy.get('.login-btn')
        .click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    
    it('Test reset password filling error', ()=> {
        const mensage = 'Atenção'
        // Clica para resetar senha
        cy.get('#link-resetPassword')
        .click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')

    })
    
    it('Test reset password error', ()=> {
        const newEmail = 'olaMundos123@gmail'
        const mensage = 'Erro'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email')
        .type(newEmail)
        .should('have.value', newEmail)
        // Clica para resetar senha
        cy.get('#link-resetPassword')
        .click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    
    it('Test reset password successfully', ()=> {
        const newEmail = 'liedsonbarros123@gmail.com'
        const mensage = 'Redefinição Enviada'
        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(newEmail)
        .should('have.value', newEmail)
        cy.get('#link-resetPassword')
        .click()        
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    
    it('Test buton cadaster page', () => {
        // Clica para acessar a pagina de registro
        cy.get('#link-cadaster')
        .click()
        // intervalo de 3s
    })
    it('Test successful login', () => {
        const newEmail = 'liedsonbarros123@gmail.com'
        const newPassword = 'kleberson2014'
    
        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(newEmail).should('have.value', newEmail)
        cy.get('.password').type(newPassword).should('have.value', newPassword)
        // intervalo de 1s
        cy.wait(1000)
        // Clica no botão de login
        cy.get('.login-btn').click()
        // Intervalo de 3s
        cy.wait(3000)
    })
})