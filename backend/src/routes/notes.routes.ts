import { Elysia } from "elysia";
import { NotesHandler } from "../handlers/notes.handler";
import { noteBody, noteParams, noteUserParams } from "../schemas/notes.schema";

const notesHandler = new NotesHandler();
const notesRoutes = new Elysia({ prefix: "/note" });

notesRoutes.get("/", async () => await notesHandler.findAll());
notesRoutes.get(
  "/:id",
  async ({ params: { id } }) => await notesHandler.findById(id),
  {
    params: noteParams,
  },
);

notesRoutes.get(
  "/user/:id_user_notes",
  async ({ params: { id_user_notes } }) =>
    await notesHandler.findByUserId(id_user_notes),
  {
    params: noteUserParams,
  },
);

notesRoutes.post(
  "/",
  async ({ body }) => {
    try {
      await notesHandler.add(body);
      return {
        message: "Recado criado com sucesso",
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
    body: noteBody,
  },
);

notesRoutes.put(
  "/:id",
  async ({ params, body }) => {
    try {
      const data = {
        id: Number(params.id),
        id_user_notes: body.id_user_notes,
        note: body.note,
      };
      await notesHandler.update(data);

      return {
        message: "Recado atualizado.",
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
    body: noteBody,
  },
);

notesRoutes.delete(
  "/:id",
  async ({ params: { id } }) => await notesHandler.remove(id),
  {
    params: noteParams,
  },
);

export { notesRoutes };
