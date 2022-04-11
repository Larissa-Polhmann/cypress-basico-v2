/// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')   
    })

    it('verifica o título da aplicação', () => {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longTest = 'Durante o curso vamos instalar o Cypress, fazer o setup inicial para escrever testes, e então vamos abordar diferentes formas de interagir com aplicações web, tais como navegação por URLs, diversos tipos de ações (digitação em campos, seleção de opções, cliques em botões, etc.), além de como adicionar as mais verificações de resultados esperados (assertions.)';
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Polhmann')
        cy.get('#email').type('lari@email.com')
        cy.get('#open-text-area').type(longTest, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });

    it('exibe a mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Polhmann')
        cy.get('#email').type('lari.email.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone')
            .type('abc')
            .should('have.value', '')
    });

    it('exibe uma mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulátio', () => {
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Polhmann')
        cy.get('#email').type('lari.email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Larissa')
            .should('have.value', 'Larissa')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Polhmann')
            .should('have.value', 'Polhmann')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('lari.email.com')
            .should('have.value', 'lari.email.com')
            .clear()
            .should('have.value', '')
            
        cy.get('#phone')
            .type('999995555')
            .should('have.value', '999995555')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (Youtube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona produto (Mentoria) por seu valor', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona produto (Blog) por seu indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos os checkboxes, e depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function ($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });
});