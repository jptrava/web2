const alunosModel = require("../models/alunosModel");
const turmasModel = require("../models/turmasModel");

const obterAlunos = (req, res) => {
    try {
        const { nome, turma } = req.query;
        let alunos = alunosModel.obterAlunos();

        if (nome) {
            alunos = alunos.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()));
        }

        if (turma) {
            alunos = alunos.filter(a => a.id_turma === turma);
        }

        res.json(alunos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao obter alunos", detalhes: error.message });
    }
};

const obterAlunoPorId = (req, res) => {
    try {
        const id = Number(req.params.id);
        const aluno = alunosModel.obterAlunoPorId(id);

        if (!aluno) {
            return res.status(404).json({ erro: "Aluno não encontrado" });
        }

        res.json(aluno);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao obter aluno", detalhes: error.message });
    }
};

const criarAluno = (req, res) => {
    try {
        const { nome, protocolo, id_turma, email } = req.body;

        if (!nome || !protocolo || !id_turma) {
            return res.status(400).json({ erro: "Campos obrigatórios: nome, protocolo, id_turma" });
        }

        const turma = turmasModel.obterTurmaPorId(id_turma);
        if (!turma) {
            return res.status(400).json({ erro: "Turma informada não existe" });
        }

        const novo = alunosModel.criarAluno({ nome, prontuario: protocolo, id_turma, email });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar aluno", detalhes: error.message });
    }
};

const atualizarAluno = (req, res) => {
    try {
        const id = Number(req.params.id);
        const dados = req.body;

        if (dados.id_turma) {
            const turma = turmasModel.obterTurmaPorId(dados.id_turma);
            if (!turma) {
                return res.status(400).json({ erro: "Turma informada para atualização não existe" });
            }
        }

        const atualizado = alunosModel.atualizarAluno(id, dados);
        res.json(atualizado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

const deletarAluno = (req, res) => {
    try {
        const id = Number(req.params.id);
        const alunoRemovido = alunosModel.deletarAluno(id);
        res.json({ mensagem: "Aluno removido com sucesso", aluno: alunoRemovido });
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

module.exports = {
    obterAlunos,
    obterAlunoPorId,
    criarAluno,
    atualizarAluno,
    deletarAluno,
};
