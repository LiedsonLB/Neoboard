-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "NameImg" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "precoAtual" DOUBLE PRECISION NOT NULL,
    "faturamento" DOUBLE PRECISION NOT NULL,
    "numVendas" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariacaoPreco" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "variacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VariacaoPreco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regiao" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "nameImg" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT NOT NULL,
    "usuarioId" TEXT,
    "faturamento" DOUBLE PRECISION NOT NULL,
    "numVendas" INTEGER NOT NULL,
    "clientes" INTEGER NOT NULL,

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
    "usuarioId" TEXT NOT NULL,
    "faturamento" DOUBLE PRECISION,
    "numVendas" INTEGER,

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
    "usuarioId" TEXT,

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
    "produtoid" INTEGER NOT NULL,
    "regiaoId" INTEGER NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "usuarioId" TEXT,
    "relatorioId" INTEGER NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("ID_venda")
);

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" SERIAL NOT NULL,
    "Data" TEXT NOT NULL,
    "idVenda" INTEGER NOT NULL,

    CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendasEmDivida" (
    "id" SERIAL NOT NULL,
    "idVenda" INTEGER NOT NULL,
    "pago" BOOLEAN NOT NULL,

    CONSTRAINT "VendasEmDivida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariacaoPreco" ADD CONSTRAINT "VariacaoPreco_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regiao" ADD CONSTRAINT "Regiao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_ID_venda_fkey" FOREIGN KEY ("ID_venda") REFERENCES "VendasEmDivida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_produtoid_fkey" FOREIGN KEY ("produtoid") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "Regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
