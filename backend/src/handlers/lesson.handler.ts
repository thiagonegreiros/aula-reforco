import { UsersRepository } from "../repositories/users.repository";
import { LessonsRepository } from "../repositories/lesson.respository";
import { CreateLessonDto } from "../dtos/lesson/createLesson.dto";
import { SubjectsRepository } from "../repositories/subjects.repository";
import { UpdateLessonDto } from "../dtos/lesson/updateLesson.dto";

export class LessonHandler {
  private userRepository = new UsersRepository();
  private subjectsRepository = new SubjectsRepository();
  private lessonRepository = new LessonsRepository();

  public async findAll() {
    return this.lessonRepository.findAll();
  }

  public async findById(id: number) {
    return this.lessonRepository.findById(id);
  }

  public async findByUserId(id_user_lesson: number) {
    return this.lessonRepository.findByUserId(id_user_lesson);
  }

  public async add({
    id_user_lesson,
    id_subjects_lesson,
    title,
    description,
  }: CreateLessonDto) {
    const subject = await this.subjectsRepository.findById(id_subjects_lesson);

    if (!subject) throw new Error("Disciplina não encontrada.");

    const user = await this.userRepository.findById(id_user_lesson);

    if (!user) throw new Error("Usuário não encontrado.");

    return this.lessonRepository.create({
      title,
      description,
      id_user_lesson,
      id_subjects_lesson,
    });
  }

  public async update(data: UpdateLessonDto) {
    const subject = await this.subjectsRepository.findById(
      data.id_subjects_lesson,
    );

    if (!subject) throw new Error("Disciplina não encontrada.");

    const user = await this.userRepository.findById(data.id_user_lesson);

    if (!user) throw new Error("Usuário não encontrado.");

    const lesson = await this.findById(data.id);

    if (!lesson) throw new Error("Lição não encontrada.");

    Object.assign(lesson, {
      id_user_lesson: data.id_user_lesson,
      id_subjects_lesson: data.id_subjects_lesson,
      title: data.title,
      description: data.description,
    });

    return this.lessonRepository.update(lesson);
  }

  public async remove(id: number) {
    await this.lessonRepository.remove(id);
  }
}
