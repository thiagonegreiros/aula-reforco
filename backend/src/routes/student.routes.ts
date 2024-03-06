import { Elysia, t } from "elysia";
import { StudentHandler } from "../handlers/students.handler";

const studentsRoutes = new Elysia({ prefix: "/student" });
const studentHandler = new StudentHandler();

studentsRoutes.get("/", studentHandler.findAll());
studentsRoutes.get("/:id", async({params})=>{
    const findById = await studentHandler.findById(Number(params.id));
    return findById;
});

studentsRoutes.post("/", async({body})=>{
    const add = await studentHandler.add(body);
    return {
        response: "Usuário Cadastrado - "+add.name,
    };
},{
    body:t.Object({
        name: t.String(),
        responsable_name: t.String(),
        responsable_number: t.String(),
    })
});

export { studentsRoutes };
