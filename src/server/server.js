import express from 'express';
import cors from 'cors';
import routesV1 from './routes/routesV1.js';
import routesV2 from './routes/routesV2.js';
import routesV3 from './routes/routesV3.js';

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
    this.server.use('/v1', routesV1);
    this.server.use('/v2', routesV2);
    this.server.use('/v3', routesV3);
  }
}

export default new App().server;