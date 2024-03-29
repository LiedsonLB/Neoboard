import express from 'express';
import cors from 'cors';
import routerV1 from './routes/routesV1.js';

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
    this.server.use('/v1', routerV1);
  }
}

export default new App().server;