type Subject = {
  name: string;
};

export type LessonDto = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  subjects: Subject;
};
