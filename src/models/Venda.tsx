interface Venda {
    id: number;
    data: Date;
    funcionario: string;
    valor: number;
    quantidadeProdutos: number;
    comprador: string;
    regiao: string;
    formaPagamento: string;
    usuarioId: number;
}

export default Venda;  