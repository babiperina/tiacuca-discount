const { client } = require('../config/db');
const { v4: uuidv4 } = require('uuid');  // Importa a função para gerar o uuid

const db = client.db('coupons_db');
const collection = db.collection('coupons');

// Função para gerar um código de cupom único
const generateUniqueCouponCode = async (collection) => {
  let isUnique = false;
  let coupon_code = '';

  while (!isUnique) {
    // Gera um UUID e limita para 22 caracteres
    const uuid = uuidv4().replace(/-/g, '').substring(0, 22);
    coupon_code = `TESTE-${uuid}`;

    // Verifica se o código já existe na coleção
    const existingCoupon = await collection.findOne({ coupon_code });
    if (!existingCoupon) {
      isUnique = true;  // Se o código não existir, é único
    }
  }

  return coupon_code;
};

// Criar um novo cupom
const createCoupon = async (req, res) => {
  try {
    let { coupon_code, discount, expiration_date } = req.body;

    if (!coupon_code || coupon_code === "undefined") {
      coupon_code = await generateUniqueCouponCode(collection);
    }


    console.log(coupon_code);

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

// Excluir um cupom como usado
const deleteCouponByCodeName = async (req, res) => {
  try {
    const coupon_code = req.params.code;

    const result = await collection.deleteOne({ coupon_code });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: `Cupom com código ${coupon_code} não encontrado` });
    }

    res.json({ message: 'Cupom deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o cupom' });
  }
};

// Marcar um cupom como usado
const activeCoupon = async (req, res) => {
  try {
    const { coupon_code } = req.body;

    const result = await collection.updateOne(
      { coupon_code },
      { $set: { status: 'active' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }

    res.json({ message: 'Cupom marcado ativado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar ativar o cupom' });
  }
};

// Retornar todos os cupons
const getAllCoupons = async (req, res) => {
  try {
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
  activeCoupon,
  getAllCoupons,
  deleteCouponByCodeName
};
