import { t } from "elysia";

export const studentParam = t.Object({
  id: t.Numeric(),
});

export const studentBody = t.Object({
  father_name: t.String(),
  mother_name: t.String(),
  responsible_number: t.String(),
  student_name: t.Optional(t.String()),
  id_user_student: t.Number(),
});

export const studentBodyUpdate = t.Object({
  father_name: t.String(),
  mother_name: t.String(),
  responsible_number: t.String(),
  student_name: t.Optional(t.String()),
  class_time: t.Optional(t.Date()),
  qty_days_peer_week: t.Optional(t.Number()),
  active: t.Optional(t.Boolean()),
  school_grade: t.String(),
  id_user_student: t.Number(),
});
