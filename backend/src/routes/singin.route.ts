import { Elysia } from "elysia";
import { AuthenticateHandler } from "../handlers/auth.handler";
import { createUserSchema } from "../schemas/user.schema";
import { UsersHandler } from "../handlers/users.handler";
import { Role } from ".prisma/client";

const userHandler = new UsersHandler();

const singInRoute = new Elysia({ prefix: "sing-in" }).post(
  "/",
  async ({ body }) => {
    try {
      if (body.role === Role.STUDENT) {
        await userHandler.add(body);
        return {
          message: "Usuário criado com sucesso",
          status: 200,
        };
      } else {
        throw new Error("Não é possível criar usuário de outra função.");
      }
    } catch (error) {
      return {
        message: "Error - " + error,
        status: 500,
      };
    }
  },
  {
    body: createUserSchema,
    transform({ body }) {
      if (body.born_date && typeof body.born_date === "string") {
        body.born_date = new Date(body.born_date);
      }
    },
  },
);

export { singInRoute };
