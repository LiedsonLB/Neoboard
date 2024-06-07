describe('Teste da página Produtos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(2)').click()
    });

    it('Adicionar novo produto', () => {
        // Clique no botão "Adicionar Produto"
        cy.get('#add-product').click();
    
        // Preencha os campos do formulário para adicionar um novo produto
        cy.get('[type="file"]').selectFile('cypress/images/imageTest.jpeg', {force: true});
        cy.get('#name-item').type('Novo Produto');
        cy.get('#categoria-item').type('Categoria Teste');
        cy.get('#valor-item').type('10');
        cy.get('#descricao-item').type('Descrição do Novo Produto');


    
        // Clique no botão "Enviar"
        cy.get('#add-staff-Btn').click();
    
        // Verifique se o novo produto foi adicionado corretamente
        cy.contains('.prod-card', 'Novo Produto').should('be.visible');
    });
    

    it('Editar produto existente', () => {
        // Clique no botão de edição de um produto existente
        cy.get('.prod-card').first().find('.edit-item').click();
    
        // Edite os campos do formulário para o produto selecionado

        cy.get('#name-item').clear().type('Produto Editado');
        cy.get('#categoria-item').clear().type('Categoria Editada');
        cy.get('#valor-item').clear().type('20');
        cy.get('#descricao-item').clear().type('Descrição do Produto Editado');
    
        // Clique no botão "Salvar Alterações"
        cy.get('#edit-product-Btn').click();
    
        // Verifique se as alterações foram salvas corretamente
        cy.contains('.prod-card', 'Produto Editado').should('be.visible');
    });

    it('Pesquisar produto', () => {
        // Digite o nome do produto na barra de pesquisa
        cy.get('#search-product').type('Produto Editado');
    
        // Verifique se apenas os produtos que correspondem à pesquisa são exibidos
        cy.get('.prod-card').each(($el) => {
            cy.wrap($el).find('.name-product').should('contain.text', 'Produto Editado');
        });
    });

    // it('Filtrar produtos por categoria', () => {
    //     // Selecione uma categoria no dropdown de filtro
    //     cy.get('#filter-expense').select('Categoria Teste');
    
    //     // Verifique se apenas os produtos que pertencem à categoria selecionada são exibidos
    //     cy.get('.prod-card').each(($el) => {
    //         cy.wrap($el).should('contain.value', 'Categoria Teste');
    //     });
    
    //     // Verifique se o número de produtos filtrados está correto
    //     cy.get('#result-product').should('contain.html', 'Resultados');
    // });
    
    it.only('Excluir produto existente', () => {
        // Clique no botão de exclusão de um produto existente
        cy.get('.prod-card').first().find('.delete-item').click();
    
        // Confirme a exclusão
        cy.contains('button', 'Sim').click();
    
        // Verifique se o produto foi removido da lista
        cy.contains('.prod-card', 'Produto Editado').should('exist');
    });

    
        

})