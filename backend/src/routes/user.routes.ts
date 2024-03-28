import { Elysia } from "elysia";
import { UsersHandler } from "../handlers/users.handler";
import {
  createUserSchema,
  findParamsUserSchema,
  updateUserSchema,
} from "../schemas/user.shema";
import { UpdateUserDto } from "../dtos/users/user.dto";

const userRoutes = new Elysia({ prefix: "/user" });
const userHandler = new UsersHandler();

userRoutes.get("/", async () => await userHandler.findAll());
userRoutes.get(
  "/:id",
  async ({ params: { id } }) => await userHandler.findById(id),
  {
    params: findParamsUserSchema,
  },
);

userRoutes.post(
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

userRoutes.put(
  "/:id",
  async ({ params, body }) => {
    try {
      const data: UpdateUserDto = {
        id: Number(params.id),
        name: body.name,
        password: body.password,
        born_date: new Date(body.born_date),
        email: body.email,
        role: body.role,
      };

      await userHandler.update(data);

      return {
        message: "Usuário atualizado.",
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
    body: updateUserSchema,
    transform({ body }) {
      if (body.born_date && typeof body.born_date === "string") {
        body.born_date = new Date(body.born_date);
      }
    },
  },
);

userRoutes.delete(
  "/:id",
  async ({ params: { id } }) => await userHandler.remove(id),
  {
    params: findParamsUserSchema,
  },
);

export { userRoutes };
