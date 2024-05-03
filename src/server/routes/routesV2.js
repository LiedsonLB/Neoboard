import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV2 = express.Router();

// Array de produtos falsos inicialmente vazio
let produtosFalsos = [
    {
        "id": "54892675",
        "nome": "Picolé sem cobertura",
        "picture": "./img/Picole_sem_cobertura.jpeg",
        "preco": "0.65",
        "categoria": "Picolé",
        "descricao": "picole muito very gostosinho"
    },
    {
        "id": "71034829",
        "nome": "Picolé de cobertura",
        "picture": "/img/Picole_com_cobertura.jpeg",
        "preco": "2.00",
        "categoria": "Picolé",
        "descricao": "picole muito very gostosinho"
    },
    {
        "id": "23589104",
        "nome": "Açaí de 200ml",
        "picture": "/img/Acaí_200ml.jpeg",
        "preco": "6.00",
        "categoria": "Açaí",
        "descricao": "picole muito very gostosinho"
    },
    {
        "id": "61742983",
        "nome": "Sorvete de 1L",
        "picture": "/img/Sorvete_1L.jpeg",
        "preco": "12.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    },
    {
        "id": "89051732",
        "nome": "Sorvete de 1.5L",
        "picture": "/img/Sorvete_1.5L.jpeg",
        "preco": "15.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    },
    {
        "id": "98765432",
        "nome": "Sorvete de 2L",
        "picture": "img/Sorvete_2L.jpeg",
        "preco": "18.00",
        "categoria": "Sorvete",
        "descricao": "picole muito very gostosinho"
    }
];

let regiaoFalsos = [
    {
        "id": "1",
        "picture": "./img/Piripiri-Igreja-Matriz.png",
        "nome": "Piripiri",
        "endereco": "Rua das Oliveiras, Bairro saci perere",
        "descricao": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Piripiri",
        "responsavel": "Pedro Lucas",
        "clientes": "45",
        "vendas": "4000",
        "faturamento": "4100"
    },
    {
        "id": "2",
        "picture": "./img/Pdois.jpg",
        "nome": "Pedro II",
        "endereco": "Rua das Oliveiras, Bairro saci perere",
        "descricao": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Pedro II",
        "responsavel": "",
        "clientes": "40",
        "vendas": "3900",
        "faturamento": "4024"
    },
    {
        "id": "3",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Letrarias_de_Capit%C3%A3o_de_Campos.JPG",
        "nome": "Capitão de Campos",
        "endereco": "",
        "descricao": "",
        "cidade": "Capitao de Campos",
        "responsavel": "",
        "clientes": "15",
        "vendas": "1050",
        "faturamento": "2010"
    },
    {
        "id": "4",
        "picture": "https://revistaaz.com.br/wp-content/uploads/2023/11/praca-batalha-revistaaz.jpeg",
        "nome": "Batalha",
        "endereco": "",
        "descricao": "",
        "cidade": "Batalha",
        "responsavel": "",
        "clientes": "30",
        "vendas": "2438",
        "faturamento": "2400"
    },
    {
        "id": "5",
        "picture": "https://piracuruca.pi.gov.br/uploads/noticias/210.jpg",
        "nome": "Piracuruca",
        "endereco": "Rua das Oliveiras, Bairro saci perere",
        "descricao": "uma cidadezinha bem bonitinha com buraquinhos",
        "cidade": "Piracuruca",
        "responsavel": "",
        "clientes": "16",
        "vendas": "2230",
        "faturamento": "2000"
    },
    {
        "id": "6",
        "picture": "https://i.ytimg.com/vi/mbL0lqrbmb8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWChQMA8=&rs=AOn4CLArrdgtLutLCClZIndxT532TY6FYA",
        "nome": "Barras",
        "endereco": "",
        "descricao": "",
        "cidade": "Barras",
        "responsavel": "",
        "clientes": "20",
        "vendas": "2000",
        "faturamento": "2400"
    }
]

let despesaFalsos = [
    {
        "id": "1",
        "tipo": "Salario",
        "nome": "Salario dos funcionários",
        "valor": 1500,
        "descricao": "Pagar todos os funcionários"
    },
    {
        "id": "2",
        "tipo": "Aluguel",
        "nome": "Filial Pedro II",
        "valor": 500,
        "descricao": "Pagar o aluguel do dia 10/04"
    },
    {
        "id": "3",
        "tipo": "Fornecedor",
        "nome": "Pagar a Fábrica Maxbono",
        "valor": 10000,
        "descricao": "Pagar o Fornecedor"
    },
    {
        "id": "4",
        "tipo": "Manutencao",
        "nome": "Gasolina",
        "valor": 1440,
        "descricao": "Abastecer veículo em todas as viagens feitas"
    }
]

let funcionarioFalsos = [
    {
        id: "1",
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
        id: "2",
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
        descricao: "Sem descricao",
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
        id: "3",
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
        descricao: "Sem descricao",
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
        id: "4",
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
        descricao: "Sem descricao",
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
        id: "5",
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
// Rota para obter um único produto
routerV2.get("/produtos/:id", async (req, res) => {
    try {
        const produtoId = req.params.id;

        // Encontrar o produto pelo ID
        const produto = produtosFalsos.find(produto => produto.id === produtoId);

        if (produto) {
            // Se o produto for encontrado, retorná-lo
            res.status(200).json(produto);
        } else {
            // Se o produto não for encontrado, retornar uma mensagem de erro
            res.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao obter produto:', error);
        res.status(500).json({ error: 'Erro ao obter produto' });
    }
});


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

        // Encontrar o índice do produto pelo ID
        const produtoIndex = produtosFalsos.findIndex(produto => produto.id === produtoId);

        if (produtoIndex !== -1) {
            // Remover o produto do array
            produtosFalsos.splice(produtoIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
});

// Rota para editar um produto
routerV2.put("/produtos/:id", async (req, res) => {
    try {
        const produtoId = req.params.id;
        const novosDadosProduto = req.body;

        // Encontrar o produto pelo ID
        const produtoIndex = produtosFalsos.findIndex(produto => produto.id === produtoId);

        if (produtoIndex !== -1) {
            // Atualizar os dados do produto
            produtosFalsos[produtoIndex] = { ...produtosFalsos[produtoIndex], ...novosDadosProduto };
            res.status(200).json(produtosFalsos[produtoIndex]);
        } else {
            res.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).json({ error: 'Erro ao editar produto' });
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

// Rota para editar um regiao
routerV2.put("/regioes/:id", async (req, res) => {
    try {
        const regiaoId = req.params.id;
        const novosDadosregiao = req.body;

        // Encontrar o regiao pelo ID
        const regiaoIndex = regiaoFalsos.findIndex(regiao => regiao.id === regiaoId);

        if (regiaoIndex !== -1) {
            // Atualizar os dados do regiao
            regiaoFalsos[regiaoIndex] = { ...regiaoFalsos[regiaoIndex], ...novosDadosregiao };
            res.status(200).json(regiaoFalsos[regiaoIndex]);
        } else {
            res.status(404).json({ error: "regiao não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao editar regiao:', error);
        res.status(500).json({ error: 'Erro ao editar regiao' });
    }
});

// Rota para excluir um região
routerV2.delete("/regioes/:id", async (req, res) => {
    try {
        const regiaoId = req.params.id;

        // Encontrar o índice do região pelo ID
        const regiaoIndex = regiaoFalsos.findIndex(regiao => regiao.id === regiaoId);

        if (regiaoIndex !== -1) {
            // Remover o região do array
            regiaoFalsos.splice(regiaoIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Região não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir região:', error);
        res.status(500).json({ error: 'Erro ao excluir região' });
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

// Rota para excluir um despesa
routerV2.delete("/despesas/:id", async (req, res) => {
    try {
        const despesaId = req.params.id;

        // Encontrar o índice do despesa pelo ID
        const despesaIndex = despesaFalsos.findIndex(despesa => despesa.nome === despesaId);

        if (despesaIndex !== -1) {
            // Remover o despesa do array
            despesaFalsos.splice(despesaIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "despesa não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ error: 'Erro ao excluir despesa' });
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