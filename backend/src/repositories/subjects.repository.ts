import { prisma } from "../database";

export class SubjectsRepository {
  public async findById(id: number) {
    return prisma.subjects.findUnique({ where: { id } });
  }
}
