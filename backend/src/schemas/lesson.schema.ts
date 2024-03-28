import { t } from "elysia";

export const lessonParams = t.Object({
  id: t.Numeric(),
});

export const lessonUserParams = t.Object({
  id_user_lesson: t.Number(),
});

export const lessonBody = t.Object({
  title: t.String(),
  description: t.String(),
  id_user_lesson: t.Number(),
  id_subjects_lesson: t.Number(),
});
