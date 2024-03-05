const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createStudentsSeed } = require("../src/seed/student");

console.log("\n=== SEED DATABASE START ===\n");
Promise.all([createStudentsSeed()])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => console.error("Error: ", e))
  .finally(async () => {
    console.error("\n=== SEED DATABASE FINISHED ===");
    await prisma.$disconnect();
  });
