const express = require("express");
const app = express();
const path = require("path");
const port = 80;
const bodyParser = require('body-parser');
const { createTodo, showTodo, editTodo, deleteTodo } = require("./todoService");
const { todoModel } = require("./todoModel")
const { dbConnect } = require("./dbConn")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static('static'))
app.use(express.urlencoded())

app.use(express.urlencoded())
//set the tamplet engine as pug
app.set('view engine', 'pug')

//view directory
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res) => {
    res.status("200").sendFile(path.join(__dirname, "views", "index.html"))
})
app.get("/create", (req, res) => {
    res.status(200).render('create.pug', {
        title: "ToDoList"
    })
})
//edit form 
app.get("/create/:id", (req, res) => {
    todoModel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('edit.pug', {
                create: doc
            })
        }
        else
            console.log("error");
    })
})
app.post("/create", [createTodo])
app.get("/show", [showTodo])
app.post("/edit", [editTodo])
app.get("/create/delete/:id", [deleteTodo])

dbConnect().then(_ => { // Connection establishing of DB with dev or prod url.
    app.listen(port, () => {
        console.log(`Server is Running at http://127:0.0.1:${port}`);
    })
})
