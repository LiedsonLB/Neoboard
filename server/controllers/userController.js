// userController.js

import { PrismaClient } from '@prisma/client';
import { auth } from '../../src/services/firebase.js';
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';

const prisma = new PrismaClient();

export async function login(req, res) {
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
}

export async function register(req, res) {
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
}

export async function resetSenha(req, res) {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({ message: 'Um e-mail de redefinição de senha foi enviado para o seu e-mail.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
        res.status(500).send('Erro ao enviar e-mail de redefinição de senha');
    }
}

export async function loginGoogle(req, res) {
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
} 

export async function getUser(req, res) {
    const userEmail = req.params.userEmail;
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                email: userEmail
            }
        });

        if (usuarios.length === 0) {
            // Se nenhum usuário for encontrado, responda com um ID vazio ou nulo
            res.status(200).json({ id: null }); // Ou responda com { id: '' } se preferir um ID vazio
            return;
        }

        // Se um usuário for encontrado, responda com o ID do usuário
        res.status(200).json({ id: usuarios[0].id });
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
}