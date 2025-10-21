const express = require('express');
const path = require('path');
const tarefaController = require('./src/controllers/tarefaController');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Roteador da API
app.use('/tarefas', tarefaController);

// Rota principal para servir o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});