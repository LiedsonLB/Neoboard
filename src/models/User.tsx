import Despesa from "./Despesa";
import Funcionario from "./Funcionario";
import Produto from "./Produto";
import Regiao from "./Regiao";
import Venda from "./Venda";

interface Usuario {
    id: number;
    nome: string;
    email: string;
    produtos: Produto[];
    regioes: Regiao[];
    funcionarios: Funcionario[];
    vendas: Venda[];
    despesas: Despesa[];
}

export default Usuario;  