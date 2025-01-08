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


// Créer et exporter le modèle User
module.exports = mongoose.model('User', UserSchema);

// // Middleware "pre-save" pour hacher le mot de passe
// UserSchema.pre('save', async function (next) {
//   const user = this;

//   // Si le mot de passe n'a pas été modifié, on passe à l'étape suivante
//   if (!user.isModified('password')) return next();

//   try {
//     // Générer un sel et hacher le mot de passe
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Méthode pour comparer un mot de passe (utilisée lors de la connexion)
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };
