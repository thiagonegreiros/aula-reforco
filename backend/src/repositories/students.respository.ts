import { Student } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateStudentDto } from "../dtos/students/createStudent.dto";

export class StudentsRepository {
  async findAll() {
    return prisma.student.findMany({
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async findByIdUser(id_user_student: number) {
    return prisma.student.findUnique({
      where: {
        id_user_student,
      },
      include: {
        user: true,
      },
    });
  }

  async findByIdOnlyStudent(id: number) {
    return prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateStudentDto) {
    return prisma.student.create({ data });
  }

  async update(data: Student) {
    return prisma.student.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
