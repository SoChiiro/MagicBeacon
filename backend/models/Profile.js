const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true,
  },
  photo: {
    type: String, // URL de la photo de profil
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  decks: [
    {
      type: String,
    },
  ],
  preferences: {
    type: [String], // Liste de préférences niveau deck
    default: [],
  },
  location: {
    type: String,
    default: '',
  },
  favoriteStore: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
