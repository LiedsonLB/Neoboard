import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../services/firebase.js';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

const prisma = new PrismaClient();
const routerV3 = express.Router();

routerV3.post("/login", async (req, res) => {
    const { email } = req.body;
    try {
        // Verificar se o usuário já existe no banco de dados
        const existingUser = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        // Se o usuário não existir, retornar um erro
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não cadastrado' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido!', user: existingUser });

    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).send('Erro ao fazer login');
    }
});

routerV3.post("/loginGoogle", async (req, res) => {
    const { username, email, id } = req.body;
    try {
        // Verificar se o usuário já existe no banco de dados
        const existingUser = await prisma.usuario.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            // Se o usuário já existir, retorne os detalhes do usuário existente
            return res.status(200).json({ message: 'Login bem-sucedido!', user: existingUser });
        } else {
            // Se o usuário não existir, crie um novo usuário no banco de dados
            const savedUser = await prisma.usuario.create({
                data: {
                    nome: username,
                    email: email,
                    id: id
                }
            });

            return res.status(200).json({ message: 'Login bem-sucedido!', user: savedUser });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).send('Erro ao fazer login');
    }
});

routerV3.post("/cadaster", async (req, res) => {
    const { email, password, username } = req.body;
    try {

        // Criar o usuário no Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
            // Atualizar nome de perfil do usuario
            await updateProfile(user, {
                displayName: username,
            });

            // Salvar o usuário no banco de dados
            const savedUser = await prisma.usuario.create({
                data: {
                    nome: username,
                    email: email,
                }
            });

            // Envie uma única resposta com sucesso após todas as operações
            res.status(201).json({ message: 'Cadastro realizado com sucesso', user: savedUser });
        } else {
            console.error('Usuário não encontrado após criação.');
            res.status(500).send('Erro ao cadastrar usuário');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

routerV3.post("/resetSenha", async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({ message: 'Um e-mail de redefinição de senha foi enviado para o seu e-mail.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
        res.status(500).send('Erro ao enviar e-mail de redefinição de senha');
    }
});

// Rota para obter todos os produtos
routerV3.get("/user/:userEmail", async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const usuarios = await prisma.usuario.findMany({
            where: {
                email: userEmail
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
});

// Rota para adicionar um novo produto
routerV3.post("/produtos", async (req, res) => {
    try {
        const novoProdutoData = req.body;

        const produto = await prisma.produto.create({ data: novoProdutoData });
        res.status(201).json(produto);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});

// Rota para obter todos os produtos
routerV3.get("/produtos/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const produtos = await prisma.produto.findMany({
            where: {
                usuarioId: userId
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
});

// Rota para excluir um produto
routerV3.delete("/produtos/:id", async (req, res) => {
    try {
        const produtoId = parseInt(req.params.id);

        // Consultar todas as variações de preço relacionadas ao produto
        const variacoesPreco = await prisma.variacaoPreco.findMany({
            where: {
                produtoId: produtoId
            }
        });

        // Excluir todas as variações de preço relacionadas ao produto
        await prisma.variacaoPreco.deleteMany({
            where: {
                produtoId: produtoId
            }
        });

        // Em seguida, exclua o próprio produto
        await prisma.produto.delete({
            where: {
                id: produtoId
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
});

routerV3.put("/produtos/edit/:id", async (req, res) => {
    try {
        const produtoId = parseInt(req.params.id);
        const { precoAtual, variacoesPreco, produtoExistente, ...novosDadosProduto } = req.body;

        let updateData = { ...novosDadosProduto };

        // Verificar se o preço atual foi alterado
        if (precoAtual !== produtoExistente.precoAtual) {
            // Calcular a variação de preço
            const variacaoPreco = {
                produtoId: produtoId,
                data: new Date(), // Data da alteração do preço
                variacao: precoAtual - produtoExistente.precoAtual, // Variação de preço
                preco: produtoExistente.precoAtual
            };

            // Salvar a variação de preço
            await prisma.variacaoPreco.create({
                data: variacaoPreco
            });

            updateData.precoAtual = precoAtual;
        }

        const produto = await prisma.produto.update({
            where: { id: produtoId },
            data: updateData,
            include: {
                variacoesPreco: true
            }
        });

        res.status(200).json(produto);
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).json({ error: 'Erro ao editar produto' });
    }
});

// Rota para obter um produto por ID
routerV3.get("/produtos/info/:id", async (req, res) => {
    try {
        const produtoId = parseInt(req.params.id); // Extrai o ID do parâmetro da URL e converte para inteiro
        const produto = await prisma.produto.findUnique({ where: { id: produtoId } }); // Busca o produto pelo ID
        if (!produto) { // Verifica se o produto foi encontrado
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        console.error('Erro ao obter produto:', error);
        res.status(500).json({ error: 'Erro ao obter produto' });
    }
});


// Rota para adicionar uma nova região
routerV3.post("/regioes", async (req, res) => {
    try {
        const novaRegiaoData = req.body;
        const regiao = await prisma.regiao.create({ data: novaRegiaoData });
        res.status(201).json(regiao);
    } catch (error) {
        console.error('Erro ao adicionar regiao:', error);
        res.status(500).json({ error: 'Erro ao adicionar regiao' });
    }
});

// Rota para obter todos as regiões
routerV3.get("/regioes", async (req, res) => {
    try {
        const regioes = await prisma.regiao.findMany();
        res.status(200).json(regioes);
    } catch (error) {
        console.error('Erro ao obter regiões:', error);
        res.status(500).json({ error: 'Erro ao obter regiões' });
    }
});

// Rota para excluir uma região
routerV3.delete("/regioes/:id", async (req, res) => {
    try {
        const regiaoId = parseInt(req.params.id);
        await prisma.regiao.delete({ where: { id: regiaoId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir região:', error);
        res.status(500).json({ error: 'Erro ao excluir região' });
    }
});

// Rota para editar uma região
routerV3.put("/regioes/:id", async (req, res) => {
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
});

// Rota para adicionar uma nova despesa
routerV3.post("/despesas", async (req, res) => {
    try {
        const novaDespesaData = req.body;
        const despesa = await prisma.despesa.create({ data: novaDespesaData });
        res.status(201).json(despesa);
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
        res.status(500).json({ error: 'Erro ao adicionar despesa' });
    }
});

// Rota para obter todos as despesas
routerV3.get("/despesas", async (req, res) => {
    try {
        const despesas = await prisma.despesa.findMany();
        res.status(200).json(despesas);
    } catch (error) {
        console.error('Erro ao obter despesas:', error);
        res.status(500).json({ error: 'Erro ao obter despesas' });
    }
});

// Rota para excluir uma despesa
routerV3.delete("/despesas/:id", async (req, res) => {
    try {
        const despesaId = parseInt(req.params.id);
        await prisma.despesa.delete({ where: { id: despesaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ error: 'Erro ao excluir despesa' });
    }
});

// Rota para atualizar uma despesa
routerV3.put("/despesas/:id", async (req, res) => {
    try {
        const despesaId = parseInt(req.params.id);
        const novosDadosDespesa = req.body; // Certifique-se de que os campos que podem ser atualizados estão presentes no corpo da solicitação
        const updatedDespesa = await prisma.despesa.update({
            where: { id: despesaId },
            data: novosDadosDespesa
        });
        res.status(200).json(updatedDespesa);
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        res.status(500).json({ error: 'Erro ao atualizar despesa' });
    }
});

// Rota para adicionar um novo funcionário
routerV3.post("/funcionarios", async (req, res) => {
    try {
        const novoFuncionarioData = req.body;
        const funcionario = await prisma.funcionario.create({ data: novoFuncionarioData });
        res.status(201).json(funcionario);
    } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
        res.status(500).json({ error: 'Erro ao adicionar funcionário' });
    }
});

// Rota para obter todos os funcionários
routerV3.get("/funcionarios", async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao obter funcionários:', error);
        res.status(500).json({ error: 'Erro ao obter funcionários' });
    }
});

// Rota para excluir um funcionário
routerV3.delete("/funcionarios/:id", async (req, res) => {
    try {
        const funcionarioId = parseInt(req.params.id);
        await prisma.funcionario.delete({ where: { id: funcionarioId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
});

// Rota para editar um funcionário
routerV3.put("/funcionarios/:id", async (req, res) => {
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
});

// Rota para adicionar uma nova venda
routerV3.post("/vendas", async (req, res) => {
    try {
        const novaVendaData = req.body;
        const venda = await prisma.venda.create({ data: novaVendaData });
        res.status(201).json(venda);
    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).json({ error: 'Erro ao adicionar venda' });
    }
});

// Rota para obter todas as vendas
routerV3.get("/vendas", async (req, res) => {
    try {
        const vendas = await prisma.venda.findMany();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
});

// Rota para excluir uma venda
routerV3.delete("/vendas/:id", async (req, res) => {
    try {
        const vendaId = parseInt(req.params.id);
        await prisma.venda.delete({ where: { id: vendaId } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir venda:', error);
        res.status(500).json({ error: 'Erro ao excluir venda' });
    }
});

// Rota para editar uma venda
routerV3.put("/vendas/:id", async (req, res) => {
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
});

export default routerV3;