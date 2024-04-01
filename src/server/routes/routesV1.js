import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../services/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

const prisma = new PrismaClient();
const routerV1 = express.Router();

routerV1.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).send('Erro ao fazer login');
    }
})

routerV1.post("/cadastro", async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            await updateProfile(user, {
                displayName: username,
            });
            res.status(201).json({ message: 'Cadastro realizado com sucesso' });
        } else {
            console.error('Usuário não encontrado após criação.');
            res.status(500).send('Erro ao cadastrar usuário');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

routerV1.post("/resetSenha", async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({ message: 'Um e-mail de redefinição de senha foi enviado para o seu e-mail.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
        res.status(500).send('Erro ao enviar e-mail de redefinição de senha');
    }
});

routerV1.get("/produtos", async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send("Erro ao buscar produtos");
    }
});

routerV1.post("/produtos", async (req, res) => {
    try {
        const { nome, descricao, preco, categoria } = req.body;

        const novoProduto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco,
                categoria,
            }
        });

        res.status(201).json(novoProduto);
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        res.status(500).send("Erro ao adicionar produto");
    }
});


routerV1.get("/eventos", (req, res) => {
    // Lógica para /eventos
});

export default routerV1;