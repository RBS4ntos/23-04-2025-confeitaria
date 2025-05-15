import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

const pool = mysql.createPool({
    host: 'switchyard.proxy.rlwy.net',
    port: 33052,
    user: 'root',
    password: 'myksRJYWeuHmzxnnlVniEBzfVlWWLPMC',
    database: 'railway'
});

app.post('/api/mysql', async (req, res) => {
    const { nome, login, senha, tipo } = req.body;
    
    // Verificação básica dos campos obrigatórios
    if (!tipo) {
        return res.status(400).json({ error: "Tipo de operação não especificado" });
    }

    switch (tipo) {
        case 'cadastro':
            try {
                if (!nome || !login || !senha) {
                    return res.status(400).json({ error: "Todos os campos são obrigatórios para cadastro" });
                }

                const [rows] = await pool.query(
                    "INSERT INTO usuario (nome, login, senha) VALUES (?, ?, ?)",
                    [nome, login, senha]
                );

                if (rows.affectedRows > 0) {
                    return res.json({ 
                        success: true,
                        message: 'Usuário cadastrado com sucesso! Entre no menu de login'
                    });
                } else {
                    throw new Error('Não foi possível cadastrar o usuário!');
                }
            } catch (err) {
                console.error('Erro no cadastro:', err);
                return res.status(500).json({
                    success: false,
                    error: err.message.includes('Duplicate entry') ? 
                        'Este login já está em uso' : 'Erro no cadastro'
                });
            }

        case 'login':
            try {
                if (!login || !senha) {
                    return res.status(400).json({ error: "Login e senha são obrigatórios" });
                }

                const [rows] = await pool.query(
                    "SELECT * FROM usuario WHERE login = ? AND senha = ?",
                    [login, senha]
                );

                if (rows.length === 1) {
                    return res.json({ 
                        success: true,
                        message: 'Usuário logado com sucesso!',
                        usuario: {
                            nome: rows[0].nome,
                            login: rows[0].login,
                        }
                    });
                } else {
                    throw new Error('Login ou senha incorretos');
                }
            } catch (err) {
                console.error('Erro no login:', err);
                return res.status(401).json({
                    success: false,
                    error: 'Erro no login',
                    message: err.message
                });
            }

        default:
            return res.status(400).json({ 
                success: false,
                error: 'Tipo de operação não reconhecido' 
            });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});