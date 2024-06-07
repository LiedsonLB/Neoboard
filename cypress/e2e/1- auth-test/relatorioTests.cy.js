describe('Testes do Relatório', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#navigation-home > ul > :nth-child(6)').click();
    });

    it('Test baixar o modelo', () => {
        cy.get('#format-select').select('xlsx');

        cy.get('#format-select').should('have.value', 'xlsx');

        cy.get('#format-select').trigger('change');
        
        const downloadPath = 'cypress/downloads/Relatorio_de_vendas_7-6-2024.xlsx';
        
        cy.wait(1000); 
        
        cy.readFile(downloadPath, 'binary').then(downloadedFileContent => {

            const expectedFilePath = 'cypress/docs/neoboardPlanilha.xlsx';
            cy.readFile(expectedFilePath, 'binary').then(expectedFileContent => {

                const downloadedFileBase64 = Cypress.Blob.binaryStringToBlob(downloadedFileContent).toString('base64');
                const expectedFileBase64 = Cypress.Blob.binaryStringToBlob(expectedFileContent).toString('base64');
                expect(downloadedFileBase64).to.eq(expectedFileBase64);
            });
        });
    });
    
    
    it('Test enviar o relatório', () => {
        // Simula o carregamento do arquivo de relatório
        cy.get('.buttonSendFile').selectFile('cypress/docs/planilhaTestes.xlsx');
        // Clica no botão de envio
        cy.get('#uploadButton').click();
        // Verifica se o popup de sucesso é exibido
        cy.get('#popup').should('exist');
    });

    it('Teste cancelar o envio do relatório', () => {
        // Simula o carregamento do arquivo de relatório
        cy.get('#fileElem').selectFile('cypress/docs/planilhaTestes.xlsx', { force: true });
    
        // Verifica se o arquivo foi carregado
        cy.get('#output').should('not.be.empty');
    
        // Aguarda por um tempo ou um evento específico se necessário
        cy.wait(1000); // Ajuste o tempo conforme necessário
        
        cy.get('#cancelFile').click();
    

        cy.wait(1000); 
  
        cy.get('#output').should('contain', '');
    });
    
    it('Teste editar o arquivo de relatório corretamente', () => {
        cy.get('.buttonSendFile').selectFile('cypress/docs/planilhaTestes.xlsx', { force: true });
       
        cy.get('#output').should('not.be.empty');
    
        cy.get('#output').within(() => {
            cy.get('tr').eq(1).find('td').eq(1).find('input').clear().type('João');
            cy.get('tr').eq(1).find('td').eq(2).find('input').clear().type('Sorvete');
            cy.get('tr').eq(1).find('td').eq(3).find('input').clear().type('100');
            cy.get('tr').eq(1).find('td').eq(5).find('input').clear().type('Piracuruca');
        });
    
        cy.get('#output').within(() => {
            cy.get('tr').eq(1).find('td').eq(1).find('input').invoke('val').should('contain', 'João');
            cy.get('tr').eq(1).find('td').eq(2).find('input').invoke('val').should('contain', 'Sorvete');
            cy.get('tr').eq(1).find('td').eq(3).find('input').invoke('val').should('contain', '100');
            cy.get('tr').eq(1).find('td').eq(5).find('input').invoke('val').should('contain', 'Piracuruca');
        });
    });
    
    
});

