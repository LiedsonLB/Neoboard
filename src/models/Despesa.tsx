interface Despesa {
    id: number;
    nome: string;
    data: Date;
    tipo: string;
    valor: number;
    usuarioId: number;
    status: 'Pendente' | 'Pago' | 'Atrasado';
}

export default Despesa;