const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname, 'view')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const alunosRoute = require("./routes/alunosRoute");
const turmasRoute = require("./routes/turmasRoute");


app.use("/alunos", alunosRoute);
app.use("/turmas", turmasRoute);

module.exports = app;
