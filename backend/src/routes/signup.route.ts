import { Elysia, t } from "elysia";
import { createUserSchema } from "../schemas/user.schema";
import { UsersHandler } from "../handlers/users.handler";
import { HashProvider } from "../provider/hash.provider";

const userHandler = new UsersHandler();
const hashPassword = new HashProvider();

const signUpRoute = new Elysia({ prefix: "/sign-up" });

signUpRoute.post(
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

signUpRoute.post(
  "/hash",
  async ({ body }) => {
    return hashPassword.generateHash(body.pharse);
  },
  {
    body: t.Object({
      pharse: t.String(),
    }),
  },
);

export { signUpRoute };
