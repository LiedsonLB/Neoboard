import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addVenda(req, res) {
    const vendas = req.body;
    console.log('Vendas recebidas:', vendas);

    try {
        for (const venda of vendas) {
            const {
                Data,
                funcionarioId,
                produtoid,
                quantidadeProdutos,
                comprador,
                regiaoId,
                formaPagamento,
                usuarioId,
            } = venda;

            console.log('Dados da venda:', {
                Data,
                funcionarioId,
                produtoid,
                quantidadeProdutos,
                comprador,
                regiaoId,
                formaPagamento,
                usuarioId,
            });

            if (!Data || !funcionarioId || !produtoid || !regiaoId || !formaPagamento || !usuarioId) {
                console.error('Erro: Dados obrigatórios estão faltando');
                return res.status(400).json({ success: false, error: 'Dados obrigatórios estão faltando' });
            }

            // Verifica se já existe um relatório para a data especificada
            let relatorio = await prisma.relatorio.findUnique({
                where: { Data },
            });

            console.log('Relatório encontrado:', relatorio);

            // Se não existir, cria um novo relatório
            if (!relatorio) {
                relatorio = await prisma.relatorio.create({
                    data: {
                        Data,
                    },
                });
                console.log('Novo relatório criado:', relatorio);
            }

            // Busca o produto pelo produtoid
            const produto = await prisma.produto.findUnique({
                where: { id: produtoid },
            });

            if (!produto) {
                console.error('Produto não encontrado');
                return res.status(404).json({ success: false, error: 'Produto não encontrado' });
            }

            // Calcula o valor total da venda
            const valor = quantidadeProdutos * produto.precoAtual;
            console.log(relatorio)

            // Adiciona a venda ao relatório
            const novaVenda = await prisma.venda.create({
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

            console.log('Nova venda criada:', novaVenda);

            // Verifica se o formaPagamento é "Dívida" e adiciona a venda à tabela VendasEmDivida
            if (formaPagamento === 'Dívida') {
                await prisma.vendasEmDivida.create({
                    data: {
                        idVenda: novaVenda.id,
                        pago: false,
                    },
                });
                console.log('Venda adicionada à tabela VendasEmDivida');
            }
        }

        return res.status(200).json({ success: true });
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