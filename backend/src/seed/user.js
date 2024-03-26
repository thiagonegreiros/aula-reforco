const { PrismaClient, Role } = require("@prisma/client");
const crypto = require("node:crypto");
const prisma = new PrismaClient();

module.exports.createUserSeed = async function createUserSeed() {
  await destroy();

  console.log("\n - Create User/Student");

  const secret = "geoforce";
  const password = crypto
    .createHash("sha256", secret)
    .update("123456")
    .digest("hex");

  // Student
  await prisma.user.upsert({
    where: { email: "douglas@gmail.com" },
    update: {},
    create: {
      born_date: new Date("2003-07-20 09:00:00"),
      email: "douglas@gmail.com",
      name: "Douglas",
      password,
      Student: {
        create: {
          class_time: new Date("2018-04-18 08:00:00"),
          father_name: "José",
          mother_name: "Maria",
          name: "Douglas",
          qty_days_peer_week: 2,
          responsible_number: "+553899999999",
          active: true,
        },
      },
    },
  });

  //Teacher
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
  await prisma.notes.deleteMany({});
  await prisma.user.deleteMany({});
}
