const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.createSubjectsSeed = async function createSubjectsSeed() {
    await destroy();

    console.log("\n - Create Subjects");

    const createSubject = [
        {
            name: "Matemática",
            description: "Matemática",

        },
        {
            name: "Portuguẽs",
            description: "Portuguẽs",

        },
        {
            name: "Geografia",
            description: "Geografia",

        },
        {
            name: "Ciência",
            description: "Ciência",

        },
        {
            name: "Física",
            description: "Física",

        },
    ];

    await prisma.subjects.createMany({
        data: createSubject,
    });
};

async function destroy() {
    await prisma.subjects.deleteMany({});
}