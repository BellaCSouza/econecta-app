const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configura o body parser para tratar o JSON recebido no corpo das requisições
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: '127.0.0.1', // Endereço do servidor MySQL
  user: 'root',      // Usuário MySQL
  password: '',      // Senha do MySQL
  database: 'db_econecta' // Nome do banco de dados
});

// Conecta ao banco de dados MySQL
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para inserir um novo usuário na tabela tb_usuario
app.post('/register', (req, res) => {
  const { nome_usuario, email, senha, cpf, cep, logadouro, numero, complemento, bairro, cidade, estado, pais } = req.body;

  const query = `
    INSERT INTO tb_usuario 
    (nome_usuario, email, senha, cpf, cep, logadouro, numero, complemento, bairro, cidade, estado, pais) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nome_usuario, email, senha, cpf, cep, logadouro, numero, complemento, bairro, cidade, estado, pais], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário: ', err);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    } else {
      res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
const cors = require('cors');
app.use(cors());