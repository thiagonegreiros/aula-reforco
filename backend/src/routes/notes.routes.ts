import { Elysia, t } from "elysia";
import { NotesHandler } from "../handlers/notes.handler";
import { createNoteType } from "../dtos/notes/createNote.dto";

const notesRoutes = new Elysia({ prefix: "/note" });
const notesHandler = new NotesHandler();

notesRoutes.get("/", notesHandler.findAll());
notesRoutes.get(
  "/:id",
  async ({ params: { id } }) => notesHandler.findById(id),
  {
    params: t.Object({
      id: t.Numeric(),
    }),
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
    body: createNoteType,
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
    body: t.Object({
      id_user_notes: t.Number(),
      note: t.String(),
    }),
  },
);

export { notesRoutes };
