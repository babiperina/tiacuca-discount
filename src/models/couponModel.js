const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  coupon_code: { type: String, required: true, unique: true },
  discount: { type: String, required: true },
  status: { type: String, default: 'active' },
  expiration_date: { type: Date, required: true }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
