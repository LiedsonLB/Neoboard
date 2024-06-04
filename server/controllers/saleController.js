import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addVenda(req, res) {
    try {
        const novaVendaData = req.body;

        // Verificando se a forma de pagamento é "Divida"
        if (novaVendaData.formaPagamento === 'Divida') {
            // Se a forma de pagamento for "Divida", cria a venda e a adiciona a VendasEmDivida
            const vendaCriada = await prisma.venda.create({
                data: novaVendaData,
                include: {
                    relatorio: true
                }
            });

            // Adicionando a venda à tabela VendasEmDivida
            const vendaEmDivida = await prisma.vendasEmDivida.create({
                data: {
                    idVenda: vendaCriada.id,
                    pago: false  // Definindo como não pago por padrão
                }
            });

            res.status(201).json(vendaCriada);
        } else {
            // Se a forma de pagamento não for "Divida", cria apenas a venda
            const usuario = await prisma.usuario.findUnique({
                where: { id: novaVendaData.usuarioId }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const vendaCriada = await prisma.venda.create({
                data: {
                    ...novaVendaData,
                    funcionario: { connect: { id: novaVendaData.funcionario } },
                    produto: { connect: { id: novaVendaData.produto } },
                    regiao: { connect: { id: novaVendaData.regiao } },
                    usuario: { connect: { id: novaVendaData.usuarioId } },
                    relatorio: {
                        connectOrCreate: {
                            where: { Data: novaVendaData.Data },
                            create: {
                                Data: novaVendaData.Data,
                                Venda: {
                                    create: {
                                        id: novaVendaData.id
                                    }
                                }
                            }
                        }
                    }
                }
            });

            res.status(201).json(vendaCriada);
        }
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).json({ error: 'Erro ao adicionar venda' });
    }
};

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