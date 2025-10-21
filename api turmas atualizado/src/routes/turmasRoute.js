const express = require("express");
const router = express.Router();
const turmasController = require("../controllers/turmasController");

/**
 * @swagger
 * tags:
 *   - name: Turmas
 *     description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Retorna todas as turmas
 *     tags: [Turmas]
 *     description: Retorna um array completo com todas as turmas e a quantidade de alunos em cada uma.
 *     responses:
 *       200:
 *         description: Lista de turmas com a contagem de alunos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TurmaComAlunos'
 *       500:
 *         description: Erro no servidor.
 */
router.get("/", turmasController.obterTurmas);

/**
 * @swagger
 * /turmas/{id}:
 *   get:
 *     summary: Retorna uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Dados da turma.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       404:
 *         description: Turma não encontrada.
 *       500:
 *         description: Erro no servidor.
 */
router.get("/:id", turmasController.obterTurmaPorId);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso.
 *       400:
 *         description: Dados de entrada inválidos.
 */
router.post("/", turmasController.criarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso.
 *       404:
 *         description: Turma não encontrada.
 */
router.put("/:id", turmasController.atualizarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Deleta uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma a ser deletada
 *     responses:
 *       200:
 *         description: Turma e seus alunos removidos com sucesso.
 *       404:
 *         description: Turma não encontrada.
 */
router.delete("/:id", turmasController.deletarTurma);

module.exports = router;
