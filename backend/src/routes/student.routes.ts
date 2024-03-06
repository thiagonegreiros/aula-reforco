import { Elysia, t } from "elysia";
import { StudentHandler } from "../handlers/students.handler";
import { CreateStudentDto } from "../dtos/students/createStudent.dto";

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
      const add = await studentHandler.add(body);
      return {
        message: "Usuário criado com sucesso - " + add.name,
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
      name: t.String(),
      responsable_name: t.String(),
      responsable_number: t.String(),
    }),
  },
);

export { studentsRoutes };
