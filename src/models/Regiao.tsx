import Venda from "./Venda";

interface Regiao {
    id?: number;
    picture: string;
    NameImg: string;
    nome: string;
    descricao: string;
    endereco: string;
    cidade: string;
    faturamento: number;
    numVendas: number;
    usuarioId: number;
    vendas: Venda[];
}

export default Regiao;  