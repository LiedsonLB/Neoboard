/// <reference types="cypress" />

describe.only('Financeiro Component - Adição e Edição de Despesas', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(5)').click()
    });
    it('Deve abrir e fechar o modal de adicionar despesa', () => {
        cy.get('#add-product').click()

        const titleText = "Adicionar Despesa"
        cy.contains('.Modal-Add', titleText).find('#header-modal').should('be.visible')

        cy.get('.close-btn').click()

        cy.get('#home-screen')
        .should('not.have.class', '.Modal-Add');
    });
    it('Adicionar despesa', () => {
        cy.get('#add-product').click()

        cy.get('#name-item').type('Nova despesa')
        cy.get('#data-despesa').clear().type('07-06-2024');

        cy.get('#email-item').type('10');
        cy.get('#description-item').type('Descrição do Novo despesa');
        cy.get('#add-staff-Btn').click()
    });
    it('Deve editar uma despesa corretamente', () => {
      cy.get('#exp-cards button').first().find('.edit-expense-btn').click();

      cy.get('#name-item').clear().type('Despesa Editada');
      cy.get('#add-staff-Btn').click();
      
      cy.get('#exp-cards button').should('contain.text', 'Despesa Editada');
    }); 
    
    it('Deve buscar despesas corretamente', () => {
        cy.get('#search-exp').type('Despesa Editada');
        cy.get('#exp-cards').each(($el) => {
            cy.wrap($el).should('contain.text', 'Despesa Editada');
        });
    });

    it('Deve editar uma despesa corretamente', () => {
        cy.get('#exp-cards button').first().find('.delete-item').click();

        cy.get('.logout-yes').click()

        cy.get('#exp-cards button').should('not.exist');
      }); 
    });