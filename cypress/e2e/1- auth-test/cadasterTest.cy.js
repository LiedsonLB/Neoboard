describe('Teste de carregamento da página de login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cadaster')
    })

    it('teste preencher cadastro vazio', ()=> {

        cy.wait(2000)

        cy.get('.singup-btn').click()

        cy.wait(3000)
    })

    it('teste erro cadastro', ()=> {
        const novoUser = "Alcemirous"
        const novoEmail = "emailerror@gmail"
        const novoPassword = "alcemir123"

        cy.get('.user').type(novoUser).should('have.value', novoUser)
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)
        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        cy.get('.singup-btn').click()

        cy.wait(3000)
    })

    it('teste cadastro bem sucedido', ()=> {
        const novoUser = "Liedson123"
        const novoEmail = "liedson1234@gmail.com"
        const novoPassword = "liedson1234"

        cy.get('.user').type(novoUser).should('have.value', novoUser)
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)
        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        cy.get('.singup-btn').click()

        cy.wait(3000)

        cy.get('.logout-user').click()
    })

    it('teste email já cadastrado', ()=> {
        const novoUser = "Liedson123"
        const novoEmail = "liedson.b9@gmail.com"
        const novoPassword = "liedson1234"

        cy.get('.user').type(novoUser).should('have.value', novoUser)
        cy.get('.email').type(novoEmail).should('have.value', novoEmail)
        cy.get('.password').type(novoPassword).should('have.value', novoPassword)

        cy.get('.singup-btn').click()

        cy.wait(3000)
    })
})