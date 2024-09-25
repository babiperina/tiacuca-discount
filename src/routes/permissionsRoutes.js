const express = require('express');
const { createPermission, getPermissions, getPermissionByName} = require('../controllers/permissionsController');
const router = express.Router();

router.post('/', createPermission);

router.get('/:code', getPermissionByName);

router.get('/', getPermissions); 

module.exports = router;
