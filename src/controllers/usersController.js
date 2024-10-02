const User = require('../models/userModel'); // Importa o "model"


const changeUserRoleByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID do usuário da URL
    const { newRole } = req.body; // Pega o novo role do corpo da requisição

    // Atualiza o role do usuário
    const user = await User.updateUserRoleById(id, newRole);
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao alterar o role do usuário:', error.message);
    res.status(500).json({ error: 'Erro ao alterar o role do usuário' });
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
  getUsers,
  changeUserRoleByUserId
};
