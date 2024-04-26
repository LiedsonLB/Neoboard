import express from 'express';
import { PrismaClient } from '@prisma/client';
import Funcionario from '../../models/Funcionario.js';

const prisma = new PrismaClient();
const routerV2 = express.Router();

// Array de produtos falsos inicialmente vazio
let produtosFalsos = [
    {
        "nome": "Picolé sem cobertura",
        "picture": "./img/Picole_sem_cobertura.jpeg",
        "preco": "0.65",
        "categoria": "Picolé",
        "descricao": "picole muito very gostosinho"
    },
    {
        "nome": "Picolé de cobertura",
        "picture": "/img/Picole_com_cobertura.jpeg",
        "preco": "2.00",
        "categoria": "Picolé",
        "descricao": "picole muito very gostosinho"
    },
    {
        "nome": "Açaí de 200ml",
        "picture": "/img/Acaí_200ml.jpeg",
        "preco": "6.00",
        "categoria": "Açaí",
        "descricao": "picole muito very gostosinho"
    },
    {
        "nome": "Sorvete de 1L",
        "picture": "/img/Sorvete_1L.jpeg",
        "preco": "12.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    },
    {
        "nome": "Sorvete de 1.5L",
        "picture": "/img/Sorvete_1.5L.jpeg",
        "preco": "15.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    },
    {
        "nome": "Sorvete de 2L",
        "picture": "img/Sorvete_2L.jpeg",
        "preco": "18.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    }
];

let regiaoFalsos = [
    {
        "picture": "./img/Piripiri-Igreja-Matriz.png",
        "nome": "Piripiri",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Piripiri",
        "clientes": "30K",
        "vendas": "4908",
        "faturamento": "233K"
    },
    {
        "picture": "./img/Pdois.jpg",
        "nome": "Pedro II",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Pedro II",
        "clientes": "30K",
        "vendas": "4908",
        "faturamento": "233K"
    },
    {
        "picture": "./img/no_regionImg.jpeg",
        "nome": "Capitão de Campos",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Capitao de Campos",
        "clientes": "30K",
        "vendas": "4908",
        "faturamento": "233K"
    },
    {
        "picture": "https://catracalivre.com.br/wp-content/uploads/2018/10/japao-dicas-passeios-gratuitos-910x607.jpg",
        "nome": "Japão",
        "endereco": "Rua das Oliveiras, Bairro saci perere",
        "descricao": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Exterior",
        "clientes": "30K",
        "vendas": "4908",
        "faturamento": "233K"
    },
    {
        "picture": "https://singletrips.com.br/wp-content/uploads/2019/07/Suica_.jpg",
        "nome": "Suiça",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Exterior",
        "clientes": "30K",
        "vendas": "4908",
        "faturamento": "233K"
    }
]

let despesaFalsos = [
    {
        "tipo": "Salario",
        "nome": "Salario do LB",
        "valor": 1000000,
        "descricao": "pagar o LB"
    },
    {
        "tipo": "Aluguel",
        "nome": "filial Pedro II",
        "valor": 1200,
        "descricao": "pagar o aluguel do dia 30/04"
    },
    {
        "tipo": "Fornecedor",
        "nome": "pagar a max bono",
        "valor": 3440,
        "descricao": "pagar o fornecedor até proxima semana"
    },
    {
        "tipo": "Imposto",
        "nome": "Imposto de Picolé",
        "valor": 300,
        "descricao": "pagar o imposto da entrega da carga de picolé"
    },
    {
        "tipo": "Manutencao",
        "nome": "gasolina",
        "valor": 100,
        "descricao": "abastecer veiculo proxima viagem para Pedro II"
    }
]

let funcionarioFalsos = [
    {
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_dfba6f2477bfa42be69ddfdffbd421d3943d20bf.1920x1080.jpg?t=1700663145",
        email: "pedro@gmail.com",
        cpf: "123.456.789-10",
        nome: "Pedro Lucas",
        phone: "40028922",
        age: 48,
        endereco: "Meio do Mato - PI",
        genero: "Masculino",
        form_academ: "Licenciatura Matemática",
        data_contratacao: "24/08/2009",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Pedro II"
                },
                {
                    nome: "Piripiri"
                }
            ]
        }
    },
    {
        picture: "./img/Laesse.jpeg",
        email: "Laesse@gmail.com",
        cpf: "123.456.789-10",
        nome: "Laesse",
        phone: "40028922",
        age: 48,
        endereco: "Meio do Mato - PI",
        genero: "Masculino",
        form_academ: "Licenciatura Matemática",
        data_contratacao: "24/08/2009",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Pedro II"
                },
                {
                    nome: "Piripiri"
                }
            ]
        }
    },
    {
        picture: "./img/Romario.jpeg",
        email: "Romário@gmail.com",
        cpf: "123.456.789-10",
        nome: "Romário",
        phone: "40028922",
        age: 48,
        endereco: "Meio do Mato - PI",
        genero: "Masculino",
        form_academ: "Licenciatura Matemática",
        data_contratacao: "24/08/2009",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Pedro II"
                },
                {
                    nome: "Piripiri"
                }
            ]
        }
    },
    {
        picture: "./img/Welignton.jpeg",
        email: "Welignton@gmail.com",
        cpf: "123.456.789-10",
        nome: "Welignton",
        phone: "40028922",
        age: 48,
        endereco: "Meio do Mato - PI",
        genero: "Masculino",
        form_academ: "Licenciatura Matemática",
        data_contratacao: "24/08/2009",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Pedro II"
                },
                {
                    nome: "Piripiri"
                }
            ]
        }
    }
]

