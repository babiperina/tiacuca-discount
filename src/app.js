const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const couponRoutes = require('./routes/couponRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar as rotas de autenticação
const rolesRoutes = require('./routes/rolesRoutes'); // Importar as rotas de autenticação
const permissionsRoutes = require('./routes/permissionsRoutes'); // Importar as rotas de autenticação
const authMiddleware = require('./middleware/authMiddleware'); // Importar middleware de autenticação
const app = express();

// Lista de origens permitidas
const allowedOrigins = ['http://localhost:3000', 'https://babiperina.github.io'];

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

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar as rotas de cupons com proteção
app.use('/api/coupons', authMiddleware, couponRoutes); // Aplica a proteção

// Usar as rotas de cupons com proteção
app.use('/api/public-coupons', couponRoutes); // Aplica a proteção

// Usar as rotas de cupons com proteção
app.use('/api/roles', rolesRoutes); // Aplica a proteção

// Usar as rotas de cupons com proteção
app.use('/api/permissions', permissionsRoutes); // Aplica a proteção

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
