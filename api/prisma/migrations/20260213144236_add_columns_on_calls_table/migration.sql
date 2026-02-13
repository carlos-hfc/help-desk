/*
  Warnings:

  - Added the required column `hour` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calls" ADD COLUMN     "hour" TEXT NOT NULL,
ADD COLUMN     "protocol" SERIAL NOT NULL;
ALTER SEQUENCE "calls_protocol_seq" MINVALUE 1000 START 1000 RESTART WITH 1000;