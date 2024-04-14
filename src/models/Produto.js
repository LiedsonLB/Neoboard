class Produto {
    constructor(id, picture, nome, descricao, categoria, preco, usuario, itensVenda) {
        this.id = id;
        this.picture = picture;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.usuario = usuario;
        this.itensVenda = itensVenda || [];
    }
}

export default Produto;