const User = require('../models/userModel'); // Importa o "model"

// Buscar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(); // Usa a função do "model"
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

module.exports = {
  getUsers
};
