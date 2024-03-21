const { PrismaClient, Role } = require("@prisma/client");
const crypto = require("node:crypto");
const prisma = new PrismaClient();

module.exports.createUserSeed = async function createUserSeed() {
  await destroy();

  console.log("\n - Create User");

  const password = await hash("123456");

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

async function hash(password) {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

async function destroy() {
  await prisma.user.deleteMany({});
  await prisma.student.deleteMany({});
}
