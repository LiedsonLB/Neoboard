describe('Teste da página Regiões', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(3)').click();
    });

    it('Adicionar nova região', () => {
     
        cy.get('#add-product').click();

       
        cy.get('[type="file"]').selectFile('cypress/images/imageTestReg.png', {force: true});
        cy.get('#name-region').type('Nova Região');
        cy.get('#cidade-region').type('Cidade Teste');
        cy.get('#endereco-region').type('Endereço Teste');
        cy.get('#responsavel-region').type('Responsável Teste');
        cy.get('#descricao-region').type('Descrição da Nova Região');

     
        cy.get('#add-Region-Btn').click();

        cy.wait(3000);

        cy.contains('.region-row', 'Nova Região').should('be.visible');
    });

    it('Editar região existente', () => {
        
        cy.get('.region-row').first().find('.edit').click();

        
        cy.get('#name-region').clear().type('Região Editada');
        cy.get('#cidade-region').clear().type('Cidade Editada');
        cy.get('#endereco-region').clear().type('Endereço Editado');
        cy.get('#responsavel-region').clear().type('Responsável Editado');
        cy.get('#descricao-region').clear().type('Descrição da Região Editada');

       
        cy.get('#edit-Region-Btn').click();

      
        cy.contains('.region-row', 'Região Editada').should('be.visible');
    });

    it('Pesquisar região', () => {
        // Digitar o nome da região na barra de pesquisa
        cy.get('#search-region').type('Região Editada');
    
        // Verificar se cada linha da tabela possui o texto 'Região Editada' na célula correspondente ao nome da região
        cy.get('.region-row').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('.region-name').should('contain.text', 'Região Editada');
            });
        });
    });

    it('Excluir região existente', () => {
        // Clicar no botão de deletar da primeira linha da tabela
        cy.get('.region-row').first().find('.delete').click();
    
        // Forçar o clique no botão "Sim" no modal de confirmação
        cy.contains('button', 'Sim').click({ force: true });
    
        // Verificar se a linha com a região editada não existe mais
        cy.contains('.region-row', 'Região Editada').should('not.exist');
    });
    
})

