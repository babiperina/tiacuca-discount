const { client } = require('../config/db');

const db = client.db('coupons_db');
const collection = db.collection('permissions');

// Criar um novo papel
const createPermission = async (req, res) => {
  try {
    const { permission_name, description } = req.body;

    // Verifica se o papel já existe
    const existingRole = await collection.findOne({ permission_name });
    if (existingRole) {
      return res.status(400).json({ message: 'Permission já existe' });
    }

    // Criar um novo papel
    const newPermissions = {
      permission_name,
      description
    };

    // Salvar no MongoDB
    await collection.insertOne(newPermissions);
    res.status(201).json({ message: 'Permission criada com sucesso!', role: newPermissions });
  } catch (error) {
    console.error('Erro ao criar a permission:', error.message);
    res.status(500).json({ error: 'Erro ao criar a permission' });
  }
};

// Buscar todos os papéis
const getPermissions = async (req, res) => {
  try {
    const permissions = await collection.find({}).toArray();  // Busca todos os documentos
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Erro ao buscar papéis:', error.message);
    res.status(500).json({ error: 'Erro ao buscar papéis' });
  }
};

// Buscar um papel específico pelo ID
const getPermissionByName = async (req, res) => {
    try {
      const { permission_name } = req.params; // Pega o role_name da URL
      const permission = await collection.findOne({ permission_name }); // Busca pelo role_name
  
      if (!permission) {
        return res.status(404).json({ message: 'Permission não encontrada' });
      }
  
      res.status(200).json(permission);
    } catch (error) {
      console.error('Erro ao buscar a permission:', error.message);
      res.status(500).json({ error: 'Erro ao buscar a permission' });
    }
  };


module.exports = {
  createPermission,
  getPermissions,
  getPermissionByName,
};
