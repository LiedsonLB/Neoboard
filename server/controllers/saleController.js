// saleController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addVenda(req, res) {
    try {
        const novaVendaData = req.body;

        // Obtenha a data atual
        const dataAtual = new Date().toISOString().split('T')[0];

        // Verifique se já existe um relatório para a data atual
        let relatorio = await prisma.relatorio.findUnique({
            where: { Data: dataAtual }
        });

        // Se não houver um relatório para a data atual, crie um novo
        if (!relatorio) {
            relatorio = await prisma.relatorio.create({
                data: {
                    Data: dataAtual,
                    vendas: {
                        create: [novaVendaData]
                    }
                },
                include: {
                    vendas: true
                }
            });
        } else {
            // Se já houver um relatório, adicione a nova venda ao relatório existente
            relatorio = await prisma.relatorio.update({
                where: { id: relatorio.id },
                data: {
                    vendas: {
                        create: [novaVendaData]
                    }
                },
                include: {
                    vendas: true
                }
            });
        }

        res.status(201).json(relatorio);
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).json({ error: 'Erro ao adicionar venda' });
    }
};

// Rota para obter todas as vendas
export async function getVenda(req, res) {
    try {
        const vendas = await prisma.venda.findMany();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
};

// Rota para excluir uma venda
export async function deleteVenda (req, res) {
    try {
        const vendaId = parseInt(req.params.id);
        await prisma.venda.delete({ where: { id: vendaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir venda:', error);
        res.status(500).json({ error: 'Erro ao excluir venda' });
    }
};

// Rota para editar uma venda
export async function editVenda (req, res) {
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
};