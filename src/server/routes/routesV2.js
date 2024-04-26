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
        "clientes": "45",
        "vendas": "4000",
        "faturamento": "4100"
    },
    {
        "picture": "./img/Pdois.jpg",
        "nome": "Pedro II",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Pedro II",
        "clientes": "40",
        "vendas": "3900",
        "faturamento": "4024"
    },
    {
        "picture": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Letrarias_de_Capit%C3%A3o_de_Campos.JPG",
        "nome": "Capitão de Campos",
        "endereço": "",
        "descrição": "",
        "cidade": "Capitao de Campos",
        "clientes": "15",
        "vendas": "1050",
        "faturamento": "2010"
    },
    {
        "picture": "https://revistaaz.com.br/wp-content/uploads/2023/11/praca-batalha-revistaaz.jpeg",
        "nome": "Batalha",
        "endereco": "",
        "descricao": "",
        "cidade": "Batalha",
        "clientes": "30",
        "vendas": "2438",
        "faturamento": "2400"
    },
    {
        "picture": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fsiteantigo.pi.gov.br%2Fmateria%2Fconheca-o-piaui%2Fpiracuruca-e-o-municipio-com-a-maior-parte-do-parque-nacional-de-sete-cidades-591.html&psig=AOvVaw0UEbvkNWDSI3H0rqNCCCr3&ust=1714186497574000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDB37vw3oUDFQAAAAAdAAAAABAE",
        "nome": "Piracuruca",
        "endereço": "Rua das Oliveiras, Bairro saci perere",
        "descrição": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Piracuruca",
        "clientes": "16",
        "vendas": "2230",
        "faturamento": "2000"
    },
    {
        "picture": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3DcCxetzj2aWQ&psig=AOvVaw2XGqVfZL2tcSO-maHrtLVi&ust=1714186263603000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDNrMzv3oUDFQAAAAAdAAAAABAK",
        "nome": "Barras",
        "endereço": "",
        "descrição": "",
        "cidade": "Barras",
        "clientes": "20",
        "vendas": "2000",
        "faturamento": "2400"
    }
]

let despesaFalsos = [
    {
        "tipo": "Salario",
        "nome": "Salario dos funcionários",
        "valor": 1500,
        "descricao": "Pagar todos os funcionários"
    },
    {
        "tipo": "Aluguel",
        "nome": "Filial Pedro II",
        "valor": 500,
        "descricao": "Pagar o aluguel do dia 10/04"
    },
    {
        "tipo": "Fornecedor",
        "nome": "Pagar a Fábrica Maxbono",
        "valor": 10000,
        "descricao": "Pagar o Fornecedor"
    },
    {
        "tipo": "Manutencao",
        "nome": "Gasolina",
        "valor": 1440,
        "descricao": "Abastecer veículo em todas as viagens feitas"
    }
]

