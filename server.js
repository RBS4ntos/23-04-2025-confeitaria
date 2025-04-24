// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'senac@02',
    database: 'confeitaria'
});

app.post('/api/mysql', async (req, res) => {
    const { nome, login, senha, tipo, resultado } = req.body;
    switch (tipo){
        case 'cadastro':
            try {
                var [rows, fields] = await pool.query(
                    "insert into `confeitaria`.`tbl_clientes` (`nome`, `login`, `senha`) values (?, ?, ?);",
                    [nome, login, senha]
                );
                if (rows.affectedRows > 0) {
                    res.json({ message: 'Usuário cadastrado com sucesso! Entre no menu de login'});
                } else {
                    throw ('Não foi possível cadastrar o usuário!');
                }
            } catch (err) {
                res.status(500).json({
                    message: `Erro de cadastro: ${err}`,
                    error: `Erro de cadastro: ${err}`
                });
            }
        break;
        case 'login':
            try {
                var [rows, fields] = await pool.query(
                    "select * from `confeitaria`.`tbl_clientes` where `nome` = ? and `login` = ? and `senha` = ?;",
                    [nome, login, senha]
                );
                if (rows.length == 1) {
                    res.json({ message: 'Usuário logado com sucesso!'});
                    resultado = 1;
                } else {
                    throw ("Não foi possível logar o usuário");
                }
            }
            catch (err) {
                res.status(500).json({
                    message: `Erro de login: ${err}`,
                    error: `Erro de login: ${err}`
                })
            }
        break;
        default:
            throw ("Não foi possível identificar o tipo!");
        }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
