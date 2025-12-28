import express from "express";
import connection from "../db.js";
import send from "send";

let studentsRouter = express();

studentsRouter.post("",async (req, res)=>{
    try{
        let getBody = req.body     
        await connection.query(
            `INSERT INTO students (name, age, class_name) VALUES ('${getBody["name"]}', '${getBody["age"]}', '${getBody["className"]}')`
        )
        let [rows] = `SELECT * FROM students WHERE name = '${getBody["name"]}'`
        res.send(await connection.query(rows))
        
    }catch (error){
        res.send("the problem is in post", error)   
    }
})

studentsRouter.get("", async(req, res)=>{
    try{
        let sql = "SELECT * FROM students"
        let getAllStudents = await connection.query(sql)
        let getCountStudents = getAllStudents[0].length
        res.send({count: getCountStudents,students: getAllStudents[0]})
    }catch (error){
        res.send("there is a problem in get all students")
    }
})

studentsRouter.get("/:id", async (req, res)=>{
    try{
        let getId = req.params.id     
        let sql = "SELECT * FROM students"
        let getAllStudents = await connection.query(sql);
        for (let student of getAllStudents[0]){
            if (student["id"] === Number (getId)){
                return res.send(student)
            }
        }
        res.send("no found student with this id")
    }catch(error){
        res.send("the problem is in get student by id")
    }
});

studentsRouter.put("/:id", async (req, res)=>{
    try{
        let getId = req.params.id
        let getBody = req.body 
        let sql = "SELECT * FROM students"
        let getAllStudents = await connection.query(sql);
        for (let student of getAllStudents[0]){
            if (student["id"] === Number (getId)){
                student["name"] = getBody["name"]
                student["age"] = Number (getBody["age"])
                student["class_name"] = getBody["className"]
                return res.send({
                    "id": Number (getId),
                    "name": getBody["name"],
                    "age": Number (getBody["age"]),
                    "className": getBody["className"]
                })
            }
        }
        res.send("no found student with this id")
    }catch(error){
        res.send("the problem is in update student by id")
    }
})

studentsRouter.delete(":id", async (req, res)=>{
    try{
        let getId = req.params.id     
        let sql = "SELECT * FROM students"
        let getAllStudents = await connection.query(sql);
        let count = 0
        for (let student of getAllStudents[0]){
            if (student["id"] === Number (getId)){
                getAllStudents.splice(count)
                return res.send({"message": "Student deleted"})
            }
            count ++
        }
        res.send("no found student with this id")
    }catch(error){
        res.send("the problem is in delete student by id")
    }
})

export default studentsRouter