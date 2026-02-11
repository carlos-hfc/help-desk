/*
  Warnings:

  - You are about to drop the `technicianAvailabilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "technicianAvailabilities" DROP CONSTRAINT "technicianAvailabilities_technicianId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hours" TEXT[];

-- DropTable
DROP TABLE "technicianAvailabilities";
