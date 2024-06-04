import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addVenda(req, res) {
    const {
        Data,
        funcionarioId,
        produtoid,
        quantidadeProdutos,
        valor,
        comprador,
        regiaoId,
        formaPagamento,
        usuarioId,
    } = req.body;

    try {
        // Verifica se já existe um relatório para a data especificada
        let relatorio = await prisma.relatorio.findUnique({
            where: { Data },
        });

        // Se não existir, cria um novo relatório
        if (!relatorio) {
            relatorio = await prisma.relatorio.create({
                data: {
                    Data,
                },
            });
        }

        // Adiciona a venda ao relatório
        const venda = await prisma.venda.create({
            data: {
                Data,
                funcionarioId,
                valor,
                quantidadeProdutos,
                comprador,
                produtoid,
                regiaoId,
                formaPagamento,
                usuarioId,
                relatorioId: relatorio.Data,
            },
        });

        return res.status(200).json({ success: true, venda });
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        return res.status(500).json({ success: false, error: 'Erro ao adicionar venda' });
    }
}

// Route to get all sales
export async function getVenda(req, res) {
    try {
        const vendas = await prisma.venda.findMany();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
};

// Route to delete a sale
export async function deleteVenda(req, res) {
    try {
        const vendaId = parseInt(req.params.id);
        await prisma.venda.delete({ where: { id: vendaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir venda:', error);
        res.status(500).json({ error: 'Erro ao excluir venda' });
    }
};

// Route to edit a sale
export async function editVenda(req, res) {
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