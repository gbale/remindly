-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
