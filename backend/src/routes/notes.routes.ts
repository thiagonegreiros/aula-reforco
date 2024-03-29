import { Elysia } from "elysia";
import { NotesHandler } from "../handlers/notes.handler";
import { noteBody, noteParams, noteUserParams } from "../schemas/notes.schema";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";
import { Role } from ".prisma/client";
import { verify } from "jsonwebtoken";
interface TokenPayload {
  sub: string;
  role: Role;
}

const notesHandler = new NotesHandler();
/*const notesRoutes = new Elysia({ prefix: "/note" }).guard(
  {
    beforeHandle: ({ headers }) => {
      const authToken = headers.authorization;
      if (!authToken) {
        return {
          message: "Auth token dont provided",
        };
      }

      const [, token] = authToken.split(" ");

      try {
        if (process.env.JWT_SECRET === undefined) {
          throw new Error("error on sync enviroment variables");
        }

        const decoded = verify(token, process.env.JWT_SECRET) as TokenPayload;

        headers.role = decoded.role;
      } catch (err: any) {
        return {
          message: err.message || "invalid token",
        };
      }
    },
  },
  (app) => app.get("/", async () => await notesHandler.findAll()),
);*/
const notesRoutes = new Elysia({ prefix: "/note" }).guard(
  {
    beforeHandle: ({ headers }) => ensureAuthenticate(headers),
  },
  (app) => app.get("/", async () => await notesHandler.findAll()),
);

//notesRoutes.get("/", async () => await notesHandler.findAll());
/*notesRoutes.get(
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
);*/

export { notesRoutes };
