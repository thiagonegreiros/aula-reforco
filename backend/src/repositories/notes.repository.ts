import { Notes } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateNoteDto } from "../dtos/notes/createNote.dto";

export class NotesRepository {
  async findAll() {
    return await prisma.notes.findMany();
  }

  async findById(id: number) {
    return await prisma.notes.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateNoteDto) {
    return await prisma.notes.create({
      data,
    });
  }

  async update(data: Notes) {
    return await prisma.notes.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return await prisma.notes.delete({
      where: {
        id,
      },
    });
  }
}
