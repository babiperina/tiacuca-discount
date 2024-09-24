const Role = require('../models/rolesModel'); // Importa o modelo Role

// Criar um novo papel
const createRole = async (req, res) => {
  try {
    const { role_name, permissions, description } = req.body;

    // Verifica se o papel já existe
    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      return res.status(400).json({ message: 'Papel já existe' });
    }

    // Criar um novo papel
    const newRole = new Role({
      role_name,
      permissions,
      description
    });

    // Salvar no MongoDB
    await newRole.save();

    res.status(201).json({ message: 'Papel criado com sucesso!', role: newRole });
  } catch (error) {
    console.error('Erro ao criar papel:', error.message);
    res.status(500).json({ error: 'Erro ao criar o papel' });
  }
};

// Buscar todos os papéis
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Erro ao buscar papéis:', error.message);
    res.status(500).json({ error: 'Erro ao buscar papéis' });
  }
};

// Buscar um papel específico pelo ID
const getRoleByName = async (req, res) => {
    try {
      const { role_name } = req.params; // Pega o role_name da URL
      const role = await Role.findOne({ role_name }); // Busca pelo role_name
  
      if (!role) {
        return res.status(404).json({ message: 'Papel não encontrado' });
      }
  
      res.status(200).json(role);
    } catch (error) {
      console.error('Erro ao buscar papel:', error.message);
      res.status(500).json({ error: 'Erro ao buscar o papel' });
    }
  };

// Atualizar um papel
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, permissions, description } = req.body;

    // Buscar e atualizar o papel
    const updatedRole = await Role.findByIdAndUpdate(id, {
      role_name,
      permissions,
      description,
      updated_at: Date.now() // Atualiza manualmente a data de atualização
    }, { new: true }); // `new: true` retorna o documento atualizado

    if (!updatedRole) {
      return res.status(404).json({ message: 'Papel não encontrado' });
    }

    res.status(200).json({ message: 'Papel atualizado com sucesso', role: updatedRole });
  } catch (error) {
    console.error('Erro ao atualizar papel:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar o papel' });
  }
};

// Excluir um papel
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar e remover o papel
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: 'Papel não encontrado' });
    }

    res.status(200).json({ message: 'Papel excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir papel:', error.message);
    res.status(500).json({ error: 'Erro ao excluir o papel' });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleByName,
  updateRole,
  deleteRole
};
