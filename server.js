const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do pool de conexões com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432,
});

// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Rota para lidar com a requisição POST do front-end
app.post('/query', (req, res) => {
  const { query } = req.body;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    } else {
      res.json(results.rows);
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
