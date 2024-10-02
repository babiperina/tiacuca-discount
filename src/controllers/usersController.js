const User = require('../models/userModel'); // Importa o "model"


// Buscar um papel específico pelo ID
const getUserByTelefone = async (req, res) => {
  try {
    const { telefone } = req.params; // Pega o role_name da URL
    const role = await collection.findOne({ telefone }); // Busca pelo role_name

    if (!role) {
      return res.status(404).json({ message: 'Papel não encontrado' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error('Erro ao buscar papel:', error.message);
    res.status(500).json({ error: 'Erro ao buscar o papel' });
  }
};

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
