const express = require('express');
const { createCoupon, getCoupon, useCoupon, getAllCoupons, activeCoupon, deleteCouponByCodeName } = require('../controllers/couponController');
const router = express.Router();

// Rota para criar um novo cupom
router.post('/', createCoupon);

// Rota para buscar um cupom pelo código
router.get('/:code', getCoupon);

// Rota para marcar um cupom como usado
router.post('/use', useCoupon);

router.delete("/:code", deleteCouponByCodeName);

// Rota para ativar um cupom 
router.post('/active', activeCoupon);

router.get('/', getAllCoupons);  // Nova rota para buscar todos os cupons

module.exports = router;
