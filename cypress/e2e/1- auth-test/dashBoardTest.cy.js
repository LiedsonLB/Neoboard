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
    //     cy.get('.login-btn').click()
    //     cy.wait(3000)
    // })

    it('Test open and close aside', () => {
        // Verifica se a aside tem a classe 'closed'
        cy.get('#aside-home')
        .should('have.class', 'closed')
        // Clica no botão para abrir a aside
        cy.get('#togle-btn')
        .click()
        // Verifica se a aside não tem a classe 'closed' 
        cy.get('#aside-home')
        .should('not.have.class', 'closed')
    });
    // it('teste botões das aside', () => {
    //     cy.get('#navigation-home > ul > :nth-child(2)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(3)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(4)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(5)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(6)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(7)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)

    //     cy.get('#navigation-home > ul > :nth-child(1)').click()
    //     cy.get('#aside-home').should('have.class', 'closed')
    //     cy.get('#togle-btn').click()
    //     cy.wait(2000)
    // });

    it('Test change analysis period', () => {
        // Clica na opção para mostrar a analise semanal e verifica se há a classe 'active'
        cy.get('#periods')
        .contains('Semanal')
        .click()
        cy.get('#periods > :nth-child(1)')
        .should('have.class', 'active')
        // Clica na opção para mostrar a analise mensal e verifica se há a classe 'active'
        cy.get('#periods')
        .contains('Mensal')
        .click()
        cy.get('#periods > :nth-child(2)')
        .should('have.class', 'active')
        // Clica na opção para mostrar a analise anual e verifica se há a classe 'active'
        cy.get('#periods')
        .contains('Anual')
        .click()
        cy.get('#periods > :nth-child(3)')
        .should('have.class', 'active')
    });

    it('Test modal neoboard', () =>{
        // Clica para abrir o modal
        cy.get('#Neo-Help').click()
        // Declarando constante e verificando se ela está visivel no modal
        const titleText = "Dicas do Neo: "
        cy.contains('.Modal-Help', titleText)
        .find('.header-Help')
        .should('be.visible')
        // Procura dentro do modal o botão 'Entendi' e fecha o modal
        cy.get('.container-Help')
        .find('.Help-Text')
        .contains('button', 'Entendi')
        .click()
        // Verifica se o modal não é mais visivel
        cy.get('#main-page')
        .should('not.have.class', '.Modal-Help')
    })
    
});