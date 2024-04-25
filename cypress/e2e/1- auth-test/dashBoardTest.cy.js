describe('Teste da pagina inicial(dashBoard)', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });
    
    // it('Teste Login Bem sucedido', () => {

    //     const novoEmail = 'liedsonbarros123@gmail.com'
    //     const novoPassword = 'kleberson2014'

    //     // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
    //     cy.get('.email').type(novoEmail).should('have.value', novoEmail)
    //     cy.get('.password').type(novoPassword).should('have.value', novoPassword)

    //     // intervalo de 1s
    //     cy.wait(1000)

    //     // Clica no botão de login
    //     cy.get('.login-btn').click()

    //     cy.wait(3000)
    // })

    it('teste abrir fechar aside', () => {
        cy.wait(2000)
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.get('#aside-home').should('not.have.class', 'closed')
    });
    it('teste botões das aside', () => {
        cy.get('#navigation-home > ul > :nth-child(2)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(3)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(4)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(5)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(6)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(7)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)

        cy.get('#navigation-home > ul > :nth-child(1)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
        cy.wait(2000)
    });

    it('teste de periodo', () => {
        cy.get('#periods').contains('Semanal').click()
        cy.get('#periods > :nth-child(1)').should('have.class', 'active')
        cy.wait(2000)

        cy.get('#periods').contains('Mensal').click()
        cy.get('#periods > :nth-child(2)').should('have.class', 'active')
        cy.wait(2000)

        cy.get('#periods').contains('Anual').click()
        cy.get('#periods > :nth-child(3)').should('have.class', 'active')
        cy.wait(2000)
    });

    it.only('teste neoguide', () =>{
        cy.get('#Neo-Help').click()
        cy.get('.Modal-Help').find('.container-Help').should('be.visible')
        cy.wait(2000)
        cy.get('.close-btn').click()
        cy.get('#Neo-Help').click()
        cy.wait(2000)
        cy.get('.help-btn').click()
    })


});