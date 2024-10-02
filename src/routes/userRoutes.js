const express = require('express');
const router = express.Router();
const { getUsers, changeUserRoleByUserId} = require('../controllers/usersController'); // Importa o controlador

// Rota para retornar todos os usuários
router.get('/', getUsers);

router.put('/:id', changeUserRoleByUserId);

module.exports = router;
