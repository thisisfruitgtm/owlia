-- AlterTable
ALTER TABLE "Client" ADD COLUMN "onboardingToken" TEXT,
ADD COLUMN "onboardingTokenExpires" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Client_onboardingToken_key" ON "Client"("onboardingToken");

