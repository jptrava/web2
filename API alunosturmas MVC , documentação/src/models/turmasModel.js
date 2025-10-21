let listaTurmas = [
    { id: "WEB2", nome: "Programação WEB 2" },
    { id: "BDD2", nome: "Banco de Dados 2" },
];

const obterTurmas = () => listaTurmas;

const obterTurmaPorId = (id) => listaTurmas.find(t => t.id === id);

const criarTurma = (turma) => {
    if (!turma.id) {
        throw new Error("Turma precisa de um ID único");
    }
    if (obterTurmaPorId(turma.id)) {
        throw new Error("Já existe uma turma com esse ID");
    }
    listaTurmas.push(turma);
    return turma;
};

const atualizarTurma = (id, dados) => {
    const idx = listaTurmas.findIndex(t => t.id === id);
    if (idx === -1) {
        throw new Error("Turma não encontrada");
    }
    // Se for atualizar o id, garantir que o novo id não conflite
    if (dados.id && dados.id !== id) {
        if (obterTurmaPorId(dados.id)) {
            throw new Error("Já existe outra turma com esse novo ID");
        }
    }
    listaTurmas[idx] = { ...listaTurmas[idx], ...dados };
    return listaTurmas[idx];
};

const deletarTurma = (id) => {
    const idx = listaTurmas.findIndex(t => t.id === id);
    if (idx === -1) {
        throw new Error("Turma não encontrada");
    }
    const removed = listaTurmas.splice(idx, 1)[0];
    return removed;
};

module.exports = {
    obterTurmas,
    obterTurmaPorId,
    criarTurma,
    atualizarTurma,
    deletarTurma,
};
