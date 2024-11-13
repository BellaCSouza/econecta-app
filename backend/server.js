const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurações
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'db_econecta',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para registrar usuário
app.post('/register', (req, res) => {
  const { nome_usuario, email, senha, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, pais } = req.body;

  if (!nome_usuario || !email || !senha) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const query = `
    INSERT INTO tb_usuario_teste 
    (nome_usuario, email, senha, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, pais) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome_usuario, email, senha, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, pais], (err) => {
    if (err) {
      console.error('Erro ao cadastrar:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
