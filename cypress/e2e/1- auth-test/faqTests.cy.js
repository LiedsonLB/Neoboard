describe('FAQ Component Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(7)').click();
    });

    it('Testes links de contato', () => {
        cy.contains('.social-card', 'Escrever Email').find('a').should('have.attr', 'href', 'mailto:liedson.b9@gmail.com');
        cy.contains('.social-card', 'Conversar no Whatsapp').find('a').should('have.attr', 'href', 'https://wa.me/86998635571');
        cy.contains('.social-card', 'Contato no Linkedin').find('a').should('have.attr', 'href', 'https://www.linkedin.com/in/liedsonlb/');
    });

    it('Tests campos de input', () => {
        const userName = 'João da Silva';
        const userEmail = 'joao@example.com';
        const userMessage = 'Olá, gostaria de saber mais sobre o produto.';

        cy.get('[name="user_name"]').type(userName).should('have.value', userName);
        cy.get('[name="user_email"]').type(userEmail).should('have.value', userEmail);
        cy.get('[name="message"]').type(userMessage).should('have.value', userMessage);
    });

    it('Teste de validação do formulário', () => {
        cy.get('.faq-btn').click();
        cy.get('#faq-container').should('contain', 'Por favor, preencha todos os campos.');

        cy.get('[name="user_name"]').type('João');
        cy.get('.faq-btn').click();
        cy.get('#faq-container').should('contain', 'Por favor, preencha todos os campos.');
    });


    it('Test de envio de mensagem', () => {
        const userName = 'João da Silva';
        const userEmail = 'joao@example.com';
        const userMessage = 'Olá, gostaria de saber mais sobre o produto.';

        cy.get('[name="user_name"]').type(userName);
        cy.get('[name="user_email"]').type(userEmail);
        cy.get('[name="message"]').type(userMessage);
        cy.get('.faq-btn').click();

        cy.get('#popup').should('contain', 'Sucesso');
        cy.get('#popup').should('contain', 'Sua mensagem foi enviada com sucesso!');
    });

});

