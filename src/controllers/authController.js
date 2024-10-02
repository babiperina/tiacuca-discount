const { client } = require('../config/db'); // Importa o client do MongoDB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar um novo usuário
const registerUser = async (req, res) => {
  try {
    const { telefone, password, roles } = req.body;
    const db = client.db('coupons_db'); // Nome do banco de dados
    const collection = db.collection('users'); // Nome da coleção

    // Verifica se o usuário já existe
    const existingUser = await collection.findOne({ telefone });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const newUser = {
      telefone,
      password: hashedPassword,
      roles: ['users'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString() 
    };

    // Inserir o novo usuário no MongoDB
    await collection.insertOne(newUser);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
};

// Fazer login do usuário
const loginUser = async (req, res) => {
  try {
    const { telefone, password } = req.body;
    const db = client.db('coupons_db'); // Nome do banco de dados
    const collection = db.collection('users'); // Nome da coleção

    const user = await collection.findOne({ telefone });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { telefone:user.telefone, roles:user.roles } });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

// Verificar o token JWT (middleware opcional para proteger rotas)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Adicionar o ID do usuário na requisição para uso posterior
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

// Função para retornar os dados do usuário autenticado
const getUserProfile = async (req, res) => {
  try {
    const db = client.db('users_db'); // Nome do banco de dados
    const collection = db.collection('users'); // Nome da coleção

    // Buscar usuário pelo ID (adicionado pelo middleware verifyToken)
    const user = await collection.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error.message);
    res.status(500).json({ error: 'Erro ao buscar o perfil do usuário' });
  }
};
// Exportar os controladores
module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getUserProfile
};
