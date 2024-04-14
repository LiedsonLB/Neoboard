class Funcionario {
    constructor(id, picture, nome, email, descricao, endereco, localAtuacao, genero, cpf, dataContratacao, telefone, formacaoAcademica, linkedin, github, usuario, vendas) {
        this.id = id;
        this.picture = picture;
        this.nome = nome;
        this.email = email;
        this.descricao = descricao;
        this.endereco = endereco;
        this.localAtuacao = localAtuacao;
        this.genero = genero;
        this.cpf = cpf;
        this.dataContratacao = dataContratacao;
        this.telefone = telefone;
        this.formacaoAcademica = formacaoAcademica;
        this.linkedin = linkedin;
        this.github = github;
        this.usuario = usuario;
        this.vendas = vendas || [];
    }
}

export default Funcionario;