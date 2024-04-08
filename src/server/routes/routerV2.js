import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../services/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

const prisma = new PrismaClient();
const routerV2 = express.Router();

const produtosFake = [
    { id: 1, nome: 'League of Legends', vendido: 20, img: 'https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png' },
    { id: 2, nome: 'Minecraft', vendido: 50, img: 'https://preview.redd.it/avjal33hpqo61.png?width=512&format=png&auto=webp&s=b652d83347448df74c8ba61c17b322e686ee32a4' },
    { id: 3, nome: 'Produto 3', vendido: 80, img: './img/no_productImg.jpeg' },
];

const dadosDeTesteFuncionario = {
    picture: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_dfba6f2477bfa42be69ddfdffbd421d3943d20bf.1920x1080.jpg?t=1700663145",
    email: "pedro@gmail.com",
    CPF: "123.456.789-10",
    name: "Pedro Lucas",
    phone: "40028922",
    age: 48,
    location: "Meio do Mato - PI",
    form_academ: "Licenciatura Matemática",
    regions: {
        create: [
            {
                nome: "Pedro II"
            },
            {
                nome: "Piripiri"
            }
        ]
    }
};

const dadosDeTesteVenda = {
    Data: new Date(),
    total: 100.00,
    ID_funcionario: 1,
    ID_formaPagamento: 1,
    produtos: {
        create: [
            {
                nome: "Minecraft",
                preco: 50.00,
                categoria: "jogo",
                descricao: "um jogos de blocos de aventura",
                img_produto: "https://preview.redd.it/avjal33hpqo61.png?width=512&format=png&auto=webp&s=b652d83347448df74c8ba61c17b322e686ee32a4"
            },
            {
                nome: "League of Legends",
                preco: 0.00,
                categoria: "Lixo",
                descricao: "um jogo lixo",
                img_produto: "https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png"
            }
        ]
    }
};

// Endpoint para criar um novo funcionário
routerV2.post("/funcionarios", async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.create({
            data: req.body,
            include: {
                regioes: true
            }
        });
        res.status(201).json(funcionario);
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        res.status(500).json({ error: 'Erro ao criar funcionário' });
    }
});

// Endpoint para obter todos os funcionários
routerV2.get("/funcionarios", async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao obter funcionários:', error);
        res.status(500).json({ error: 'Erro ao obter funcionários' });
    }
});

// Endpoint para criar uma nova venda
routerV2.post("/vendas", async (req, res) => {
    try {
        const venda = await prisma.venda.create({
            data: dadosDeTesteVenda,
            include: {
                produtos: true
            }
        });
        res.status(201).json(venda);
    } catch (error) {
        console.error('Erro ao criar venda:', error);
        res.status(500).json({ error: 'Erro ao criar venda' });
    }
});

// Endpoint para obter todas as vendas
routerV2.get("/vendas", async (req, res) => {
    try {
        const vendas = await prisma.venda.findMany();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas:', error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
});

// Endpoint para enviar os produtos
routerV2.post("/produtos", async (req, res) => {

})

// Endpoint para obter todas os produtos
routerV2.get("/produtos", async (req, res) => {
    try {
        const produtos = produtosFake;
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
})

routerV2.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).send('Erro ao fazer login');
    }
})

routerV2.post("/cadastro", async (req, res) => {
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

routerV2.post("/resetSenha", async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({ message: 'Um e-mail de redefinição de senha foi enviado para o seu e-mail.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
        res.status(500).send('Erro ao enviar e-mail de redefinição de senha');
    }
});

export default routerV2;