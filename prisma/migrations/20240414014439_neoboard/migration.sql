-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regiao" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT NOT NULL,

    CONSTRAINT "Regiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "descricao" TEXT,
    "endereco" TEXT NOT NULL,
    "localAtuacao" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataContratacao" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "formacaoAcademica" TEXT NOT NULL,
    "linkedin" TEXT,
    "github" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "ID_venda" SERIAL NOT NULL,
    "Data" TEXT NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "quantidadeProdutos" INTEGER NOT NULL,
    "comprador" TEXT NOT NULL,
    "regiaoId" INTEGER NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("ID_venda")
);

-- CreateTable
CREATE TABLE "ItemVenda" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "vendaId" INTEGER NOT NULL,

    CONSTRAINT "ItemVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RegiaoToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_RegiaoToUsuario_AB_unique" ON "_RegiaoToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_RegiaoToUsuario_B_index" ON "_RegiaoToUsuario"("B");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "Regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("ID_venda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegiaoToUsuario" ADD CONSTRAINT "_RegiaoToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Regiao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegiaoToUsuario" ADD CONSTRAINT "_RegiaoToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
