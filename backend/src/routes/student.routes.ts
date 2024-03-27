import { Elysia, t } from "elysia";
import { StudentHandler } from "../handlers/students.handler";

const studentsRoutes = new Elysia({ prefix: "/student" });
const studentHandler = new StudentHandler();

studentsRoutes.get("/", studentHandler.findAll());
studentsRoutes.get(
  "/:id",
  async ({ params: { id } }) => studentHandler.findById(id),
  {
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);

studentsRoutes.post(
  "/",
  async ({ body }) => {
    try {
      await studentHandler.add(body);
      return {
        message: "Usuário criado com sucesso.",
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error - " + error,
        status: 500,
      };
    }
  },
  {
    body: t.Object({
      father_name: t.String(),
      mother_name: t.String(),
      responsible_number: t.String(),
      student_name: t.Optional(t.String()),
      class_time: t.Date(),
      qty_days_peer_week: t.Number(),
      id_user_student: t.Number(),
    }),
    transform({ body }) {
      // Apply transform to class_time field if needed
      if (body.class_time && typeof body.class_time === "string") {
        body.class_time = new Date(body.class_time);
      }
    },
  },
);

studentsRoutes.put(
  "/:id",
  async ({ params, body }) => {
    try {
      const data = {
        id: Number(params.id),
        father_name: body.father_name,
        mother_name: body.mother_name,
        responsible_number: body.responsible_number,
        student_name: body.student_name,
        class_time: body.class_time,
        qty_days_peer_week: body.qty_days_peer_week,
        active: body.active,
        school_grade: body.school_grade,
        id_user_student: body.id_user_student,
      };

      await studentHandler.update(data);

      return {
        message: "Estudante atualizado.",
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error -" + error,
        status: 500,
      };
    }
  },
  {
    body: t.Object({
      father_name: t.String(),
      mother_name: t.String(),
      responsible_number: t.String(),
      student_name: t.Optional(t.String()),
      class_time: t.Date(),
      qty_days_peer_week: t.Number(),
      active: t.Boolean(),
      school_grade: t.String(),
      id_user_student: t.Number(),
    }),
    transform({ body }) {
      if (body.class_time && typeof body.class_time === "string") {
        body.class_time = new Date(body.class_time);
      }
    },
  },
);

studentsRoutes.delete(
  "/:id",
  ({ params: { id } }) => studentHandler.remove(id),
  {
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);

export { studentsRoutes };
