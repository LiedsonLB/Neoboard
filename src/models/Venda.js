class Venda {
    constructor(id, data, funcionario, itensVenda, valor, quantidadeProdutos, comprador, regiao, formaPagamento, usuario) {
        this.id = id;
        this.data = data;
        this.funcionario = funcionario;
        this.itensVenda = itensVenda || [];
        this.valor = valor;
        this.quantidadeProdutos = quantidadeProdutos;
        this.comprador = comprador;
        this.regiao = regiao;
        this.formaPagamento = formaPagamento;
        this.usuario = usuario;
    }
}

export default Venda;