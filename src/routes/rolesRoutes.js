const express = require('express');
const { createRole, getRoles, getRoleByName} = require('../controllers/rolesController');
const router = express.Router();

router.post('/', createRole);

router.get('/:code', getRoleByName);

router.get('/', getRoles); 

module.exports = router;
