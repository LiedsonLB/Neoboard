/*
  Warnings:

  - The primary key for the `Venda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_venda` on the `Venda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_ID_venda_fkey";

-- AlterTable
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_pkey",
DROP COLUMN "ID_venda",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Venda_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_id_fkey" FOREIGN KEY ("id") REFERENCES "VendasEmDivida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
