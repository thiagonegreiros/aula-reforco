import { Elysia } from "elysia";
import { studentsRoutes } from "./routes/student.routes";
import { notesRoutes } from "./routes/notes.routes";
import { userRoutes } from "./routes/user.routes";
import { lessonRoutes } from "./routes/lessons.routes";

const app = new Elysia();

// Routes
app.use(studentsRoutes);
app.use(notesRoutes);
app.use(userRoutes);
app.use(lessonRoutes);

// Start Server
app.listen(3001, () => console.log("Server started at http://localhost:3001"));
