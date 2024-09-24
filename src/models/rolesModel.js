const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role_name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  permissions: { 
    type: [String], // Array de strings representando permissões
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now // Por padrão, será a data de criação
  },
  updated_at: { 
    type: Date, 
    default: Date.now // Atualizado automaticamente quando o documento é salvo
  }
});

// Middleware para atualizar o campo updated_at antes de cada save
RoleSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
