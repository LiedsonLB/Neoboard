import express from 'express';
import cors from 'cors';
import routesV3 from './routes/routesV3.js';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json({ limit: '10mb' }));
    this.server.use(cors());
  }

  routes() {
    this.server.use('/v3', routesV3);
  }
}

export default new App().server;