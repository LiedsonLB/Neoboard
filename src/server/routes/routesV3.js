import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV3 = express.Router();

// Rota para adicionar um novo produto
routerV3.post("/produtos", async (req, res) => {
  try {
    const novoProduto = await prisma.produto.create({
      data: req.body,
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
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

routerV3.post('/vendas', async (req, res) => {
  try {
    // Verifique se os dados necessários foram enviados no corpo da requisição
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Itere sobre os dados recebidos e salve cada venda no banco de dados
    const vendasSalvas = [];
    for (const vendaData of req.body) {
      console.log('Dados da venda:', vendaData);
      const novaVenda = await prisma.venda.create({
        data: {
          data: vendaData.data,
          funcionario: vendaData.funcionario,
          valor: vendaData.valor,
          quantidadeProdutos: vendaData.quantidadeProdutos,
          comprador: vendaData.comprador,
          regiao: vendaData.regiao,
          formaPagamento: vendaData.formaPagamento,
          usuario: vendaData.usuario,
        },
      });
      console.log('Venda criada:', novaVenda);

      vendasSalvas.push(novaVenda);
      console.log('vendas salvas: ', vendasSalvas.length);
    }

    res.status(201).json(vendasSalvas);
  } catch (error) {
    console.error('Erro ao salvar as vendas:', error);
    res.status(500).json({ error: 'Erro ao salvar as vendas' });
  }
});

// Rota para obter todas as vendas
routerV3.get("/vendas", async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany();
    res.status(200).json(vendas);
  } catch (error) {
    console.error('Erro ao obter vendas:', error);
    res.status(500).json({ error: 'Erro ao obter vendas' });
  }
});

// Rota para adicionar uma nova despesa
routerV3.post("/despesas", async (req, res) => {
  try {
    const novaDespesa = await prisma.despesa.create({
      data: req.body,
    });
    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    res.status(500).json({ error: 'Erro ao adicionar despesa' });
  }
});

// Rota para obter todas as despesas
routerV3.get("/despesas", async (req, res) => {
  try {
    const despesas = await prisma.despesa.findMany();
    res.status(200).json(despesas);
  } catch (error) {
    console.error('Erro ao obter despesas:', error);
    res.status(500).json({ error: 'Erro ao obter despesas' });
  }
});

// Rota para adicionar um novo funcionário
routerV3.post("/funcionarios", async (req, res) => {
  try {
    const novoFuncionario = await prisma.funcionario.create({
      data: req.body,
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
    const funcionarios = await prisma.funcionario.findMany();
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error('Erro ao obter funcionários:', error);
    res.status(500).json({ error: 'Erro ao obter funcionários' });
  }
});

// Rota para adicionar uma nova região
routerV3.post("/regioes", async (req, res) => {
  try {
    const novaRegiao = await prisma.regiao.create({
      data: req.body,
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
    const regioes = await prisma.regiao.findMany();
    res.status(200).json(regioes);
  } catch (error) {
    console.error('Erro ao obter regiões:', error);
    res.status(500).json({ error: 'Erro ao obter regiões' });
  }
});

// Rota para adicionar um novo usuário
routerV3.post("/usuarios", async (req, res) => {
  try {
    const novoUsuario = await prisma.usuario.create({
      data: req.body,
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

// Rota para obter todos os usuários
routerV3.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
});

export default routerV3;