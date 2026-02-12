-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_clientId_fkey";

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
