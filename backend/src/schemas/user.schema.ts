import { Role } from "@prisma/client";
import { t } from "elysia";

export const createUserSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
  born_date: t.Date(),
  name: t.String(),
  role: t.Optional(t.Enum(Role)),
});

export const updateUserSchema = t.Object({
  id: t.Number(),
  email: t.String({ format: "email" }),
  password: t.String(),
  born_date: t.Date(),
  name: t.String(),
  role: t.Optional(t.Enum(Role)),
});

export const findParamsUserSchema = t.Object({
  id: t.Numeric(),
});
