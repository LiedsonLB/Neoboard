import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../services/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

const prisma = new PrismaClient();
const routerV2 = express.Router();

const produtosFake = [
    { id: 1, nome: 'Sorvete de 1L', vendido: 76, img: 'https://www.sloopsorvetes.com.br//img/produtos/sorvete_flocos_1.5%20L.png' },
    { id: 2, nome: 'Picolé Dileto Clássico', vendido: 68, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6JTkc63Tn7_qUuzE63TfIek-7TIzxsqnkZj1wE7x2A&s./img/picole.jpg' },
    { id: 3, nome: 'Picolé Oreo', vendido: 59, img: 'https://lh6.googleusercontent.com/proxy/Gk0Iuu0-N79cbMqeeKRCwtKxxYLwiJQY0JQy5_rUmCVHKM72ivnC4yqpk9UGvYNh5I8R2LUjTFAEq5CG9ZRejrt18A8o-MUlw_p7iYg8IYN5uuGvyt8' },
    { id: 4, nome: 'Picolé Magnum', vendido: 48, img: 'https://lh4.googleusercontent.com/proxy/PDadvtSUcbHF7D20GKNV986ow12UiW1jEofiRNKpp1ZGdBadkvDov0nKRbV5m2J785oi3_xqm5CAwVJq9m_xYaK4YErIV2tTuV9po-C71frF0wMHxWk' },
];

const regioesFake = [
    { id: 1, nome: 'Piripiri', vendido: 76, img: './img/Piripiri-Igreja-Matriz.png' },
    { id: 2, nome: 'Pedro II', vendido: 58, img: './img/Pdois.jpg' },
    { id: 3, nome: 'Batalha', vendido: 46, img: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Igreja_Matriz_de_Batalha-PI.jpg' },
    { id: 4, nome: 'Capitão de Campos', vendido: 27, img: './img/no_regionImg.jpeg' },
];

const staffsFake = [
    { id: 1, nome: 'Laesse', vendido: 82, img: './img/Laesse.jpeg' },
    { id: 2, nome: 'Romário', vendido: 76, img: './img/Romario.jpeg' },
    { id: 3, nome: 'Welignton', vendido: 63, img: './img/Welignton.jpeg' },
    { id: 4, nome: 'Pedro Lucas', vendido: 10, img: './img/PedroLucas.jpeg' },
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

// Endpoint para enviar os regioes
routerV2.post("/regioes", async (req, res) => {

})

// Endpoint para obter todas os regioes
routerV2.get("/regioes", async (req, res) => {
    try {
        const regioes = regioesFake;
        res.status(200).json(regioes);
    } catch (error) {
        console.error('Erro ao obter regioes:', error);
        res.status(500).json({ error: 'Erro ao obter regioes' });
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