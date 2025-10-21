let tarefas = [];

function getAll() {
  return tarefas;
}

function getById(id) {
  return tarefas.find(t => t.id === id);
}

function create(titulo, feito) {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo: titulo.trim(),
    feito: feito
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function update(id, titulo, feito) {
  const tarefa = getById(id);
  if (!tarefa) {
    return null;
  }
  if (titulo !== undefined) {
    tarefa.titulo = titulo.trim();
  }
  if (feito !== undefined) {
    tarefa.feito = feito;
  }
  return tarefa;
}

function remove(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return false;
  }
  tarefas.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};