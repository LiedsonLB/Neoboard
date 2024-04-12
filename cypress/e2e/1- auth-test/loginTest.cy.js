describe('Teste de carregamento da página de login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Teste mostrar senha', () => {
        const novoPassword = 'Teste Mostrar Senha'

        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        cy.wait(1000)

        cy.get("#see-password-login").click()

        cy.wait(3000)

        cy.get("#see-password-login").click()
        
        cy.wait(500)

        cy.get("#see-password-login").click()
        
        cy.wait(500)

        cy.get("#see-password-login").click()
        
        cy.wait(500)
    })

    it('Teste Login Campo vazio', () => {

        const novoEmail = 'liedsonbarros123@gmail.com'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)

        // Clica no botão de login
        cy.get('.login-btn').click()

        // intervalo de 3s
        cy.wait(3000)

    })

    it('Teste Erro Login', () => {

        const novoEmail = 'liedsonbarros@gmail.com'
        const novoPassword = 'olamundo1'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)
        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        cy.wait(1000)

        cy.get("#see-password-login").click()

        cy.wait(3000)

        // Clica no botão de login
        cy.get('.login-btn').click()

        // intervalo de 3s
        cy.wait(3000)

    })

    it('Teste Login Bem sucedido', () => {

        const novoEmail = 'liedsonbarros123@gmail.com'
        const novoPassword = 'kleberson2014'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)
        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        // intervalo de 1s
        cy.wait(1000)

        // Clica no botão de login
        cy.get('.login-btn').click()

        // intervalo de 3s
        cy.wait(3000)

        cy.get('.logout-user').click()
    })

    it('teste redefinir senha erro preenchimento', ()=> {

        cy.get('#link-resetPassword').click()

        // intervalo de 3s
        cy.wait(3000)
    })

    it('teste redefinir senha erro', ()=> {

        const novoEmail = 'olaMundos123@gmail'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)

        cy.get('#link-resetPassword').click()

        // intervalo de 3s
        cy.wait(3000)
    })

    it('teste redefinir senha sucesso', ()=> {

        const novoEmail = 'liedsonbarros123@gmail.com'

        // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)

        cy.get('#link-resetPassword').click()

        // intervalo de 3s
        cy.wait(3000)
    })

    it('teste botão página cadastro', () => {
        cy.get('#link-cadaster').click()

        cy.wait(3000)

        cy.visit('https://neoboardauth.web.app')
    })
})