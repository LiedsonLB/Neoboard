import Venda from "./Venda";

interface Funcionario {
    id?: number;
    picture: string;
    nameImg: string;
    nome: string;
    cargo: string;
    email: string;
    descricao?: string;
    localAtuacao?: string;
    genero: string;
    cpf: string;
    dataContratacao?: string;
    dataNascimento?: string;
    telefone?: string;
    linkedin?: string;
    github?: string;
    formacao?: string;
    faturamento: number;
    numVendas: number;
    usuarioId: string;  
}

export default Funcionario;
