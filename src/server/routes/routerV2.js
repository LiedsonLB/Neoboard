import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routerV2 = express.Router();



export default routerV2;