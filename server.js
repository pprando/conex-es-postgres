
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Configuração do pool de conexões com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
});

// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

app.get('/query', (req, res) => {
  const sql = `SELECT * FROM public.pessoas`;
  pool.query(sql, (error, results) => {
    if(error) throw new error;
    res.status(200).json(results.rows);
  });

});

// Rota para lidar com a requisição POST do front-end
app.post('/query', (req, res) => {
  const { query } = req.body; res.json(query);

  // Executa a consulta no banco de dados
  /*
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    } else {
      res.json(results.rows);
    }
  });
  */
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
