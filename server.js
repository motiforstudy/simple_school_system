import express from "express";
import studentsRouter from "./routers/students.js";
import connection from "./db.js";

const app = express();
app.use(express.json());

app.use("/students",studentsRouter)

app.listen(3000, ()=>{
    console.log("the server is ready: ");
})