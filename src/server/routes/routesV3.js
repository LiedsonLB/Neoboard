import express from 'express';
import { PrismaClient } from '@prisma/client';
import Funcionario from '../../models/Funcionario.js';

const prisma = new PrismaClient();
const routerV3 = express.Router();

// Array de produtos falsos inicialmente vazio
let produtosFalsos = [
  {
    "nome": "Picolé sem cobertura",
    "imagem": "./img/Picole_sem_cobertura.jpeg",
    "preco": "0.65"
  },
  {
    "nome": "Picolé de cobertura",
    "imagem": "/img/Picole_com_cobertura.jpeg",
    "preco": "2.00"
  },
  {
    "nome": "Açaí de 200ml",
    "imagem": "/img/Acaí_200ml.jpeg",
    "preco": "6.00"
  },
  {
    "nome": "Sorvete de 1L",
    "imagem": "/img/Sorvete_1L.jpeg",
    "preco": "12.00"
  },
  {
    "nome": "Sorvete de 1.5L",
    "imagem": "/img/Sorvete_1.5L.jpeg",
    "preco": "15.00"
  },
  {
    "nome": "Sorvete de 2L",
    "imagem": "img/Sorvete_2L.jpeg",
    "preco": "18.00"
  }
];

routerV3.post("/funcionarios", async (req, res) => {
  try {
    const novoFuncionarioData = req.body;

    // Cria uma nova instância da classe Funcionario com os dados recebidos
    const novoFuncionario = new Funcionario(
      novoFuncionarioData.id,
      novoFuncionarioData.picture,
      novoFuncionarioData.nome,
      novoFuncionarioData.email,
      novoFuncionarioData.descricao,
      novoFuncionarioData.endereco,
      novoFuncionarioData.localAtuacao,
      novoFuncionarioData.genero,
      novoFuncionarioData.cpf,
      novoFuncionarioData.dataContratacao,
      novoFuncionarioData.telefone,
      novoFuncionarioData.formacaoAcademica,
      novoFuncionarioData.linkedin,
      novoFuncionarioData.github,
      // Você pode precisar fornecer o ID do usuário associado e as vendas aqui, dependendo da estrutura do seu banco de dados
      // novoFuncionarioData.usuario,
      // novoFuncionarioData.vendas
    );

    // Cria um novo funcionário no banco de dados usando o Prisma Client
    const novoFuncionarioPrisma = await prisma.funcionario.create({
      data: {
        id: novoFuncionario.id,
        picture: novoFuncionario.picture,
        nome: novoFuncionario.nome,
        email: novoFuncionario.email,
        descricao: novoFuncionario.descricao,
        endereco: novoFuncionario.endereco,
        localAtuacao: novoFuncionario.localAtuacao,
        genero: novoFuncionario.genero,
        cpf: novoFuncionario.cpf,
        dataContratacao: novoFuncionario.dataContratacao,
        telefone: novoFuncionario.telefone,
        formacaoAcademica: novoFuncionario.formacaoAcademica,
        linkedin: novoFuncionario.linkedin,
        github: novoFuncionario.github,
        usuario: novoFuncionario.usuario,
        vendas: novoFuncionario.vendas
      }
    });

    res.status(201).json(novoFuncionarioPrisma);
  } catch (error) {
    console.error('Erro ao adicionar funcionário:', error);
    res.status(500).json({ error: 'Erro ao adicionar funcionário' });
  }
});

// Rota para obter todos os funcionários
routerV3.get("/funcionarios", async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error('Erro ao obter funcionários:', error);
    res.status(500).json({ error: 'Erro ao obter funcionários' });
  }
});

// Endpoints para Regiões
// Rota para adicionar uma nova região
routerV3.post("/regioes", async (req, res) => {
  try {
    const novaRegiaoData = req.body;
    const novaRegiao = await prisma.regiao.create({
      data: novaRegiaoData,
    });
    res.status(201).json(novaRegiao);
  } catch (error) {
    console.error('Erro ao adicionar região:', error);
    res.status(500).json({ error: 'Erro ao adicionar região' });
  }
});

// Rota para obter todas as regiões
routerV3.get("/regioes", async (req, res) => {
  try {
    const regioes = await prisma.regiao.findMany({
      include: {
        usuarios: true,
        vendas: true,
      },
    });
    res.status(200).json(regioes);
  } catch (error) {
    console.error('Erro ao obter regiões:', error);
    res.status(500).json({ error: 'Erro ao obter regiões' });
  }
});

// Endpoints para Produtos

// Rota para adicionar um novo produto
routerV3.post("/produtos", async (req, res) => {
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
routerV3.get("/produtos", async (req, res) => {
  try {
    // Retorna o array de produtos falsos
    res.status(200).json(produtosFalsos);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

export default routerV3;