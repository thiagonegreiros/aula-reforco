export type StudentDto = {
  id: number;
  school_grade: string;
  mother_name: string;
  father_name: string;
  student_name?: string;
  responsible_number: string;
  id_user_student: number;
};

export type StudentDtoStorage = {
  id: number;
  class_time?: string;
  school_grade: string;
  days_of_week?: number;
};
