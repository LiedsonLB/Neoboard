// staffController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Rota para adicionar um novo funcionário
export async function addFuncionario (req, res) {
    try {
        const novoFuncionarioData = req.body;
        const funcionario = await prisma.funcionario.create({ data: novoFuncionarioData });
        res.status(201).json(funcionario);
    } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
        res.status(500).json({ error: 'Erro ao adicionar funcionário' });
    }
};

// Rota para obter os funcionários de um usuário específico
export async function getFuncionarios (req, res) {
    try {
        const userId = req.query.userId;
        const funcionarios = await prisma.funcionario.findMany({
            where: {
                usuarioId: userId
            }
        });
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao obter funcionarios:', error);
        res.status(500).json({ error: 'Erro ao obter funcionarios' });
    }
};

// Rota para excluir um funcionário
export async function deleteFuncionario (req, res) {
    try {
        const funcionarioId = parseInt(req.params.id);
        await prisma.funcionario.delete({ where: { id: funcionarioId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
};

// Rota para editar um funcionário
export async function editFuncionario (req, res) {
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
};