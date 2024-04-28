import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV3 = express.Router();

// Rota para adicionar um novo produto
routerV3.post("/produtos", async (req, res) => {
    try {
        const novoProdutoData = req.body;
        const produto = await prisma.produto.create({ data: novoProdutoData });
        res.status(201).json(produto);
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

// Rota para excluir um produto
routerV3.delete("/produtos/:id", async (req, res) => {
    try {
        const produtoId = parseInt(req.params.id);
        await prisma.produto.delete({ where: { id: produtoId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
});

// Rota para editar um produto
routerV3.put("/produtos/:id", async (req, res) => {
    try {
        const produtoId = parseInt(req.params.id);
        const novosDadosProduto = req.body;
        const produto = await prisma.produto.update({
            where: { id: produtoId },
            data: novosDadosProduto
        });
        res.status(200).json(produto);
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).json({ error: 'Erro ao editar produto' });
    }
});

// Rota para adicionar uma nova região
routerV3.post("/regioes", async (req, res) => {
    try {
        const novaRegiaoData = req.body;
        const regiao = await prisma.regiao.create({ data: novaRegiaoData });
        res.status(201).json(regiao);
    } catch (error) {
        console.error('Erro ao adicionar regiao:', error);
        res.status(500).json({ error: 'Erro ao adicionar regiao' });
    }
});

// Rota para obter todos as regiões
routerV3.get("/regioes", async (req, res) => {
    try {
        const regioes = await prisma.regiao.findMany();
        res.status(200).json(regioes);
    } catch (error) {
        console.error('Erro ao obter regiões:', error);
        res.status(500).json({ error: 'Erro ao obter regiões' });
    }
});

// Rota para excluir uma região
routerV3.delete("/regioes/:id", async (req, res) => {
    try {
        const regiaoId = parseInt(req.params.id);
        await prisma.regiao.delete({ where: { id: regiaoId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir região:', error);
        res.status(500).json({ error: 'Erro ao excluir região' });
    }
});

// Rota para editar uma região
routerV3.put("/regioes/:id", async (req, res) => {
    try {
        const regiaoId = parseInt(req.params.id);
        const novosDadosRegiao = req.body;
        const regiao = await prisma.regiao.update({
            where: { id: regiaoId },
            data: novosDadosRegiao
        });
        res.status(200).json(regiao);
    } catch (error) {
        console.error('Erro ao editar região:', error);
        res.status(500).json({ error: 'Erro ao editar região' });
    }
});

// Rota para adicionar uma nova despesa
routerV3.post("/despesas", async (req, res) => {
    try {
        const novaDespesaData = req.body;
        const despesa = await prisma.despesa.create({ data: novaDespesaData });
        res.status(201).json(despesa);
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
        res.status(500).json({ error: 'Erro ao adicionar despesa' });
    }
});

// Rota para obter todos as despesas
routerV3.get("/despesas", async (req, res) => {
    try {
        const despesas = await prisma.despesa.findMany();
        res.status(200).json(despesas);
    } catch (error) {
        console.error('Erro ao obter despesas:', error);
        res.status(500).json({ error: 'Erro ao obter despesas' });
    }
});

// Rota para excluir uma despesa
routerV3.delete("/despesas/:id", async (req, res) => {
    try {
        const despesaId = parseInt(req.params.id);
        await prisma.despesa.delete({ where: { id: despesaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ error: 'Erro ao excluir despesa' });
    }
});

// Rota para adicionar um novo funcionário
routerV3.post("/funcionarios", async (req, res) => {
    try {
        const novoFuncionarioData = req.body;
        const funcionario = await prisma.funcionario.create({ data: novoFuncionarioData });
        res.status(201).json(funcionario);
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

// Rota para excluir um funcionário
routerV3.delete("/funcionarios/:id", async (req, res) => {
    try {
        const funcionarioId = parseInt(req.params.id);
        await prisma.funcionario.delete({ where: { id: funcionarioId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
});

// Rota para editar um funcionário
routerV3.put("/funcionarios/:id", async (req, res) => {
    try {
        const funcionarioId = parseInt(req.params.id);
        const novosDadosFuncionario = req.body;
        const funcionario = await prisma.funcionario.update({
            where: { id: funcionarioId },
            data: novosDadosFuncionario
        });
        res.status(200).json(funcionario);
    } catch (error) {
        console.error('Erro ao editar funcionário:', error);
        res.status(500).json({ error: 'Erro ao editar funcionário' });
    }
});

// Rota para adicionar uma nova venda
routerV3.post("/vendas", async (req, res) => {
    try {
        const novaVendaData = req.body;
        const venda = await prisma.venda.create({ data: novaVendaData });
        res.status(201).json(venda);
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).json({ error: 'Erro ao adicionar venda' });
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

// Rota para excluir uma venda
routerV3.delete("/vendas/:id", async (req, res) => {
    try {
        const vendaId = parseInt(req.params.id);
        await prisma.venda.delete({ where: { id: vendaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir venda:', error);
        res.status(500).json({ error: 'Erro ao excluir venda' });
    }
});

// Rota para editar uma venda
routerV3.put("/vendas/:id", async (req, res) => {
    try {
        const vendaId = parseInt(req.params.id);
        const novosDadosVenda = req.body;
        const venda = await prisma.venda.update({
            where: { id: vendaId },
            data: novosDadosVenda
        });
        res.status(200).json(venda);
    } catch (error) {
        console.error('Erro ao editar venda:', error);
        res.status(500).json({ error: 'Erro ao editar venda' });
    }
});

export default routerV3;