const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createUserSeed = async function createUserSeed() {
  await destroy();

  console.log("\n - Create User");

  const getUser = await prisma.user.findUnique({
    where: { email: "douglas@gmail.com" },
  });

  await prisma.user.create({
    data: {
      born_date: new Date("1980-04-01 09:00:00"),
      email: "geo@gmail.com",
      name: "Geo",
      password,
      role: Role.TEACHER,
    },
  });

  await prisma.user.create({
    data: {
      born_date: new Date("1980-04-01 09:00:00"),
      email: "admin@gmail.com",
      name: "Admin",
      password,
      role: Role.ADMIN,
    },
  });
};

async function destroy() {
  await prisma.student.deleteMany({});
  await prisma.user.deleteMany({});
}
