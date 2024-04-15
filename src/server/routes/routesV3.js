import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV3 = express.Router();

// Rota para adicionar um novo funcionário
routerV3.post("/funcionarios", async (req, res) => {
  try {
    const novoFuncionarioData = req.body;
    const novoFuncionario = await prisma.funcionario.create({
      data: novoFuncionarioData,
    });
    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error('Erro ao adicionar funcionário:', error);
    res.status(500).json({ error: 'Erro ao adicionar funcionário' });
  }
});

// Rota para obter todos os funcionários
routerV3.get("/funcionarios", async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: {
        usuario: true,
        vendas: true,
      },
    });
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
    const novoProduto = await prisma.produto.create({
      data: novoProdutoData,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

// Rota para obter todos os produtos
routerV3.get("/produtos", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        usuario: true,
        itensVenda: true,
      },
    });
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

export default routerV3;