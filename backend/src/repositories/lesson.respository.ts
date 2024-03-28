import { Lesson } from "@prisma/client";
import { prisma } from "../database";
import { CreateLessonDto } from "../dtos/lesson/createLesson.dto";

export class LessonsRepository {
  public async findAll() {
    return prisma.lesson.findMany({
      include: {
        subjects: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async findByUserId(id_user_lesson: number) {
    return prisma.lesson.findMany({
      include: {
        subjects: {
          select: {
            name: true,
          },
        },
      },
      where: { id_user_lesson },
    });
  }

  public async findById(id: number) {
    return prisma.lesson.findUnique({
      where: { id },
    });
  }

  public async create(data: CreateLessonDto) {
    return prisma.lesson.create({ data });
  }

  public async update(data: Lesson) {
    return prisma.lesson.update({
      where: { id: data.id },
      data,
    });
  }

  public async remove(id: number) {
    return prisma.lesson.delete({ where: { id } });
  }
}
