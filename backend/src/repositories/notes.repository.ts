import { Notes } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateNoteDto } from "../dtos/notes/createNote.dto";

export class NotesRepository {
  async findAll() {
    return prisma.notes.findMany();
  }

  async findById(id: number) {
    return prisma.notes.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(id_user_notes: number) {
    return prisma.notes.findMany({
      where: { id_user_notes },
    });
  }

  async create(data: CreateNoteDto) {
    return prisma.notes.create({
      data,
    });
  }

  async update(data: Notes) {
    return prisma.notes.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return prisma.notes.delete({
      where: {
        id,
      },
    });
  }
}
