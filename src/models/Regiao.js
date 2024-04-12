class Regiao {
    constructor(id, picture, nome, descricao, endereco, cidade, usuarios, vendas) {
        this.id = id;
        this.picture = picture;
        this.nome = nome;
        this.descricao = descricao;
        this.endereco = endereco;
        this.cidade = cidade;
        this.usuarios = usuarios || [];
        this.vendas = vendas || [];
    }
}

export default Regiao;