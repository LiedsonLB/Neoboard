describe('Teste da página Funcionários', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); 
        cy.get('#navigation-home > ul > :nth-child(4)').click(); 
    });

    it('Adicionar Funcionário', () => {
        const mensage = 'funcionário adicionado'

        cy.get('#add-staff').click();

        
        cy.get('[type="file"]').selectFile('cypress/images/funcionarioTest.png');
        cy.get('#name-item').type('Novo Funcionário');
        cy.get('#data-nascimento-item').type('1990-01-01');
        cy.get('#local-atuacao-item').type('Local de Atuação');
        cy.get('#data-contrato-item').type('2024-06-01');
        cy.get('#genero-item').select('Masculino');
        cy.get('#email-item').type('novo@funcionario.com');
        cy.get('#cargo-item').type('Cargo do Novo Funcionário');
        cy.get('#telefone-item').type('(00) 1234-5678');
        cy.get('#cpf-item').type('123.456.789-00');
        cy.get('#linkedin-item').type('https://www.linkedin.com/novo_funcionario');
        cy.get('#github-item').type('https://github.com/novo_funcionario');
        cy.get('#description-item').type('Descrição do Novo Funcionário');

        
        cy.get('#add-staff-Btn').click();

        cy.wait(3000);
      
        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    });

    it('Editar Funcionário', () => {
        const mensage = 'Funcionário editado'       
        cy.get('.stf-card').first().find('.edit-item').click();


        cy.get('#name-item').clear().type('Funcionário Editado');
        cy.get('#cargo-item').clear().type('Novo Cargo');
        cy.get('#telefone-item').clear().type('(00) 9876-5432');

        cy.get('#edit-product-Btn').click();
        
        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    });

    it('Pesquisar Funcionário', () => {
        
        cy.get('#search-stf').type('Funcionário Editado');
    
        
        cy.get('.stf-card').each(($el) => {
            cy.wrap($el).find('.staff-nick').should('contain.text', 'Funcionário Editado');
        });
    });

    it('Filtrar Funcionário', () => {
        
        cy.get('#filter-staff').select('Novo Cargo'); 
    
       
        cy.get('.stf-card').each(($el) => {
            cy.wrap($el).find('.cargo-stf').should('contain.text', 'Novo Cargo');
        });
    });

    it('Deletar Funcionário', () => {
        const mensage = 'Funcionário Excluído'

        cy.get('.stf-card').first().find('.delete-item').click();
       
        cy.contains('button', 'Sim').click();
    
        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    });
    
});

