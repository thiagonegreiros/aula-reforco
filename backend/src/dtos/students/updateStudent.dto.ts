export interface UpdateStudentDto {
  id: number;
  father_name: string;
  mother_name: string;
  responsible_number: string;
  student_name?: string;
  class_time: Date;
  qty_days_peer_week: number;
  active: boolean;
  school_grade: string;
  id_user_student: number;
}
