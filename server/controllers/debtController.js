// debtController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Rota para obter todas as dívidas
export async function getDividas(req, res) {
    try {
        const dividas = await prisma.vendasEmDivida.findMany();
        res.status(200).json(dividas);
    } catch (error) {
        console.error('Erro ao obter dívidas:', error);
        res.status(500).json({ error: 'Erro ao obter dívidas' });
    }
}