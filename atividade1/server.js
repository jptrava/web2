
// server.js
const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/apis', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');

    const breedsObj = response.data.message;

    const breeds = Object.keys(breedsObj);

    const sortedBreeds = _.sortBy(breeds);

    res.json({ breeds: sortedBreeds });
  } catch (error) {
    console.error('Erro ao buscar raças de cães:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API de cães.' });
  }
});

app.listen(PORT, () => {
  console.log(`🐶 Servidor rodando em http://localhost:${PORT}/apis`);
});