let vendaFalsos = [
    {
        "tipo": "tipo1",
        "nome": "nome",
        "valor": 100,
        "descricao": "pagar o cachorro"
    },
]

// routerV2.post("/funcionarios", async (req, res) => {
//     try {
//         const novoFuncionarioData = req.body;

//         // Cria uma nova instância da classe Funcionario com os dados recebidos
//         const novoFuncionario = new Funcionario(
//             novoFuncionarioData.id,
//             novoFuncionarioData.picture,
//             novoFuncionarioData.nome,
//             novoFuncionarioData.email,
//             novoFuncionarioData.descricao,
//             novoFuncionarioData.endereco,
//             novoFuncionarioData.localAtuacao,
//             novoFuncionarioData.genero,
//             novoFuncionarioData.cpf,
//             novoFuncionarioData.dataContratacao,
//             novoFuncionarioData.telefone,
//             novoFuncionarioData.formacaoAcademica,
//             novoFuncionarioData.linkedin,
//             novoFuncionarioData.github,
//             // Você pode precisar fornecer o ID do usuário associado e as vendas aqui, dependendo da estrutura do seu banco de dados
//             // novoFuncionarioData.usuario,
//             // novoFuncionarioData.vendas
//         );

//         // Cria um novo funcionário no banco de dados usando o Prisma Client
//         const novoFuncionarioPrisma = await prisma.funcionario.create({
//             data: {
//                 id: novoFuncionario.id,
//                 picture: novoFuncionario.picture,
//                 nome: novoFuncionario.nome,
//                 email: novoFuncionario.email,
//                 descricao: novoFuncionario.descricao,
//                 endereco: novoFuncionario.endereco,
//                 localAtuacao: novoFuncionario.localAtuacao,
//                 genero: novoFuncionario.genero,
//                 cpf: novoFuncionario.cpf,
//                 dataContratacao: novoFuncionario.dataContratacao,
//                 telefone: novoFuncionario.telefone,
//                 formacaoAcademica: novoFuncionario.formacaoAcademica,
//                 linkedin: novoFuncionario.linkedin,
//                 github: novoFuncionario.github,
//                 usuario: novoFuncionario.usuario,
//                 vendas: novoFuncionario.vendas
//             }
//         });

//         res.status(201).json(novoFuncionarioPrisma);
//     } catch (error) {
//         console.error('Erro ao adicionar funcionário:', error);
//         res.status(500).json({ error: 'Erro ao adicionar funcionário' });
//     }
// });

