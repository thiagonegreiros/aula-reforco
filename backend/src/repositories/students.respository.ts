import { Student } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateStudentDto } from "../dtos/students/createStudent.dto";

export class StudentsRepository {
  async findAll() {
    return await prisma.student.findMany({
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async findByIdOnlyStudent(id: number) {
    return await prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateStudentDto) {
    return await prisma.student.create({ data });
  }

  async update(data: Student) {
    return await prisma.student.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return await prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
