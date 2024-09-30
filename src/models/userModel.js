const { client } = require('../config/db'); // Importa o client do MongoDB

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

module.exports = {
  getAllUsers
};
