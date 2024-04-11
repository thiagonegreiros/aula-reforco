import { CreateStudentDto } from "../dtos/students/createStudent.dto";
import { StudentsRepository } from "../repositories/students.respository";
import { UpdateStudentDto } from "../dtos/students/updateStudent.dto";

export class StudentHandler {
  private studentRepository = new StudentsRepository();

  public async findAll() {
    return this.studentRepository.findAll();
  }

  public async findById(id: number) {
    return this.studentRepository.findById(id);
  }

  public async findByIdUser(id: number) {
    return this.studentRepository.findByIdUser(id);
  }

  public async add(data: CreateStudentDto) {
    //TODO: Create a validate user
    //if exists and role is STUDENT

    return this.studentRepository.create(data);
  }

  public async update(data: UpdateStudentDto) {
    //TODO: Create a validate user
    //if exists and role is STUDENT

    const student = await this.studentRepository.findByIdOnlyStudent(data.id);

    if (!student) {
      throw new Error("Estudante não encontrado.");
    }

    Object.assign(student, {
      father_name: data.father_name,
      mother_name: data.mother_name,
      responsible_number: data.responsible_number,
      student_name: data.student_name,
      class_time: data.class_time,
      qty_days_peer_week: data.qty_days_peer_week,
      active: data.active,
      school_grade: data.school_grade,
      days_of_week: data.days_of_week,
    });

    return this.studentRepository.update(student);
  }

  public async remove(id: number) {
    await this.studentRepository.removeById(id);
  }
}
