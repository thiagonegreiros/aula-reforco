const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createLessonSeed = async function createLessonSeed() {
  await destroy();

  console.log("\n - Create Note");

  const { id: id_matematica } = await prisma.subjects.findFirst({
    where: { name: "Matemática" },
  });

  const { id: id_geografia } = await prisma.subjects.findFirst({
    where: { name: "Geografia" },
  });

  const { id: id_user } = await prisma.user.findUnique({
    where: { email: "douglas@gmail.com" },
  });

  const data = [
    {
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
      id_user_lesson: id_user,
      id_subjects_lesson: id_matematica,
    },
    {
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
      id_user_lesson: id_user,
      id_subjects_lesson: id_geografia,
    },
    {
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
      id_user_lesson: id_user,
      id_subjects_lesson: id_matematica,
    },
  ];

  await prisma.lesson.createMany({
    data,
  });
};

async function destroy() {
  await prisma.lesson.deleteMany({});
}