let funcionarioFalsos = [
    {
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_dfba6f2477bfa42be69ddfdffbd421d3943d20bf.1920x1080.jpg?t=1700663145",
        email: "pedrolucaspir595@gmail.com",
        cpf: "075.028.653-90",
        github: "",
        linkedin: "",
        nome: "Pedro Lucas",
        phone: "86995120533",
        age: 19,
        endereco: "Piripiri - PI",
        genero: "Masculino",
        form_academ: "Ensino Superior Incompleto",
        data_contratacao: "20/12/2021",
        cargo: "Vendedor",
        descricao: "Sem descrição",
        vendas: 20000,
        faturamento: 9000,
        regions: {
            create: [
                {
                    nome: "Barras"
                },
                {
                    nome: "Piripiri"
                },
                {
                    nome: "Piracuruca"
                }
            ]
        }
    },
    {
        picture: "./img/Laesse.jpeg",
        email: "Laessethe@gmail.com",
        cpf: "004.370.073-08",
        github: "",
        linkedin: "",
        nome: "Laesse",
        phone: "86999241727",
        age: 48,
        endereco: "Pedro II - PI",
        genero: "Masculino",
        form_academ: "Ensino Médio completo",
        data_contratacao: "21/03/2020",
        cargo: "CEO",
        descricao: "Sem descrição",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Pedro II"
                },
            ]
        }
    },
    {
        picture: "./img/Romario.jpeg",
        email: "Romario1508@gmail.com",
        cpf: "430.458.078-50",
        github: "",
        linkedin: "",
        nome: "Romário",
        phone: "11987394240",
        age: 30,
        endereco: "Pedro II - PI",
        genero: "Masculino",
        form_academ: "Ensino Médio completo",
        data_contratacao: "02/10/2023",
        cargo: "Vendedor",
        descricao: "Sem descrição",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Capitão de Campos"
                }
            ]
        }
    },
    {
        picture: "./img/Welignton.jpeg",
        email: "Welignton@gmail.com",
        cpf: "086.564.08-80",
        github: "",
        linkedin: "",
        nome: "Welingnton",
        phone: "86999174398",
        age: 48,
        endereco: "Piripiri - PI",
        genero: "Masculino",
        form_academ: "Ensino Médio completo",
        data_contratacao: "24/11/2020",
        cargo: "Vendedor",
        descricao: "Sem descrição",
        vendas: 0,
        faturamento: 0,
        regions: {
            create: [
                {
                    nome: "Batalha"
                }
            ]
        }
    },
    {
        picture: "https://media.licdn.com/dms/image/D4D03AQEDRhKeXOMUhQ/profile-displayphoto-shrink_200_200/0/1698698919930?e=1719446400&v=beta&t=7WTQ6oXr6343V7pezZGnmG8d_NsUmtKe8zewZ3ecSM4",
        email: "liedson.b9@gmail.com",
        cpf: "106.466.763-50",
        github: "https://github.com/LiedsonLB",
        linkedin: "https://www.linkedin.com/in/liedsonlb/",
        nome: "Liedson Barros",
        phone: "+5586998635571",
        age: 20,
        endereco: "Piripiri-PI",
        genero: "Masculino",
        form_academ: "Bacharelado ciência da computação",
        cargo: "Desenvolvedor",
        data_contratacao: "16/06/2011",
        descricao: "Meu nome é Liédson, sou de Piripiri-PI, e atualmente estou cursando Ciência da Computação na Universidade Estadual do Piauí (UESPI). Sou um desenvolvedor de software altamente motivado, apaixonado por desafios que testam constantemente meus conhecimentos. Minha paixão pela computação reflete-se na minha capacidade de assimilar rapidamente novos conhecimentos, aprimorando minhas habilidades no meio tecnológico e empresarial. Minhas capacidades sólidas vão além do desenvolvimento de softwares; sou versátil e confiante em minha capacidade, me adaptar a qualquer tipo de tecnologia é uma tarefa fácil.  ",
        vendas: 2000,
        faturamento: 40000,
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

// Rota para excluir um produto
routerV2.delete("/produtos/:id", async (req, res) => {
    try {
        const produtoId = req.params.id;

        // Encontrar o índice do funcionário pelo ID
        const produtoIndex = produtosFalsos.findIndex(produto => produto.nome === produtoId);

        if (produtoIndex !== -1) {
            // Remover o funcionário do array
            produtosFalsos.splice(produtoIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Funcionário não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Erro ao excluir funcionário' });
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

// Rota para editar um funcionário
routerV2.put("/funcionarios/:id", async (req, res) => {
    try {
        const funcionarioId = req.params.id;
        const novoDadosFuncionario = req.body;

        // Encontrar o funcionário pelo ID
        const funcionarioIndex = funcionarioFalsos.findIndex(funcionario => funcionario.email === funcionarioId);

        if (funcionarioIndex !== -1) {
            // Atualizar os dados do funcionário
            funcionarioFalsos[funcionarioIndex] = { ...funcionarioFalsos[funcionarioIndex], ...novoDadosFuncionario };
            res.status(200).json(funcionarioFalsos[funcionarioIndex]);
        } else {
            res.status(404).json({ error: "Funcionário não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao editar funcionário:', error);
        res.status(500).json({ error: 'Erro ao editar funcionário' });
    }
});

// Rota para excluir um funcionário
routerV2.delete("/funcionarios/:id", async (req, res) => {
    try {
        const funcionarioId = req.params.id;

        // Encontrar o índice do funcionário pelo ID
        const funcionarioIndex = funcionarioFalsos.findIndex(funcionario => funcionario.email === funcionarioId);

        if (funcionarioIndex !== -1) {
            // Remover o funcionário do array
            funcionarioFalsos.splice(funcionarioIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Funcionário não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Erro ao excluir funcionário' });
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