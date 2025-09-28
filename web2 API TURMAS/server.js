const express = require("express");
const path = require("path");
const aplicacao = require("./src/app"); // seu app express principal
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Cadastro de Alunos e Turmas",
      version: "1.0.0",
      description: "API para gerenciar alunos e turmas do IFSP Jacareí.",
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      { name: "Alunos", description: "Operações relacionadas aos alunos" },
      { name: "Turmas", description: "Operações relacionadas às turmas" },
    ],
    components: {
      schemas: {
        Aluno: {
          type: "object",
          properties: {
            id: { type: "integer", description: "ID único do aluno" },
            nome: { type: "string", description: "Nome completo do aluno" },
            prontuario: { type: "string", description: "Número de matrícula" },
            id_turma: { type: "string", description: "ID da turma à qual o aluno pertence" },
            email: { type: "string", description: "Endereço de email do aluno" },
          },
          example: {
            id: 0,
            nome: "João Herba",
            prontuario: "JC123",
            id_turma: "WEB1",
            email: "joao.herba@exemplo.com",
          },
        },
        AlunoCriacao: {
          type: "object",
          required: ["nome", "prontuario", "id_turma"],
          properties: {
            nome: { type: "string", description: "Nome completo do aluno" },
            prontuario: { type: "string", description: "Número de matrícula" },
            id_turma: { type: "string", description: "ID da turma" },
            email: { type: "string", description: "Endereço de email do aluno" },
          },
        },
        AlunoAtualizacao: {
          type: "object",
          properties: {
            nome: { type: "string", description: "Novo nome do aluno" },
            prontuario: { type: "string", description: "Novo número de matrícula" },
            id_turma: { type: "string", description: "Novo ID da turma" },
            email: { type: "string", description: "Novo email do aluno" },
          },
        },
        Turma: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID da turma (ex: INFO1)" },
            nome: { type: "string", description: "Nome da turma" },
          },
          example: {
            id: "WEB1",
            nome: "PROGRAMAÇÃO WEB1",
          },
        },
        TurmaComAlunos: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID da turma" },
            nome: { type: "string", description: "Nome da turma" },
            quantidade_alunos: { type: "integer", description: "Número de alunos na turma" },
          },
          example: {
            id: "WEB1",
            nome: "PROGRAMAÇÃO WEB1",
            quantidade_alunos: 25,
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve os arquivos estáticos (CSS, JS, etc) da pasta src/view
aplicacao.use("/src/view", express.static(path.join(__dirname, "src/view")));

// Configuração das rotas do Swagger
aplicacao.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Porta do servidor
const PORTA = process.env.PORT || 3000;

// Inicializa o servidor
aplicacao.listen(PORTA, () => {
  console.log(`Servidor ativo em: http://localhost:${PORTA}`);
  console.log(`Documentação da API disponível em: http://localhost:${PORTA}/api-docs`);
});
