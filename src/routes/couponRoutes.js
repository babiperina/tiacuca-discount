const express = require('express');
const { createCoupon, getCoupon, useCoupon, getAllCoupons } = require('../controllers/couponController');
const router = express.Router();

// Rota para criar um novo cupom
router.post('/', createCoupon);

// Rota para buscar um cupom pelo código
router.get('/:code', getCoupon);

// Rota para marcar um cupom como usado
router.post('/use', useCoupon);

router.get('/', getAllCoupons);  // Nova rota para buscar todos os cupons

module.exports = router;
