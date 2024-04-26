describe('Teste de carregamento da página de login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cadaster')
    })

    it('Test submit empty registration', ()=> {
        const mensage = "Atenção"
        // Testando se está vazio
        cy.get('.user')
        .should('not.have.value')
        cy.get('.email')
        .should('not.have.value')
        cy.get('.password')
        .should('not.have.value')
        // Clica no botão para enviar cadastro
        cy.get('.singup-btn')
        .click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    it('Test error email not filled out correctly', ()=> {
        const newUser = "Alcemir"
        const newEmail = "emailerror@gmail"
        const newPassword = "alcemir123"
        const mensage = 'Erro'

        cy.get('.user').type(newUser).should('have.value', newUser)
        cy.get('.email').type(newEmail).should('have.value', newEmail)
        cy.get('.password').type(newPassword).should('have.value', newPassword)

        cy.get('.singup-btn').click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })

    it('Test email already registered', ()=> {
        const newUser = "Liedson123"
        const newEmail = "liedson.b9@gmail.com"
        const newPassword = "liedson1234"
        const mensage = 'Erro'

        cy.get('.user').type(newUser).should('have.value', newUser)
        cy.get('.email').type(newEmail).should('have.value', newEmail)
        cy.get('.password').type(newPassword).should('have.value', newPassword)

        cy.get('.singup-btn').click()
        // Verificando se o popup aparece
        cy.contains('#popup', mensage)
        .find('.title-popup')
        .should('be.visible')
    })
    it('Test successful registration', ()=> {
        const newUser = "Liedson123"
        const newEmail = "liedson1234@gmail.com"
        const newPassword = "liedson1234"

        cy.get('.user').type(newUser).should('have.value', newUser)
        cy.get('.email').type(newEmail).should('have.value', newEmail)
        cy.get('.password').type(newPassword).should('have.value', newPassword)

        cy.get('.singup-btn').click()

        cy.wait(3000)
    })

})