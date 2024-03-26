const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createSubjectsSeed } = require("../src/seed/subject");
const { createUserSeed } = require("../src/seed/user");
const { createNotesSeed } = require("../src/seed/notes");
const { createLessonSeed } = require("../src/seed/lesson");

console.log("\n=== SEED DATABASE START ===\n");
async function seedDatabase() {
  try {
    await createSubjectsSeed();
    await createUserSeed();
    await createNotesSeed();
    await createLessonSeed();

    console.log("\n=== SEED DATABASE FINISHED ===");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
