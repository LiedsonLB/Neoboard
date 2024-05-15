// regionController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Rota para adicionar uma nova região
export async function addRegion (req, res) {
    try {
        const novaRegiaoData = req.body;
        const regiao = await prisma.regiao.create({ data: novaRegiaoData });
        res.status(201).json(regiao);
    } catch (error) {
        console.error('Erro ao adicionar regiao:', error);
        res.status(500).json({ error: 'Erro ao adicionar regiao' });
    }
};

// Rota para obter todos as regiões
export async function getRegion (req, res) {
    try {
        const regioes = await prisma.regiao.findMany();
        res.status(200).json(regioes);
    } catch (error) {
        console.error('Erro ao obter regiões:', error);
        res.status(500).json({ error: 'Erro ao obter regiões' });
    }
};

// Rota para excluir uma região
export async function deleteRegion (req, res) {
    try {
        const regiaoId = parseInt(req.params.id);
        await prisma.regiao.delete({ where: { id: regiaoId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir região:', error);
        res.status(500).json({ error: 'Erro ao excluir região' });
    }
};

// Rota para editar uma região
export async function editRegion (req, res) {
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
};

// Rota para obter as regiões de um usuário específico
export async function getInfoRegion (req, res) {
    try {
        const userId = parseInt(req.params.userId);
        const regioes = await prisma.regiao.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json(regioes);
    } catch (error) {
        console.error('Erro ao obter regiões:', error);
        res.status(500).json({ error: 'Erro ao obter regiões' });
    }
};