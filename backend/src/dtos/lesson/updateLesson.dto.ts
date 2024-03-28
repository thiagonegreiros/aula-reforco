import { CreateLessonDto } from "./createLesson.dto";

export interface UpdateLessonDto extends CreateLessonDto {
  id: number;
}
