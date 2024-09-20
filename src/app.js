const express = require('express');
const { connectDB } = require('./config/db');
const couponRoutes = require('./routes/couponRoutes');
const app = express();

app.use(express.json()); // Middleware para processar JSON

// Conectar ao MongoDB
connectDB();

// Usar as rotas de cupons
app.use('/api/coupons', couponRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
