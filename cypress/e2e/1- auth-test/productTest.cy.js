describe('Teste da página Produtos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(2)').click()
    });
    it('Test Add New Product', () => {
        
        cy.get('#add-product').click();

        cy.get('[type="file"]').selectFile('cypress/images/imageTestProd.jpeg', {force: true});
        cy.get('#name-item').type('Novo Produto');
        cy.get('#categoria-item').type('Categoria Teste');
        cy.get('#valor-item').type('10');
        cy.get('#descricao-item').type('Descrição do Novo Produto');

        cy.get('#add-staff-Btn').click();

        cy.wait(3000);

        cy.get('#add-product').click();

        cy.get('[type="file"]').selectFile('cypress/images/imageTestProd.jpeg', {force: true});
        cy.get('#name-item').type('Novo Produto2');
        cy.get('#categoria-item').type('Categoria Teste2');
        cy.get('#valor-item').type('20');
        cy.get('#descricao-item').type('Descrição do Novo Produto2');

        cy.get('#add-staff-Btn').click();

        cy.wait(3000);
 
        cy.contains('.prod-card', 'Novo Produto').should('be.visible');
    });

    it('Test Edit existing product', () => {
        
        cy.get('.prod-card').first().find('.edit-item').click();

        cy.get('#name-item').clear().type('Produto Editado');
        cy.get('#categoria-item').clear().type('Categoria Editada');
        cy.get('#valor-item').clear().type('20');
        cy.get('#descricao-item').clear().type('Descrição do Produto Editado');

        cy.get('#edit-product-Btn').click();

        cy.contains('.prod-card', 'Produto Editado').should('be.exist');
        cy.wait(3000);
    });
    it('Search Product', () => {
        cy.get('#search-product').type('Produto Editado');

        cy.get('.prod-card').each(($el) => {
            cy.wrap($el).find('.name-product').should('contain.text', 'Produto Editado');
        });
        cy.wait(3000);
    });
    it('teste para ver detalhes de um produto', ()=>{
        cy.get('.see-prod-btn').first().click();

        cy.wait(1000);
    
        cy.url().should('include', '/product/');
    })
    it('Excluir produto existente', () => {
        cy.get('.prod-card').first().find('.delete-item').click();

        cy.contains('button', 'Sim').click();

        cy.contains('.prod-card', 'Produto Editado').should('exist');
        cy.wait(3000);
    });

})