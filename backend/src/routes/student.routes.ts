import { Elysia } from "elysia";
import { StudentHandler } from "../handlers/students.handler";

const studentsRoutes = new Elysia({ prefix: "/student" });
const studentHandler = new StudentHandler();

studentsRoutes.get("/", studentHandler.findAll());

export { studentsRoutes };
