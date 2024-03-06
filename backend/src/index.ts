import { Elysia } from "elysia";
import { studentsRoutes } from "./routes/student.routes";

const app = new Elysia();

// Routes
app.use(studentsRoutes);

// Start Server
app.listen(3001, () => console.log("Server started at http://localhost:3001"));
