import { Elysia, t } from "elysia";
import { StudentHandler } from "../handlers/students.handler";
import {
  studentBody,
  studentBodyUpdate,
  studentParam,
} from "../schemas/student.schema";

const studentsRoutes = new Elysia({ prefix: "/student" });
const studentHandler = new StudentHandler();

studentsRoutes.get("/", async () => await studentHandler.findAll());
studentsRoutes.get(
  "/:id",
  async ({ params: { id } }) => await studentHandler.findById(id),
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
    body: studentBody,
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
    body: studentBodyUpdate,
    transform({ body }) {
      if (body.class_time && typeof body.class_time === "string") {
        body.class_time = new Date(body.class_time);
      }
    },
  },
);

studentsRoutes.delete(
  "/:id",
  async ({ params: { id } }) => await studentHandler.remove(id),
  {
    params: studentParam,
  },
);

export { studentsRoutes };
