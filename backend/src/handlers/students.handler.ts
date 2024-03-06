import { Student } from "@prisma/client";
import { CreateStudentDto } from "../dtos/students/createStudent.dto";
import studentsRespository from "../repositories/students.respository";

export class StudentHandler {
  public async findAll() {
    const students = await studentsRespository.findAll();

    return students;
  }

  public async findById(id: number) {
    return await studentsRespository.findById(id);
  }

  public async add({
    name,
    responsable_name,
    responsable_number,
  }: CreateStudentDto) {
    return await studentsRespository.create({
      name,
      responsable_name,
      responsable_number,
    });
  }

  public async update(data: Student) {
    return await studentsRespository.update(data);
  }

  public async remove(id: number) {
    await studentsRespository.removeById(id);
  }
}
