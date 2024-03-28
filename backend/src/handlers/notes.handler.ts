import { NotesRepository } from "../repositories/notes.repository";
import { CreateNoteDto } from "../dtos/notes/createNote.dto";
import { updateNoteDto } from "../dtos/notes/updateNote.dto";
import { UsersRepository } from "../repositories/users.repository";

export class NotesHandler {
  private notesRepository = new NotesRepository();
  private userRepository = new UsersRepository();

  public async findAll() {
    return this.notesRepository.findAll();
  }

  public async findById(id: number) {
    return this.notesRepository.findById(id);
  }

  public async findByUserId(id_user_notes: number) {
    return this.notesRepository.findByUserId(id_user_notes);
  }

  public async add({ id_user_notes, note }: CreateNoteDto) {
    const user = await this.userRepository.findById(id_user_notes);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return this.notesRepository.create({
      id_user_notes,
      note,
    });
  }

  public async update(data: updateNoteDto) {
    const note = await this.notesRepository.findById(data.id);
    const user = await this.userRepository.findById(data.id_user_notes);

    if (!note) {
      throw new Error("Recado não encontrado");
    }

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    Object.assign(note, {
      id: data.id,
      id_user_notes: data.id_user_notes,
      note: data.note,
    });

    return this.notesRepository.update(note);
  }

  public async remove(id: number) {
    await this.notesRepository.removeById(id);
  }
}