// Rota para obter todos os funcionários
// routerV2.get("/funcionarios", async (req, res) => {
//     try {
//         const funcionarios = await prisma.funcionario.findMany();
//         res.status(200).json(funcionarios);
//     } catch (error) {
//         console.error('Erro ao obter funcionários:', error);
//         res.status(500).json({ error: 'Erro ao obter funcionários' });
//     }
// });

// Endpoints para Produtos

// Rota para adicionar um novo produto
routerV2.post("/produtos", async (req, res) => {
    try {
        const novoProdutoData = req.body;
        // Adiciona o novo produto ao array de produtos falsos
        produtosFalsos.push(novoProdutoData);
        res.status(201).json(novoProdutoData);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});

// Rota para obter todos os produtos
routerV2.get("/produtos", async (req, res) => {
    try {
        // Retorna o array de produtos falsos
        res.status(200).json(produtosFalsos);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
});

// Rota para adicionar uma nova região
routerV2.post("/regioes", async (req, res) => {
    try {
        const novoRegiaoData = req.body;
        // Adiciona o novo regiao ao array de regiao falsos
        regiaoFalsos.push(novoRegiaoData);
        res.status(201).json(novoRegiaoData);
    } catch (error) {
        console.error('Erro ao adicionar regiao:', error);
        res.status(500).json({ error: 'Erro ao adicionar regiao' });
    }
});

// Rota para obter todos os regiao
routerV2.get("/regioes", async (req, res) => {
    try {
        // Retorna o array de regiao falsos
        res.status(200).json(regiaoFalsos);
    } catch (error) {
        console.error('Erro ao obter regiao:', error);
        res.status(500).json({ error: 'Erro ao obter regiao' });
    }
});

// Rota para adicionar uma nova despesa
routerV2.post("/despesas", async (req, res) => {
    try {
        const novaDespesaData = req.body;
        // Adiciona o nova despesa ao array de despesa falsos
        despesaFalsos.push(novaDespesaData);
        res.status(201).json(novaDespesaData);
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
        res.status(500).json({ error: 'Erro ao adicionar despesa' });
    }
});

// Rota para obter todos os despesa
routerV2.get("/despesas", async (req, res) => {
    try {
        // Retorna o array de despesa falsos
        res.status(200).json(despesaFalsos);
    } catch (error) {
        console.error('Erro ao obter despesa:', error);
        res.status(500).json({ error: 'Erro ao obter despesa' });
    }
});

// Rota para adicionar um novo funcionario
routerV2.post("/funcionarios", async (req, res) => {
    try {
        const novaFuncionarioData = req.body;
        // Adiciona o nova funcionario ao array de funcionario falsos
        funcionarioFalsos.push(novaFuncionarioData);
        res.status(201).json(novaFuncionarioData);
    } catch (error) {
        console.error('Erro ao adicionar funcionario:', error);
        res.status(500).json({ error: 'Erro ao adicionar funcionario' });
    }
});

// Rota para obter todos os funcionario
routerV2.get("/funcionarios", async (req, res) => {
    try {
        // Retorna o array de funcionario falsos
        res.status(200).json(funcionarioFalsos);
    } catch (error) {
        console.error('Erro ao obter funcionario:', error);
        res.status(500).json({ error: 'Erro ao obter funcionario' });
    }
});

// Rota para adicionar uma nova venda
routerV2.post("/vendas", async (req, res) => {
    try {
        const novaVendaData = req.body;
        // Adiciona o nova venda ao array de venda falsos
        vendaFalsos.push(novaVendaData);
        res.status(201).json(novaVendaData);
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).json({ error: 'Erro ao adicionar venda' });
    }
});

// Rota para obter todos as vendas
routerV2.get("/vendas", async (req, res) => {
    try {
        // Retorna o array de venda falsos
        res.status(200).json(vendaFalsos);
    } catch (error) {
        console.error('Erro ao obter venda:', error);
        res.status(500).json({ error: 'Erro ao obter venda' });
    }
});

export default routerV2;