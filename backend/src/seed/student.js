const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.createStudentsSeed = async function createStudentsSeed() {
  await destroy();

  console.log("\n - Create Students");

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

  await prisma.student.createMany({
    data: createStudent,
  });
};

async function destroy() {
  await prisma.student.deleteMany({});
}
