describe('Teste da pagina inicial', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });
    it('Test open and close aside', () => {
        cy.get('#aside-home')
        .should('have.class', 'closed')

        cy.get('#togle-btn')
        .click()

        cy.get('#aside-home')
        .should('not.have.class', 'closed')
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