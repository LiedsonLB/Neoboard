describe('Teste da pagina inicial', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });
    
    // it('Teste Login Bem sucedido', () => {

    //     const novoEmail = 'liedsonbarros123@gmail.com'
    //     const novoPassword = 'kleberson2014'

    //     // Encontra o campo de e-mail pelo atributo 'name' e insere o novo e-mail
    //     cy.get('.email').type(novoEmail).should('have.value', novoEmail)
    //     cy.get('.password').type(novoPassword).should('have.value', novoPassword)
    //     cy.get('.login-btn').click()
    //     cy.wait(3000)
    // })

    it('Test open and close aside', () => {
        cy.get('#aside-home')
        .should('have.class', 'closed')

        cy.get('#togle-btn')
        .click()

        cy.get('#aside-home')
        .should('not.have.class', 'closed')
    });

    it('teste botões das aside', () => {
        cy.get('#navigation-home > ul > :nth-child(2)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(3)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(4)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(5)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(6)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(7)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()

        cy.get('#navigation-home > ul > :nth-child(1)').click()
        cy.get('#aside-home').should('have.class', 'closed')
        cy.get('#togle-btn').click()
    });

    it('Test change analysis period', () => {
        cy.get('#periods')
        .contains('Semanal')
        .click()

        cy.get('#periods > :nth-child(1)')
        .should('have.class', 'active')
    
        cy.get('#periods')
        .contains('Mensal')
        .click()

        cy.get('#periods > :nth-child(2)')
        .should('have.class', 'active')

        cy.get('#periods')
        .contains('Anual')
        .click()

        cy.get('#periods > :nth-child(3)')
        .should('have.class', 'active')
    });

    it('Test modal neoboard', () =>{
        cy.get('#Neo-Help').click()

        const titleText = "Dicas do Neo: "
        cy.contains('.Modal-Help', titleText)
        .find('.header-Help')
        .should('be.visible')

        cy.get('.container-Help')
        .find('.Help-Text')
        .contains('button', 'Entendi')
        .click()

        cy.get('#main-page')
        .should('not.have.class', '.Modal-Help')
    })
    
});
// describe('Teste da pagina produtos', () => {
    
// });