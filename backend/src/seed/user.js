const { PrismaClient } = require("@prisma/client");
const { createHash } = require("node:crypto");
const prisma = new PrismaClient();

module.exports.createUserSeed = async function createUserSeed() {
  await destroy();

  console.log("\n - Create User");

  const createStudent = [
    {
      id: 1,
      name: "Aluno 1",
      responsable_name: "Responsavel 1",
      responsable_number: "+553899999999",
    },
    {
      id: 2,
      name: "Aluno 2",
      responsable_name: "Responsavel 2",
      responsable_number: "+553899999999",
    },
    {
      id: 3,
      name: "Aluno 3",
      responsable_name: "Responsavel 3",
      responsable_number: "+553899999999",
    },
  ];

  //const password = createHash("sha256");
  //console.log(password);
  await prisma.user.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      born_date: new Date("2003-07-20 09:00:00"),
      email: "douglas@gmail.com",
      name: "Douglas",
      password: "123456",
      Student: {
        create: {
          class_time: new Date("2018-04-18 08:00:00"),
          father_name: "José",
          mother_name: "Maria",
          name: "Douglas",
          qty_days_peer_week: 2,
          responsible_number: "+553899999999",
          active: true,
        }
      }
    }
  });
};

async function destroy() {
  await prisma.student.deleteMany({});
}
