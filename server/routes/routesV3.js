import express from 'express';
import { login, register, getUser, resetSenha, loginGoogle } from '../controllers/userController.js';
import { addProduto, deleteProduto, editProduto, getInfoProduto, getProduto, getVariacoesProduto } from '../controllers/productController.js';
import { addRegion, deleteRegion, editRegion, getInfoRegion, getRegion } from '../controllers/regionController.js';
import { addFuncionario, deleteFuncionario, editFuncionario, getFuncionarios } from '../controllers/staffController.js';
import { addDespesa, deleteDespesa, editDespesa, getDespesa, markDespesaAsPaid } from '../controllers/expenseController.js';
import { addVenda, deleteVenda, editVenda, getVenda, updateVendasFuncionario, updateVendasProduto, updateVendasRegiao } from '../controllers/saleController.js';
import { getDividas, deleteDividas, efetiveDividas } from '../controllers/debtController.js';
import { getRelatorioPeriod } from '../controllers/RelatorioController.js';

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
routerV3.get("/variacoes/:id", getVariacoesProduto);
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
routerV3.put("/despesas/efetuado/:id", markDespesaAsPaid);

// Sale routers
routerV3.post("/vendas", addVenda);
routerV3.get("/vendas", getVenda);
routerV3.delete("/vendas/:id", deleteVenda);
routerV3.put("/vendas/:id", editVenda);
routerV3.put('/vendas/updateFuncionario', updateVendasFuncionario);
routerV3.put('/vendas/updateRegiao', updateVendasRegiao);
routerV3.put('/vendas/updateProduto', updateVendasProduto);

// debt routers
routerV3.get("/dividas", getDividas);
routerV3.delete("/dividas/:id", deleteDividas);
routerV3.put("/dividas/:id", efetiveDividas);

//relatorio routers
routerV3.get("/relatorio", getRelatorioPeriod);

export default routerV3;