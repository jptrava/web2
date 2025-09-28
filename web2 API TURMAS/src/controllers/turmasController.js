const turmasModel = require("../models/turmasModel");
const alunosModel = require("../models/alunosModel");

const obterTurmas = (req, res) => {
    try {
        const turmasComAlunos = turmasModel.obterTurmas().map(turma => {
            const alunosDaTurma = alunosModel.obterAlunos().filter(aluno => aluno.id_turma === turma.id);
            return {
                ...turma,
                quantidade_alunos: alunosDaTurma.length
            };
        });
        res.json(turmasComAlunos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao obter turmas", detalhes: error.message });
    }
};

const obterTurmaPorId = (req, res) => {
    try {
        const id = req.params.id;
        const turma = turmasModel.obterTurmaPorId(id);
        if (!turma) {
            return res.status(404).json({ erro: "Turma não encontrada" });
        }
        res.json(turma);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao obter turma", detalhes: error.message });
    }
};

const criarTurma = (req, res) => {
    try {
        const { id, nome } = req.body;
        if (!id || !nome) {
            return res.status(400).json({ erro: "Campos obrigatórios: id, nome" });
        }
        const nova = turmasModel.criarTurma({ id, nome });
        res.status(201).json(nova);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

const atualizarTurma = (req, res) => {
    try {
        const id = req.params.id;
        const atualizada = turmasModel.atualizarTurma(id, req.body);
        res.json(atualizada);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

const deletarTurma = (req, res) => {
    try {
        const id = req.params.id;
        const turmaRemovida = turmasModel.deletarTurma(id);
        const alunosRemovidos = alunosModel.deletarPorTurma(id);
        res.json({ mensagem: "Turma removida com sucesso", turma: turmaRemovida, alunosRemovidos });
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

module.exports = {
    obterTurmas,
    obterTurmaPorId,
    criarTurma,
    atualizarTurma,
    deletarTurma,
};
