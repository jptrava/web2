const express = require("express");
const app = express();
const path = require("path");

// Middleware para servir arquivos estáticos da pasta 'view'
app.use(express.static(path.join(__dirname, 'view')));
// Middleware para servir arquivos estáticos da pasta 'src'
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware para tratar corpo de requisições JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas para as páginas HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get("/alunos", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'alunos.html'));
});

app.get("/turmas", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'turmas.html'));
});

app.get("/criar-aluno", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'criar-editar-aluno.html'));
});

app.get("/criar-turma", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'criar-editar-turma.html'));
});

// Importação das rotas da API
const alunosRoute = require("./routes/alunosRoute");
const turmasRoute = require("./routes/turmasRoute");

// Middleware de rotas da API
app.use("/api/alunos", alunosRoute);
app.use("/api/turmas", turmasRoute);

module.exports = app;