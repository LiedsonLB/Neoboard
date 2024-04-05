-- CreateTable
CREATE TABLE "Funcionario" (
    "ID_funcionario" SERIAL NOT NULL,
    "img_funcionario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "CPf" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "form_acad" TEXT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("ID_funcionario")
);

-- CreateTable
CREATE TABLE "Regiao" (
    "ID_regiao" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ID_funcionario" INTEGER NOT NULL,

    CONSTRAINT "Regiao_pkey" PRIMARY KEY ("ID_regiao")
);

-- CreateTable
CREATE TABLE "ItensVenda" (
    "ID_itemVenda" INTEGER NOT NULL,
    "quant_item" INTEGER NOT NULL,
    "ID_venda" INTEGER NOT NULL,
    "ID_produto" INTEGER NOT NULL,

    CONSTRAINT "ItensVenda_pkey" PRIMARY KEY ("ID_itemVenda")
);

-- CreateTable
CREATE TABLE "Produto" (
    "ID_produto" INTEGER NOT NULL,
    "img_produto" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("ID_produto")
);

-- CreateTable
CREATE TABLE "Venda" (
    "ID_venda" INTEGER NOT NULL,
    "Data" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "ID_funcionario" INTEGER NOT NULL,
    "ID_formaPagamento" INTEGER NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("ID_venda")
);

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "ID_formaPagamento" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("ID_formaPagamento")
);

-- CreateTable
CREATE TABLE "_ProdutoToVenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_itens_venda_venda_id" ON "ItensVenda"("ID_venda");

-- CreateIndex
CREATE UNIQUE INDEX "_ProdutoToVenda_AB_unique" ON "_ProdutoToVenda"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdutoToVenda_B_index" ON "_ProdutoToVenda"("B");

-- AddForeignKey
ALTER TABLE "Regiao" ADD CONSTRAINT "Regiao_ID_funcionario_fkey" FOREIGN KEY ("ID_funcionario") REFERENCES "Funcionario"("ID_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_ID_venda_fkey" FOREIGN KEY ("ID_venda") REFERENCES "Venda"("ID_venda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_ID_produto_fkey" FOREIGN KEY ("ID_produto") REFERENCES "Produto"("ID_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_ID_funcionario_fkey" FOREIGN KEY ("ID_funcionario") REFERENCES "Funcionario"("ID_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_ID_formaPagamento_fkey" FOREIGN KEY ("ID_formaPagamento") REFERENCES "FormaPagamento"("ID_formaPagamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Produto"("ID_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_B_fkey" FOREIGN KEY ("B") REFERENCES "Venda"("ID_venda") ON DELETE CASCADE ON UPDATE CASCADE;
