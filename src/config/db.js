require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=tiacuca-discount`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    // Conectar ao banco de dados
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso!");
    return client;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);  // Encerra a aplicação em caso de erro
  }
};

module.exports = { connectDB, client };
