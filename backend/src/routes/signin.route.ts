import { Elysia } from "elysia";
import { createUserSchema } from "../schemas/user.schema";
import { UsersHandler } from "../handlers/users.handler";
import { Role } from ".prisma/client";

const userHandler = new UsersHandler();

const signInRoute = new Elysia({ prefix: "sign-in" }).post(
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

export { signInRoute };
