interface Despesa {
    id: number;
    nome: string;
    data: Date;
    tipo: string;
    valor: number;
    usuarioId: number;
}

export default Despesa;