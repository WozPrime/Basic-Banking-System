/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[source_accountId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination_accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderId_fkey";

-- DropIndex
DROP INDEX "Transaction_senderId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "destination_accountId" INTEGER NOT NULL,
ADD COLUMN     "source_accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_source_accountId_key" ON "Transaction"("source_accountId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_source_accountId_fkey" FOREIGN KEY ("source_accountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destination_accountId_fkey" FOREIGN KEY ("destination_accountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
