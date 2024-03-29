import express from 'express';
import cors from 'cors';
import Product from '../models/Product.js';
import Event from '../models/Event.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.get("/", (req, res) => {
      return res.status(200).send("bem vindo a API");
    });

    this.server.get("/produtos", async (req, res) => {
      const produtos = await prisma.produto.findMany();
      res.send(produtos);
    });

    this.server.post("/produtos", async (req, res) => {
      try {
        const { nome, descricao, preco } = req.body;
    
        const novoProduto = await prisma.product.create({
          data: {
            nome,
            descricao,
            preco,
          }
        });
    
        res.status(201).json(novoProduto);
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        res.status(500).send("Erro ao adicionar produto");
      }
    });    

    this.server.get("/eventos", (req, res) => {

    });
  }
}

export default new App().server;
