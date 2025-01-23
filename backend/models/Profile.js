const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  },
  photo: {
    type: String, 
    default: '../frontend/src/assets/pdpDefault.jpg'
  },
  description: {
    type: String,
    default: '',
  },
  decks: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      commanderImage: {
        type: String,
        required: true,
      },
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
