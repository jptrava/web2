const express = require("express");
const app = express();
const path = require("path");

// Middleware para servir arquivos estáticos da pasta 'view'
app.use(express.static(path.join(__dirname, 'view')));

// Middleware para tratar corpo de requisições JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importação das rotas
const alunosRoute = require("./routes/alunosRoute");
const turmasRoute = require("./routes/turmasRoute");

// Middleware de rotas
app.use("/alunos", alunosRoute);
app.use("/turmas", turmasRoute);

module.exports = app;
