import Venda from "./Venda";

interface Regiao {
    id: number;
    picture: string;
    nome: string;
    descricao: string;
    endereco: string;
    cidade: string;
    usuarioId: number;
    vendas: Venda[];
}

export default Regiao;  