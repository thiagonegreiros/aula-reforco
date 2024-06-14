import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

module.exports.createUserSeed = async function createUserSeed() {
  await destroy();

  console.log("\n - Create User/Student");

  const password = "123456";

  // Student
  await prisma.user.upsert({
    where: { email: "douglas@gmail.com" },
    update: {},
    create: {
      born_date: new Date("2003-07-20 09:00:00"),
      email: "douglas@gmail.com",
      name: "Douglas Oliveira",
      password,
      Student: {
        create: {
          father_name: "José",
          mother_name: "Maria",
          school_grade: "Primeiro Ano",
          responsible_number: "553899999999",
        },
      },
    },
  });

  /* await prisma.user.upsert({
    where: { email: "gabriel@gmail.com" },
    update: {},
    create: {
      born_date: new Date("2002-09-01 08:00:00"),
      email: "gabriel@gmail.com",
      name: "Gabriel Monteiro",
      password,
      Student: {
        create: {
          father_name: "Carlos",
          mother_name: "Marcleide",
          school_grade: "Segundo Ano",
          responsible_number: "55991506020",
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "everton@gmail.com" },
    update: {},
    create: {
      born_date: new Date("2000-12-25 10:00:00"),
      email: "everton@gmail.com",
      name: "Everton Maia",
      password,
      Student: {
        create: {
          father_name: "Rafael",
          mother_name: "Leuda",
          school_grade: "Segundo Ano",
          responsible_number: "559847562315",
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



  await prisma.user.create({
    data: {
      born_date: new Date("2012-02-10 09:00:00"),
      email: "luis@gmail.com",
      name: "Luis Eduardo",
      password,
      role: Role.STUDENT,
    },
  });

  await prisma.user.create({
    data: {
      born_date: new Date("2010-04-21 10:00:00"),
      email: "eloa@gmail.com",
      name: "Eloá",
      password,
      role: Role.STUDENT,
    },
  }); */
};

async function destroy() {
  await prisma.student.deleteMany({});
  await prisma.notes.deleteMany({});
  await prisma.user.deleteMany({});
}
