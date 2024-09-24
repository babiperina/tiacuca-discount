const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Para hashing de senha

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true // Remove espaços extras
  },
  password: { 
    type: String, 
    required: true 
  },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' } // Relacionamento com a coleção de papéis (roles)
}, { 
  timestamps: true // Cria automaticamente os campos createdAt e updatedAt
});

// Middleware para hash da senha antes de salvar o usuário
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      // Gera o hash da senha
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

// Método para verificar a senha
UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
