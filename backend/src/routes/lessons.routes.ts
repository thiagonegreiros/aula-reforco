import { Elysia } from "elysia";
import { noteParams } from "../schemas/notes.schema";
import { LessonHandler } from "../handlers/lesson.handler";
import { lessonBody, lessonParams } from "../schemas/lesson.schema";
import { UpdateLessonDto } from "../dtos/lesson/updateLesson.dto";

const lessonRoutes = new Elysia({ prefix: "/lesson" });
const lessonHandler = new LessonHandler();

lessonRoutes.get("/", async () => await lessonHandler.findAll());
lessonRoutes.get(
  "/:id",
  async ({ params: { id } }) => await lessonHandler.findById(id),
  {
    params: noteParams,
  },
);

lessonRoutes.post(
  "/",
  async ({ body }) => {
    try {
      await lessonHandler.add(body);
      return {
        message: "Lição criada com sucesso",
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
    body: lessonBody,
  },
);

lessonRoutes.put(
  "/:id",
  async ({ params, body }) => {
    try {
      const data: UpdateLessonDto = {
        id: Number(params.id),
        id_user_lesson: body.id_user_lesson,
        id_subjects_lesson: body.id_subjects_lesson,
        title: body.title,
        description: body.description,
      };
      await lessonHandler.update(data);

      return {
        message: "Lição atualizada.",
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
    body: lessonBody,
  },
);

lessonRoutes.delete(
  "/:id",
  async ({ params: { id } }) => await lessonHandler.remove(id),
  {
    params: lessonParams,
  },
);

export { lessonRoutes };
