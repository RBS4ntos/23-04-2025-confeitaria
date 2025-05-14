import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// Criar pasta de uploads se não existir
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // Nome único com timestamp
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB
});

const pool = mysql.createPool({
    host: 'switchyard.proxy.rlwy.net',
    port: 33052,
    user: 'root',
    password: 'myksRJYWeuHmzxnnlVniEBzfVlWWLPMC',
    database: 'railway'
});

app.post('/api/mysql', upload.single('foto'), async (req, res) => {
    const { nome, login, senha, foto, tipo } = req.body;
    const caminhoImagem = req.file?.path; // Caminho da imagem (se existir)

    switch (tipo) {
        case 'cadastro':
            try {
                // Validação de tipo de arquivo
                if (req.file && !req.file.mimetype.startsWith('image/')) {
                    fs.unlinkSync(req.file.path);
                    return res.status(400).json({ error: 'Apenas imagens são permitidas!' });
                }

                // Validação básica
                if (!nome || !login || !senha) {
                    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
                }

                // Insere no banco (com ou sem imagem)
                const [rows] = await pool.query(
                    "INSERT INTO `railway`.`usuarios` (`nome`, `login`, `senha`, `foto`) VALUES (?, ?, ?, ?)",
                    [nome, login, senha, foto ]
                );

                if (rows.affectedRows > 0) {
                    res.json({ 
                        success: true,
                        message: 'Usuário cadastrado com sucesso!',
                        fotoUrl: foto ? `/uploads/${path.basename(foto)}`  : null
                    });
                } else {
                    throw new Error('Falha ao inserir no banco de dados.');
                }
            } catch (err) {
                console.error('Erro no cadastro:', err);
                res.status(500).json({ 
                    success: false,
                    error: 'Erro no cadastro.',
                    detalhes: err.message.includes('Duplicate entry') ? 'Este login já está em uso' : err.message
                });
            }
            break;

        case 'login':
            try {
                const [rows] = await pool.query(
                    "SELECT * FROM `railway`.`usuarios` WHERE `login` = ? AND `senha` = ?",
                    [login, senha]
                );

                if (rows.length === 1) {
                    res.json({ 
                        success: true,
                        message: 'Login realizado com sucesso!',
                        usuario: {
                            nome: rows[0].nome,
                            login: rows[0].login,
                            foto: rows[0].foto ? `/uploads/${path.basename(rows[0].foto)}` : null
                        }
                    });
                } else {
                    throw new Error('Login ou senha incorretos.');
                }
            } catch (err) {
                res.status(401).json({ 
                    success: false,
                    error: 'Erro no login.',
                    detalhes: err.message 
                });
            }
            break;

        default:
            res.status(400).json({ error: 'Tipo de operação inválido!' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});