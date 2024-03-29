import { Elysia } from "elysia";
import { studentsRoutes } from "./routes/student.routes";
import { notesRoutes } from "./routes/notes.routes";
import { userRoutes } from "./routes/user.routes";
import { lessonRoutes } from "./routes/lessons.routes";
import swagger from "@elysiajs/swagger";
import { authRoutes } from "./routes/auth.routes";
import { ensureAuthenticate } from "./middleware/ensureAuthenticate";
import { singInRoute } from "./routes/singin.route";

const server = new Elysia();

// Swagger
server.use(swagger());

// Routes without authenticate
server.use(authRoutes);
server.use(singInRoute);

//Guard
server.guard(
  {
    beforeHandle: ({ headers }) => ensureAuthenticate(headers),
  },
  (app) =>
    (
      //Routes
      app.use(studentsRoutes),
      app.use(notesRoutes),
      app.use(userRoutes),
      app.use(lessonRoutes)
    ),
);

// Start Server
server.listen(3001, () =>
  console.log("Server started at http://localhost:3001"),
);
