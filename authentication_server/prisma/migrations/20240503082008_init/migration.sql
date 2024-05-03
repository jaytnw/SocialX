-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
