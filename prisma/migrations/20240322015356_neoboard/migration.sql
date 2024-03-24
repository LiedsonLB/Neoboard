-- CreateTable
CREATE TABLE "Usuario" (
    "email" TEXT NOT NULL,
    "IDF" INTEGER NOT NULL,
    "CPf" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "form_acad" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Regiao" (
    "IDR" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "IDF" INTEGER NOT NULL,

    CONSTRAINT "Regiao_pkey" PRIMARY KEY ("IDR")
);

-- CreateTable
CREATE TABLE "ItensVenda" (
    "IDIV" INTEGER NOT NULL,
    "quant_item" INTEGER NOT NULL,
    "IDV" INTEGER NOT NULL,
    "IDP" INTEGER NOT NULL,

    CONSTRAINT "ItensVenda_pkey" PRIMARY KEY ("IDIV")
);

-- CreateTable
CREATE TABLE "Produto" (
    "IDP" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("IDP")
);

-- CreateTable
CREATE TABLE "Venda" (
    "IDV" INTEGER NOT NULL,
    "Data" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "IDF" INTEGER NOT NULL,
    "IDFP" INTEGER NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("IDV")
);

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "IDFP" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("IDFP")
);

-- CreateTable
CREATE TABLE "_ProdutoToVenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_IDF_key" ON "Usuario"("IDF");

-- CreateIndex
CREATE INDEX "idx_itens_venda_venda_id" ON "ItensVenda"("IDV");

-- CreateIndex
CREATE UNIQUE INDEX "_ProdutoToVenda_AB_unique" ON "_ProdutoToVenda"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdutoToVenda_B_index" ON "_ProdutoToVenda"("B");

-- AddForeignKey
ALTER TABLE "Regiao" ADD CONSTRAINT "Regiao_IDF_fkey" FOREIGN KEY ("IDF") REFERENCES "Usuario"("IDF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_IDV_fkey" FOREIGN KEY ("IDV") REFERENCES "Venda"("IDV") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_IDP_fkey" FOREIGN KEY ("IDP") REFERENCES "Produto"("IDP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_IDF_fkey" FOREIGN KEY ("IDF") REFERENCES "Usuario"("IDF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_IDFP_fkey" FOREIGN KEY ("IDFP") REFERENCES "FormaPagamento"("IDFP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Produto"("IDP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_B_fkey" FOREIGN KEY ("B") REFERENCES "Venda"("IDV") ON DELETE CASCADE ON UPDATE CASCADE;
