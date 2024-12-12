-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT NOT NULL,
    "publicCode" TEXT,
    "number" TEXT NOT NULL,
    "resume" TEXT,
    "periodId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);
