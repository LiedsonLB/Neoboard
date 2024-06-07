// productController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addProduto(req, res) {
    try {
        const novoProdutoData = req.body;

        const produto = await prisma.produto.create({ data: novoProdutoData });
        res.status(201).json(produto);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
}

export async function getVenda(req, res) {
    try {
        const userId = req.query.userId;
        const vendas = await prisma.venda.findMany({
            where: {
                usuarioId: userId
            }
        });
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
};

export async function getInfoProduto(req, res) {
    const produtoId = parseInt(req.params.id);

    try {
        // Busca o produto no banco de dados usando o Prisma
        const produto = await prisma.produto.findUnique({
            where: {
                id: produtoId,
            },
        });

        // Verifica se o produto foi encontrado
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function deleteProduto(req, res) {
    try {
        const produtoId = parseInt(req.params.id);

        // Excluir todas as variações de preço relacionadas ao produto
        await prisma.variacaoPreco.deleteMany({
            where: {
                produtoId: produtoId
            }
        });

        // Em seguida, exclua o próprio produto
        await prisma.produto.delete({
            where: {
                id: produtoId
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
}

export async function editProduto(req, res) {
    try {
        const produtoId = parseInt(req.params.id);
        const { precoAtual, variacoesPreco, produtoExistente, ...novosDadosProduto } = req.body;
        let updateData = { ...novosDadosProduto };
        if (precoAtual !== produtoExistente.precoAtual) {
            const variacaoPreco = {
                produtoId: produtoId,
                data: new Date(),
                variacao: precoAtual - produtoExistente.precoAtual,
                preco: produtoExistente.precoAtual
            };
            // Salvar a variação de preço
            await prisma.variacaoPreco.create({
                data: variacaoPreco
            });
            updateData.precoAtual = precoAtual;
        }
        const produto = await prisma.produto.update({
            where: { id: produtoId },
            data: updateData,
            include: {
                variacoesPreco: true
            }
        });
        res.status(200).json(produto);
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).json({ error: 'Erro ao editar produto' });
    }
}

export async function getVariacoesProduto(req, res) {
    const produtoId = parseInt(req.params.id);

    try {
        const variacoes = await prisma.variacaoPreco.findMany({
            where: {
                produtoId: produtoId,
            },
            orderBy: {
                data: 'desc',
            },
        });

        res.status(200).json(variacoes);
    } catch (error) {
        console.error('Erro ao buscar variações de preço do produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}