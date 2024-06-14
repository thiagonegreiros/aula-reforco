import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const amount = 5;
  let user: Prisma.UserCreateInput;
  await prisma.student.deleteMany();
  await prisma.notes.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < amount; i++) {
    user = {
      born_date: faker.date.between({
        from: "2017-01-01T00:00:00.000Z",
        to: "2024-01-01T00:00:00.000Z",
      }) as Date,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: await hash("123456", 8),
      Student: {
        create: {
          father_name: faker.person.fullName(),
          mother_name: faker.person.fullName(),
          school_grade: "Primeiro Ano",
          responsible_number: faker.phone.number(),
        },
      },
    };

    await prisma.user.create({
      data: user,
    });
  }

  //await prisma.user.createMany({ data: user });

  console.log("DONE INSERTING");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
