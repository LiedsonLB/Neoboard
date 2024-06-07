// expenseController.js

import { PrismaClient } from '@prisma/client';
import { subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

// Rota para adicionar uma nova despesa
export async function addDespesa (req, res) {
    try {
        const novaDespesaData = req.body;
        const despesa = await prisma.despesa.create({ data: novaDespesaData });
        res.status(201).json(despesa);
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
        res.status(500).json({ error: 'Erro ao adicionar despesa' });
    }
};

// Rota para obter todos as despesas
export async function getDespesa (req, res) {
    try {
        const despesas = await prisma.despesa.findMany();
        res.status(200).json(despesas);
    } catch (error) {
        console.error('Erro ao obter despesas:', error);
        res.status(500).json({ error: 'Erro ao obter despesas' });
    }
};

// Rota para excluir uma despesa
export async function deleteDespesa (req, res) {
    try {
        const despesaId = parseInt(req.params.id);
        await prisma.despesa.delete({ where: { id: despesaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ error: 'Erro ao excluir despesa' });
    }
};

// Rota para atualizar uma despesa
export async function editDespesa (req, res) {
    try {
        const despesaId = parseInt(req.params.id);
        const novosDadosDespesa = req.body;
        const updatedDespesa = await prisma.despesa.update({
            where: { id: despesaId },
            data: novosDadosDespesa
        });
        res.status(200).json(updatedDespesa);
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        res.status(500).json({ error: 'Erro ao atualizar despesa' });
    }
};

// Função para marcar uma despesa como paga
export async function markDespesaAsPaid (req, res) {
    try {
        const despesaId = parseInt(req.params.id);
        const updatedDespesa = await prisma.despesa.update({
            where: { id: despesaId },
            data: { status: 'Paga' }
        });
        res.status(200).json(updatedDespesa);
    } catch (error) {
        console.error('Erro ao marcar despesa como paga:', error);
        res.status(500).json({ error: 'Erro ao marcar despesa como paga' });
    }
};

export async function getDespesaPeriod(req, res) {
    const { period } = req.query;

    let startDate;
    const endDate = new Date();

    switch (period) {
        case 'Semanal':
            startDate = subDays(endDate, 7);
            break;
        case 'Mensal':
            startDate = subMonths(endDate, 1);
            break;
        case 'Anual':
            startDate = subYears(endDate, 1);
            break;
        default:
            return res.status(400).json({ error: 'Período inválido' });
    }

    try {
        const despesas = await prisma.Despesa.findMany({
            where: {
                data: {
                    gte: startOfDay(startDate).toISOString(),
                    lte: endOfDay(endDate).toISOString(),
                },
            },
        });
        res.status(200).json(despesas);
    } catch (error) {
        console.error('Erro ao obter despesas:', error);
        res.status(500).json({ error: 'Erro ao obter despesas' });
    }
};