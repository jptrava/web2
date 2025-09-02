const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = 3000;

// Array de tarefas começa vazio
let tarefas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/tarefas', (req, res) => {
  const { feito } = req.query;

  if (feito === 'true') {
    return res.json(tarefas.filter(t => t.feito === true));
  }
  if (feito === 'false') {
    return res.json(tarefas.filter(t => t.feito === false));
  }
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { titulo, feito } = req.body;

  if (typeof titulo !== 'string' || titulo.trim() === '' || typeof feito === 'undefined') {
    return res.status(400).json({ erro: 'Título (string) e feito (boolean) são obrigatórios' });
  }

  const feitoBool = (feito === true || feito === 'true');
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo: titulo.trim(),
    feito: feitoBool
  };

  tarefas.push(novaTarefa);
  res.status(201).json({ mensagem: 'Tarefa criada com sucesso', tarefa: novaTarefa });
});

app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const { titulo, feito } = req.body;
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  if (titulo !== undefined) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      return res.status(400).json({ erro: 'Título inválido' });
    }
    tarefa.titulo = titulo.trim();
  }

  if (feito !== undefined) {
    tarefa.feito = (feito === true || feito === 'true');
  }

  res.json({ mensagem: 'Tarefa atualizada com sucesso', tarefa });
});

app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas.splice(index, 1);
  res.json({ mensagem: 'Tarefa removida com sucesso', tarefas });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});