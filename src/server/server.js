import express from 'express';
import cors from 'cors';
import Product from '../models/Product.js';
import Event from '../models/Event.js';

const products = [
  new Product(1, 'Picole morango', '/img/product.png', 40),
  new Product(2, 'Picole goiaba', '/img/product.png', 10),
  new Product(3, 'Doki Doki', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a67a0980-24fc-4340-a108-f17fd296c77c/dbzslfc-3cb0234b-a2b2-4d76-9dbe-528e32ff24fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E2N2EwOTgwLTI0ZmMtNDM0MC1hMTA4LWYxN2ZkMjk2Yzc3Y1wvZGJ6c2xmYy0zY2IwMjM0Yi1hMmIyLTRkNzYtOWRiZS01MjhlMzJmZjI0ZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.joOJIPUvtmfx9nkaX8kYqoMglBuerqP6hameLoLF-Dk', 90),
  new Product(4, 'League Of Legends', 'https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png', 10),
  new Product(5, 'Minecraft', 'https://preview.redd.it/minecraft-logo-v0-ak9w918zi5r81.png?auto=webp&s=614e5180aa1f7068676a06351c8edffc86b3b58a', 100),
];

const events = [
  new Event(new Date('2024-03-17T08:00:00'), 'Evento A'),
  new Event(new Date('2024-03-18T10:00:00'), 'Evento B'),
  new Event(new Date('2024-03-19T15:00:00'), 'Evento C'),
];

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

    this.server.get("/produtos", (req, res) => {
      return res.status(200).send(products);
    });

    this.server.get("/eventos", (req, res) => {
      return res.status(200).send(events);
    });
  }
}

export default new App().server;
