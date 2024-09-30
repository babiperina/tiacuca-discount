const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/usersController'); // Importa o controlador

// Rota para retornar todos os usuários
router.get('/', getUsers);

module.exports = router;
