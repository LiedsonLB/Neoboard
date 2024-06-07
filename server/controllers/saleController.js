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

            // Se não existir um relatório, cria um novo relatório
            if (!relatorio) {
                relatorio = await prisma.relatorio.create({
                    data: {
                        Data,
                        Total: valor, // Inicializa o total com o valor da primeira venda
                    },
                });
                console.log('Novo relatório criado:', relatorio);
            } else {
                // Atualiza o total do relatório existente
                await prisma.relatorio.update({
                    where: { Data },
                    data: {
                        Total: {
                            increment: valor, // Incrementa o valor total
                        },
                    },
                });
                console.log('Relatório atualizado com novo total');
            }

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

export async function updateVendasFuncionario(req, res) {
    const { oldFuncionarioId, newFuncionarioId } = req.body;

    if (oldFuncionarioId == null || newFuncionarioId == null) {
        return res.status(400).json({ success: false, error: 'Os IDs dos funcionários são necessários' });
    }

    try {
        const updatedVendas = await prisma.venda.updateMany({
            where: {
                funcionarioId: oldFuncionarioId,
            },
            data: {
                funcionarioId: newFuncionarioId,
            },
        });

        res.status(200).json({ success: true, updatedVendas });
    } catch (error) {
        console.error('Erro ao atualizar vendas:', error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar vendas' });
    }
}

export async function updateVendasRegiao(req, res) {
    const { oldRegiaoId, newRegiaoId } = req.body;

    if (oldRegiaoId == null || newRegiaoId == null) {
        return res.status(400).json({ success: false, error: 'Os IDs das regiões são necessários' });
    }

    try {
        const updatedVendas = await prisma.venda.updateMany({
            where: {
                regiaoId: oldRegiaoId,
            },
            data: {
                regiaoId: newRegiaoId,
            },
        });

        res.status(200).json({ success: true, updatedVendas });
    } catch (error) {
        console.error('Erro ao atualizar vendas:', error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar vendas' });
    }
}

export async function updateVendasProduto(req, res) {
    const { oldProduto, newProdutoIdName } = req.body;
    // oldProduto = produto.id
    // newProdutoIdName = 'Produto Padrão'

    console.log('oldProduto: ', oldProduto)
    console.log('newProdutoIdName: ', newProdutoIdName)

    if (oldProduto == null || newProdutoIdName == null) {
        return res.status(400).json({ success: false, error: 'O ID do produto antigo e o nome do novo produto são necessários' });
    }

    try {
        // Encontrar o ID do produto antigo pelo nome
        const newProduto = await prisma.produto.findUnique({
            where: {
                nome: newProdutoIdName,
            },
        });

        if (!newProduto) {
            return res.status(404).json({ success: false, error: `Produto com nome '${newProdutoIdName}' não encontrado` });
        }

        console.log('oldProduto: ', oldProduto)
        console.log('newProduto: ', newProduto)

        const updatedVendas = await prisma.venda.updateMany({
            where: {
                produtoid: oldProduto,
            },
            data: {
                produtoid: newProduto,
            },
        });

        res.status(200).json({ success: true, updatedVendas });
    } catch (error) {
        console.error('Erro ao atualizar vendas:', error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar vendas' });
    }
}

async function createDefaultData() {
    try {
        const usuarioPadrao = await prisma.usuario.findUnique({
            where: { id: '0' },
        });

        // Se o usuário padrão não existir, cria um novo
        if (!usuarioPadrao) {
            await prisma.usuario.create({
                data: {
                    id: '0',
                    nome: 'Usuário Excluído',
                    email: 'usuarioexcluido@example.com', // Altere o e-mail conforme necessário
                    // outros campos do usuário
                },
            });
            console.log('Usuário padrão criado');
        }

        // Se o usuário padrão não existir, cria um novo
        if (!usuarioPadrao) {
            await prisma.funcionario.create({
                data: {
                    id: 0,
                    nome: 'Usuário Excluído',
                    genero: "Outro",
                    cpf: "000.000.000-00",
                    usuario: {
                        connect: {
                            id: '0'
                        }
                    }
                },
            });
            console.log('Usuário padrão criado');
        }

        // Verifica se o funcionário padrão existe
        const funcionarioPadrao = await prisma.funcionario.findUnique({
            where: { nome: 'Usuário Excluído' },
        });

        // Se o funcionário padrão não existir, cria um novo
        if (!funcionarioPadrao) {
            await prisma.funcionario.create({
                data: {
                    nome: 'Usuário Excluído',
                    genero: "Outro",
                    cpf: "000.000.000-00",
                    usuario: {
                        connect: {
                            id: '0'
                        }
                    }
                },
            });
            console.log('Funcionário padrão criado');
        }

        // Verifica se o produto padrão existe
        const produtoPadrao = await prisma.produto.findUnique({
            where: { nome: 'Produto Padrão' },
        });

        // Se o produto padrão não existir, cria um novo
        if (!produtoPadrao) {
            await prisma.produto.create({
                data: {
                    nome: 'Produto Padrão',
                    precoAtual: 0,
                    picture: '/img/no_productImg.jpeg',
                    NameImg: '',
                    descricao: '',
                    categoria: '',
                    faturamento: 0,
                    numVendas: 0,
                    usuario: {
                        connect: {
                            id: '0'
                        }
                    },
                },
            });
            console.log('Produto padrão criado');
        }

        // Verifica se a região padrão existe
        const regiaoPadrao = await prisma.regiao.findUnique({
            where: { nome: 'Região Padrão' },
        });

        // Se a região padrão não existir, cria uma nova
        if (!regiaoPadrao) {
            await prisma.regiao.create({
                data: {
                    nome: 'Região Padrão',
                    descricao: '',
                    responsavel: '',
                    cidade: '',
                    faturamento: 0,
                    numVendas: 0,
                    clientes: 0,
                    usuario: {
                        connect: {
                            id: '0'
                        }
                    },
                },
            });
            console.log('Região padrão criada');
        }
    } catch (error) {
        console.error('Erro ao criar dados padrão:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createDefaultData();