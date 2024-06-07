describe('Teste de carregamento da página de login', () => {
    let temporaryEmail = '';

    beforeEach(() => {
        cy.visit('http://localhost:3000/cadaster')
    })

    it('Test submit empty registration', () => {
        const mensage = "Atenção"

        cy.get('.user')
            .should('not.have.value')

        cy.get('.email')
            .should('not.have.value')

        cy.get('.password')
            .should('not.have.value')

        cy.get('.singup-btn')
            .click()

        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    })

    it('Test error email not filled out correctly', () => {
        const newUser = "Alcemir"
        const newEmail = "emailerror@gmail"
        const newPassword = "alcemir123"
        const mensage = 'Erro'

        cy.get('.user')
            .type(newUser)
            .should('have.value', newUser)

        cy.get('.email')
            .type(newEmail)
            .should('have.value', newEmail)

        cy.get('.password')
            .type(newPassword)
            .should('have.value', newPassword)

        cy.get('.singup-btn')
            .click()

        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    })

    it('Test email already registered', () => {
        const newUser = "Liedson123"
        const newEmail = "liedson.b9@gmail.com"
        const newPassword = "liedson1234"
        const mensage = 'Erro'

        cy.get('.user')
            .type(newUser)
            .should('have.value', newUser)

        cy.get('.email')
            .type(newEmail)
            .should('have.value', newEmail)

        cy.get('.password')
            .type(newPassword)
            .should('have.value', newPassword)

        cy.get('.singup-btn')
            .click()

        cy.contains('#popup', mensage)
            .find('.title-popup')
            .should('be.visible')
    })


    function generateTemporaryEmail() {
        const domain = 'mailinator.com';
        return `test_${Date.now()}@${domain}`;
        return temporaryEmail;
    }

    it('Test successful registration', () => {
        function generateTemporaryEmail() {
            const domain = 'mailinator.com';
            const temporaryEmail = `test_${Date.now()}@${domain}`;
            Cypress.env('temporaryEmail', temporaryEmail);
            return temporaryEmail;
        }

        const email = generateTemporaryEmail();
        const newUser = `User_${Date.now()}`;
        const newPassword = "liedson1234";

        cy.get('.user').type(newUser).should('have.value', newUser);
        cy.get('.email').type(email).should('have.value', email);
        cy.get('.password').type(newPassword).should('have.value', newPassword);

        cy.get('.singup-btn').click();
        cy.wait(3000);
    })
})