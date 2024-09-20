const { client } = require('../config/db');

// Criar um novo cupom
const createCoupon = async (req, res) => {
  try {
    const { coupon_code, discount, expiration_date } = req.body;
    const db = client.db('coupons_db');  // Nome do banco de dados
    const collection = db.collection('coupons');  // Nome da coleção

    const newCoupon = {
      coupon_code,
      discount,
      status: 'active',
      expiration_date: new Date(expiration_date),
    };

    // Inserir o novo cupom no MongoDB
    await collection.insertOne(newCoupon);
    res.status(201).json({ message: 'Cupom criado com sucesso', coupon: newCoupon });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o cupom' });
  }
};

// Buscar um cupom pelo código
const getCoupon = async (req, res) => {
  try {
    const db = client.db('coupons_db');
    const collection = db.collection('coupons');

    const coupon = await collection.findOne({ coupon_code: req.params.code });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o cupom' });
  }
};

// Marcar um cupom como usado
const useCoupon = async (req, res) => {
  try {
    const db = client.db('coupons_db');
    const collection = db.collection('coupons');

    const { coupon_code } = req.body;

    const result = await collection.updateOne(
      { coupon_code },
      { $set: { status: 'used' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }

    res.json({ message: 'Cupom marcado como usado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar o cupom como usado' });
  }
};

// Retornar todos os cupons
const getAllCoupons = async (req, res) => {
    try {
      const db = client.db('coupons_db');
      const collection = db.collection('coupons');
  
      const coupons = await collection.find({}).toArray();  // Busca todos os documentos
      res.json(coupons);  // Retorna a lista de cupons
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar todos os cupons' });
    }
  };

// Exports dos controladores
module.exports = {
  createCoupon,
  getCoupon,
  useCoupon,
  getAllCoupons,
};
