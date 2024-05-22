import express from 'express';
import { login, register, getUser, resetSenha, loginGoogle } from '../controllers/userController.js';
import { addProduto, deleteProduto, editProduto, getInfoProduto, getProduto } from '../controllers/productController.js';
import { addRegion, deleteRegion, editRegion, getInfoRegion, getRegion } from '../controllers/regionController.js';
import { addFuncionario, deleteFuncionario, editFuncionario, getFuncionarios } from '../controllers/staffController.js';
import { addDespesa, deleteDespesa, editDespesa, getDespesa } from '../controllers/expenseController.js';
import { addVenda, deleteVenda, editVenda, getVenda } from '../controllers/saleController.js';

const routerV3 = express.Router();

// auth routers
routerV3.post("/login", login);
routerV3.post("/register", register);
routerV3.post("/loginGoogle", loginGoogle);
routerV3.post("/resetSenha", resetSenha);
routerV3.get("/users/:userEmail", getUser);

// product routers
routerV3.post("/produtos", addProduto);
routerV3.get("/produtos", getProduto);
routerV3.put("/produtos/edit/:id", editProduto);
routerV3.delete("/produtos/:id", deleteProduto);
routerV3.get('/produtos/:id', getInfoProduto);

// Region routers
routerV3.post("/regioes", addRegion);
routerV3.get("/regioes", getRegion);
routerV3.put("/regioes/:id", editRegion);
routerV3.delete("/regioes/:id", deleteRegion);
routerV3.get("/regioes/:userId", getInfoRegion);

// Staff routers
routerV3.post("/funcionarios", addFuncionario);
routerV3.get("/funcionarios", getFuncionarios);
routerV3.put("/funcionarios/edit/:id", editFuncionario);
routerV3.delete("/funcionarios/:id", deleteFuncionario);

// Expense routers
routerV3.post("/despesas", addDespesa);
routerV3.get("/despesas", getDespesa);
routerV3.delete("/despesas/:id", deleteDespesa);
routerV3.put("/despesas/:id", editDespesa);

// Sale routers
routerV3.post("/vendas", addVenda);
routerV3.get("/vendas", getVenda);
routerV3.delete("/vendas/:id", deleteVenda);
routerV3.put("/vendas/:id", editVenda);

export default routerV3;