const express = require('express');
const { getCoupon } = require('../controllers/couponController');
const router = express.Router();

// Rota para buscar um cupom pelo código
router.get('/:code', getCoupon);

module.exports = router;
