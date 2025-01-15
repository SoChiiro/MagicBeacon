const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définir le schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Supprime les espaces en début/fin
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Transforme l'email en minuscule
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validation format email
      'Veuillez fournir une adresse email valide.',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Définit une longueur minimale pour le mot de passe
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date de création automatique
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Ne hache que si le mot de passe est modifié ou nouveau
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Créer et exporter le modèle User
module.exports = mongoose.model('User', UserSchema);