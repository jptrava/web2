const express = require("express");
const router = express.Router();
const alunosController = require("../controllers/alunosController");

/**
 * @swagger
 * tags:
 *   - name: Alunos
 *     description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtra alunos por nome
 *       - in: query
 *         name: turma
 *         schema:
 *           type: string
 *         description: Filtra alunos por ID da turma
 *     responses:
 *       200:
 *         description: Lista de alunos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro no servidor.
 */
router.get("/", alunosController.obterAlunos);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Dados do aluno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.get("/:id", alunosController.obterAlunoPorId);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoCriacao'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso.
 *       400:
 *         description: Dados de entrada inválidos.
 *       500:
 *         description: Erro no servidor.
 */
router.post("/", alunosController.criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoAtualizacao'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.put("/:id", alunosController.atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deleta um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno a ser deletado
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.delete("/:id", alunosController.deletarAluno);

module.exports = router;
