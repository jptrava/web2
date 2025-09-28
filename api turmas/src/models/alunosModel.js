let listaAlunos = [
    { id: 0, nome: "Andrey", prontuario: "JC3033872", id_turma: "WEB2", email: "andrey@gmail.com" },
    { id: 1, nome: "Lucas", prontuario: "JC3923452", id_turma: "WEB2", email: "lucas@gmail.com" },
];

const obterAlunos = () => listaAlunos;

const obterAlunoPorId = (id) => listaAlunos.find(a => a.id === id);

const criarAluno = (aluno) => {
    const novoId = listaAlunos.length ? Math.max(...listaAlunos.map(a => a.id)) + 1 : 0;
    const novo = { id: novoId, ...aluno };
    listaAlunos.push(novo);
    return novo;
};

const atualizarAluno = (id, dados) => {
    const idx = listaAlunos.findIndex(a => a.id === id);
    if (idx === -1) {
        throw new Error("Aluno não encontrado");
    }
    listaAlunos[idx] = { ...listaAlunos[idx], ...dados };
    return listaAlunos[idx];
};

const deletarAluno = (id) => {
    const idx = listaAlunos.findIndex(a => a.id === id);
    if (idx === -1) {
        throw new Error("Aluno não encontrado");
    }
    const removed = listaAlunos.splice(idx, 1)[0];
    return removed;
};

const deletarPorTurma = (id_turma) => {
    const antes = listaAlunos.length;
    listaAlunos = listaAlunos.filter(a => a.id_turma !== id_turma);
    const removidos = antes - listaAlunos.length;
    return removidos;
};

module.exports = {
    obterAlunos,
    obterAlunoPorId,
    criarAluno,
    atualizarAluno,
    deletarAluno,
    deletarPorTurma,
};
