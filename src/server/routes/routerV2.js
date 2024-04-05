import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV2 = express.Router();

// Dados de teste para funcionários
const dadosDeTesteFuncionario = {
    img_funcionario: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_dfba6f2477bfa42be69ddfdffbd421d3943d20bf.1920x1080.jpg?t=1700663145",
    email: "pedro@gmail.com",
    CPf: "123.456.789-10",
    Nome: "Pedro Lucas",
    telefone: "40028922",
    idade: 48,
    endereco: "Meio do Mato - PI",
    form_acad: "Licenciatura Matemática",
    regioes: { // Regiões em que o funcionário trabalha
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

// Dados de teste para vendas
const dadosDeTesteVenda = {
    Data: new Date(),          // Data da venda
    total: 100.00,             // Total da venda
    ID_funcionario: 1,         // ID do funcionário associado à venda
    ID_formaPagamento: 1,      // ID da forma de pagamento associada à venda
    produtos: {                // Lista de produtos vendidos
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
            // Adicione mais produtos conforme necessário
        ]
    }
};

// Endpoint para criar um novo funcionário
routerV2.post("/funcionarios", async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.create({
            data: req.body,
            include: {
                regioes: true // Inclui as regiões na resposta
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
                produtos: true  // Incluir produtos vendidos na resposta
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


export default routerV2;