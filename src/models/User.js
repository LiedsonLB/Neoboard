class Usuario {
    constructor(id, nome, email, produtos, regioes, funcionarios, vendas, despesas) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.produtos = produtos || [];
        this.regioes = regioes || [];
        this.funcionarios = funcionarios || [];
        this.vendas = vendas || [];
        this.despesas = despesas || [];
    }
}

export default Usuario;  