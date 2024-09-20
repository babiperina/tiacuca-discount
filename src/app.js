const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const couponRoutes = require('./routes/couponRoutes');
const app = express();

// Lista de origens permitidas
const allowedOrigins = ['http://localhost:3000'];

// Configurar CORS para múltiplas origens
app.use(cors({
  origin: function (origin, callback) {
    // Se a origem não está definida (como em Postman), ou está na lista permitida, permitir
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
}));

app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Usar as rotas de cupons
app.use('/api/coupons', couponRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
