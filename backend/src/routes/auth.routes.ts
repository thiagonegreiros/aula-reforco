import { Elysia, t } from "elysia";
import { AuthenticateHandler } from "../handlers/auth.handler";

const authRoutes = new Elysia({ prefix: "/auth" });
const authHandler = new AuthenticateHandler();

authRoutes.post(
  "/",
  async ({ body }) => {
    try {
      return authHandler.authenticate(body);
    } catch (error) {
      return {
        message: "" + error,
        status: 500,
      };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  },
);

export { authRoutes };
