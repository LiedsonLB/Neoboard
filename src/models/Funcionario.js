class Funcionario {
    constructor(id, img_funcionario, nome, email, descricao, endereco, localAtuacao, genero, cpf, dataContratacao, telefone, formacaoAcademica, linkedin, github, usuarioId) {
        this.id = id;
        this.img_funcionario = img_funcionario;
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
        this.usuarioId = usuarioId;
        this.vendas = [];
    }
}

export default Funcionario;