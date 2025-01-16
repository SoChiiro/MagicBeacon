const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const User = require('../models/User');

// Obtenir un profil via userId
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    // Vérifie si l'userId est valide
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Récupère le profil en incluant l'email de l'utilisateur
    const profile = await Profile.findOne({ userId }).populate('userId', 'email username');
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
