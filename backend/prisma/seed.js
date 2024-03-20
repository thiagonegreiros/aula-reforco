const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createSubjectsSeed } = require("../src/seed/subject");
const { createUserSeed } = require("../src/seed/user");

console.log("\n=== SEED DATABASE START ===\n");
Promise.all([createSubjectsSeed(), createUserSeed()])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => console.error("Error: ", e))
  .finally(async () => {
    console.error("\n=== SEED DATABASE FINISHED ===");
    await prisma.$disconnect();
  });
