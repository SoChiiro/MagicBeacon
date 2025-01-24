const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getIdFromMail = async (req, res) => {
  const { email } = req.params;

  try {
    console.log('Email reçu :', email);
    const user = await User.findOne({ email }); // Cherche l'utilisateur par email

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = await Profile.findOne({ userId: user._id }); // Cherche le profil lié à l'utilisateur

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error('Error fetching ID:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Obtenir un profil via userId
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('User ID reçu :', userId);

    // Récupère le profil avec l'email et le username de l'utilisateur
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

// Mettre à jour un profil via userId
exports.updateProfile = async (req, res) => {
  const { userId } = req.params; 
  const { username, description } = req.body;

  try {
    console.log('Requête de mise à jour pour l\'ID utilisateur :', userId);

    // Vérifie si le profil existe
    const profile = await Profile.findOne({ userId }).populate('userId', 'username email'); 
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (username) {
      const user = await User.findById(userId); // Récupère l'utilisateur lié
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.username = username;
      await user.save(); // Sauvegarde l'utilisateur
    }

    if (description) {
      profile.description = description;
    }

    // Assure que l'email est inclus lors de la sauvegarde du profil
    profile.email = profile.email || (profile.userId && profile.userId.email);

    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



