import { PrismaClient } from '@prisma/client';
import { subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export async function getRelatorioPeriod(req, res) {
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
        const vendas = await prisma.Venda.findMany({
            where: {
                Data: {
                    gte: startOfDay(startDate).toISOString(),
                    lte: endOfDay(endDate).toISOString(),
                },
            },
        });
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
};