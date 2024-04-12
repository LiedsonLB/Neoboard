import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import Produto from '../../models/Produto.js';
import Venda from '../../models/Venda.js';
import Despesa from '../../models/Despesa.js';
import Funcionario from '../../models/Funcionario.js';
import ItemVenda from '../../models/ItemVenda.js';
import Regiao from '../../models/Regiao.js';
import Usuario from '../../models/User.js';

const prisma = new PrismaClient();
const routerV3 = express.Router();

// Função para criar uma nova venda
async function criarVenda(dadosDaVenda) {
    try {
        const novaVenda = await prisma.venda.create({
            data: dadosDaVenda,
        });
        return novaVenda;
    } catch (error) {
        throw new Error('Erro ao criar a venda: ' + error.message);
    }
}

// Função para adicionar um item de venda à venda
async function adicionarItemVenda(vendaId, dadosDoItem) {
    try {
        // Associe o item de venda à venda usando o ID da venda
        dadosDoItem.vendaId = vendaId;

        // Crie o item de venda
        await ItemVenda.create(dadosDoItem);
    } catch (error) {
        throw new Error('Erro ao adicionar o item de venda à venda: ' + error.message);
    }
}

const dadosDeTesteVenda = {
    data: new Date(),
    valor: 100.00,
    quantidadeProdutos: 2,
    comprador: "Cliente de Teste",
    regiaoId: 1, // Suponha que 1 é o ID da região
    formaPagamento: "Cartão de Crédito",
    usuarioId: 1, // Suponha que 1 é o ID do usuário que está realizando a venda
    itensVenda: [
        { produtoId: 1, quantidade: 1 }, // Suponha que 1 é o ID do produto e 1 é a quantidade vendida
        { produtoId: 2, quantidade: 1 }  // Suponha que 2 é o ID do produto e 1 é a quantidade vendida
    ]
};

// Para criar uma nova venda com os dados de teste
try {
    const novaVenda = await criarVenda(dadosDeTesteVenda);
    console.log('Venda criada com sucesso:', novaVenda);
} catch (error) {
    console.error('Erro ao criar a venda:', error.message);
}

// Endpoint para adicionar um novo produto
routerV3.post("/produtos", async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body); // Supondo que a função create esteja definida na classe Produto
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

// Endpoint para obter todos os produtos
routerV3.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.findAll(); // Supondo que a função findAll esteja definida na classe Produto
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

// Endpoint para adicionar uma nova venda
routerV3.post("/vendas", async (req, res) => {
  try {
    const novaVenda = await Venda.create(req.body); // Supondo que a função create esteja definida na classe Venda
    res.status(201).json(novaVenda);
  } catch (error) {
    console.error('Erro ao adicionar venda:', error);
    res.status(500).json({ error: 'Erro ao adicionar venda' });
  }
});

// Endpoint para obter todas as vendas
routerV3.get("/vendas", async (req, res) => {
  try {
    const vendas = await Venda.findAll(); // Supondo que a função findAll esteja definida na classe Venda
    res.status(200).json(vendas);
  } catch (error) {
    console.error('Erro ao obter vendas:', error);
    res.status(500).json({ error: 'Erro ao obter vendas' });
  }
});

// Endpoint para adicionar uma nova despesa
routerV3.post("/despesas", async (req, res) => {
  try {
    const novaDespesa = await Despesa.create(req.body); // Supondo que a função create esteja definida na classe Despesa
    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    res.status(500).json({ error: 'Erro ao adicionar despesa' });
  }
});

// Endpoint para obter todas as despesas
routerV3.get("/despesas", async (req, res) => {
  try {
    const despesas = await Despesa.findAll(); // Supondo que a função findAll esteja definida na classe Despesa
    res.status(200).json(despesas);
  } catch (error) {
    console.error('Erro ao obter despesas:', error);
    res.status(500).json({ error: 'Erro ao obter despesas' });
  }
});

// Endpoint para adicionar um novo funcionário
routerV3.post("/funcionarios", async (req, res) => {
  try {
    const novoFuncionario = await Funcionario.create(req.body); // Supondo que a função create esteja definida na classe Funcionario
    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error('Erro ao adicionar funcionário:', error);
    res.status(500).json({ error: 'Erro ao adicionar funcionário' });
  }
});

// Endpoint para obter todos os funcionários
routerV3.get("/funcionarios", async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll(); // Supondo que a função findAll esteja definida na classe Funcionario
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error('Erro ao obter funcionários:', error);
    res.status(500).json({ error: 'Erro ao obter funcionários' });
  }
});

// Endpoint para adicionar uma nova região
routerV3.post("/regioes", async (req, res) => {
  try {
    const novaRegiao = await Regiao.create(req.body); // Supondo que a função create esteja definida na classe Regiao
    res.status(201).json(novaRegiao);
  } catch (error) {
    console.error('Erro ao adicionar região:', error);
    res.status(500).json({ error: 'Erro ao adicionar região' });
  }
});

// Endpoint para obter todas as regiões
routerV3.get("/regioes", async (req, res) => {
  try {
    const regioes = await Regiao.findAll(); // Supondo que a função findAll esteja definida na classe Regiao
    res.status(200).json(regioes);
  } catch (error) {
    console.error('Erro ao obter regiões:', error);
    res.status(500).json({ error: 'Erro ao obter regiões' });
  }
});

// Endpoint para adicionar um novo usuário
routerV3.post("/usuarios", async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body); // Supondo que a função create esteja definida na classe Usuario
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

// Endpoint para obter todos os usuários
routerV3.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Supondo que a função findAll esteja definida na classe Usuario
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
});

export default routerV3;
