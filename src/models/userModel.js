const { client, ObjectId } = require('../config/db'); // Importa o client do MongoDB

// Definindo o nome do banco de dados e da coleção
const dbName = 'coupons_db';
const collectionName = 'users';

// Função para buscar todos os usuários
const getAllUsers = async () => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return await collection.find({}).toArray(); // Retorna todos os usuários como array
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    throw new Error('Erro ao buscar usuários');
  }
};

// Função para atualizar o role de um usuário pelo ID
const updateUserRoleById = async (userId, newRole) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) }, // Filtra pelo ID do usuário
      { $set: { roles: [newRole] } } // Atualiza o campo roles com o novo role
    );

    if (result.matchedCount === 0) {
      throw new Error('Usuário não encontrado');
    }

    return result;
  } catch (error) {
    console.error('Erro ao atualizar role do usuário:', error.message);
    throw new Error('Erro ao atualizar role do usuário');
  }
};

module.exports = {
  getAllUsers,
  updateUserRoleById
};
