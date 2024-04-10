export interface UpdateStudentDto {
  id: number;
  father_name: string;
  mother_name: string;
  responsible_number: string;
  student_name?: string;
  class_time: string;
  qty_days_peer_week: number;
  days_of_week: string;
  active: boolean;
  school_grade: string;
  id_user_student: number;
}
