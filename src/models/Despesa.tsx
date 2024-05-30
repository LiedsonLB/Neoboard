interface Despesa {
    id?: number;
    nome: string;
    data: string;
    tipo: string;
    valor: number;
    descricao: string;
    status: string;
    usuarioId: string;
}

export default Despesa;