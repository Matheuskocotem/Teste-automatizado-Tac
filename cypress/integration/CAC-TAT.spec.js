describe("Central de Atendimento ao Cliente TAT", function () {
    beforeEach(function () {
        cy.visit("./src/index.html");
    });

    it("verifica o título da aplicação", function () {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    });

    it("preenche os campos obrigatórios e envia formulário", function () {  
        cy.get('input[name="firstName"]').type("Maria").should('have.value', 'Maria');
        cy.get('input[name="firstName"]').clear().should('have.value', '');

        cy.get('input[name="lastName"]').type("Sampietro").should('have.value', 'Sampietro');
        cy.get('input[name="lastName"]').clear().should('have.value', '');

        cy.get('input[name="email"]').first().type("maria@gmail.com").should('have.value', 'maria@gmail.com');
        cy.get('input[name="email"]').first().clear().should('have.value', '');

        cy.get('input[name="phone"]').first().type("123456789").should('have.value', '123456789');
        cy.get('input[name="phone"]').first().clear().should('have.value', '');

        cy.get('textarea[name="open-text-area"]').type("Uma Mensagem de texto", { delay: 0 }).should('have.value', 'Uma Mensagem de texto');
        cy.get('textarea[name="open-text-area"]').clear().should('have.value', '');

        cy.get('button[type="submit"]').click();

        cy.wait(2000);
        cy.get('.success', { timeout: 10000 }).should('be.visible')
            .and('contain.text', 'Mensagem enviada com sucesso.');
    });

    // Exercício extra 1
    it("preenche o campo 'Como podemos te ajudar?' com um texto longo e sem delay", function () {
        cy.get('textarea[name="open-text-area"]').type("Texto longo sem delay", { delay: 0 }).should('have.value', 'Texto longo sem delay');
    });

    // Exercício extra 2
    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.get('input[name="firstName"]').type("Maria");
        cy.get('input[name="lastName"]').type("Sampietro");
        cy.get('input[name="email"]').type("maria.com"); 
        cy.get('textarea[name="open-text-area"]').type("Uma Mensagem de texto");

        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible')
            .and('contain.text', 'Valide os campos obrigatórios!');
    });

    // Exercício extra 3
    it("valida que um valor não numérico no campo telefone é limpo", function () {
        cy.get('input[name="phone"]').type("abc").should('have.value', '');
    });

    // Exercício extra 4
    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
        cy.get('input[name="firstName"]').type("Maria");
        cy.get('input[name="lastName"]').type("Sampietro");
        cy.get('input[name="email"]').type("maria@gmail.com");
        cy.get('textarea[name="open-text-area"]').type("Uma Mensagem de texto");

        cy.get('input[name="phone"]').clear(); 
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!');
    });

    // Exercício extra 5
    it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
        cy.get('input[name="firstName"]').type("Maria").should('have.value', 'Maria').clear().should('have.value', '');
        cy.get('input[name="lastName"]').type("Sampietro").should('have.value', 'Sampietro').clear().should('have.value', '');
        cy.get('input[name="email"]').first().type("maria@gmail.com").should('have.value', 'maria@gmail.com').clear().should('have.value', '');
        cy.get('input[name="phone"]').type("123456789").should('have.value', '123456789').clear().should('have.value', '');
    });

    // Exercício extra 6
    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!');
    });

    // Exercício extra 7 - Comandos customizados
    it("envia o formulário com sucesso usando um comando customizado", function () {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible')
            .and('contain.text', 'Mensagem enviada com sucesso.');
    });

    // Exercício extra 8
    it("substitui o uso de cy.get() por cy.contains() para clicar em botões", function () {
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible')
            .and('contain.text', 'Mensagem enviada com sucesso.');
    });
});
