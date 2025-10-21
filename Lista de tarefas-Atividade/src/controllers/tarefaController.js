const express = require('express');
const tarefaModel = require('../models/tarefaModel');
const router = express.Router();

router.get('/', (req, res) => {
  const { feito } = req.query;
  let listaTarefas = tarefaModel.getAll();

  if (feito === 'true') {
    listaTarefas = listaTarefas.filter(t => t.feito === true);
  } else if (feito === 'false') {
    listaTarefas = listaTarefas.filter(t => t.feito === false);
  }

  res.json(listaTarefas);
});

router.post('/', (req, res) => {
  const { titulo, feito } = req.body;

  if (typeof titulo !== 'string' || titulo.trim() === '' || typeof feito === 'undefined') {
    return res.status(400).json({ erro: 'Título (string) e feito (boolean) são obrigatórios' });
  }

  const feitoBool = (feito === true || feito === 'true');
  const novaTarefa = tarefaModel.create(titulo, feitoBool);
  res.status(201).json({ mensagem: 'Tarefa criada com sucesso', tarefa: novaTarefa });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const { titulo, feito } = req.body;
  const feitoBool = (feito === true || feito === 'true');

  const tarefaAtualizada = tarefaModel.update(id, titulo, feitoBool);
  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json({ mensagem: 'Tarefa atualizada com sucesso', tarefa: tarefaAtualizada });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const removido = tarefaModel.remove(id);
  if (!removido) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json({ mensagem: 'Tarefa removida com sucesso' });
});

module.exports = router;