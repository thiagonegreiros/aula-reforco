import { Elysia } from "elysia";
import { createUserSchema } from "../schemas/user.schema";
import { UsersHandler } from "../handlers/users.handler";

const userHandler = new UsersHandler();

const signUpRoute = new Elysia({ prefix: "sign-up" }).post(
  "/",
  async ({ body }) => {
    try {
      await userHandler.add(body);
      return {
        message: "Usuário criado com sucesso",
        status: 200,
      };
    } catch (error) {
      return {
        message: String(error.message),
        status: error.statusCode,
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

export { signUpRoute };
