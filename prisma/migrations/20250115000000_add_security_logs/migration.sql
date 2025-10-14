-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('FAILED_LOGIN', 'SUCCESSFUL_LOGIN', 'UNAUTHORIZED_ACCESS', 'FILE_UPLOAD', 'CONTRACT_GENERATED', 'SETTINGS_CHANGED', 'PASSWORD_CHANGED', 'SUSPICIOUS_ACTIVITY');

-- CreateEnum
CREATE TYPE "SecurityEventSeverity" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateTable
CREATE TABLE "SecurityLog" (
    "id" TEXT NOT NULL,
    "eventType" "SecurityEventType" NOT NULL,
    "severity" "SecurityEventSeverity" NOT NULL DEFAULT 'INFO',
    "userId" TEXT,
    "email" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SecurityLog_eventType_idx" ON "SecurityLog"("eventType");
CREATE INDEX "SecurityLog_severity_idx" ON "SecurityLog"("severity");
CREATE INDEX "SecurityLog_createdAt_idx" ON "SecurityLog"("createdAt" DESC);
CREATE INDEX "SecurityLog_userId_idx" ON "SecurityLog"("userId");

