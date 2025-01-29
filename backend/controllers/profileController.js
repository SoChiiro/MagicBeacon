const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const User = require('../models/User');

const multer = require('multer');
const path = require('path');

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
  const updateData = req.body;

  try {
    console.log("Requête de mise à jour pour l'ID utilisateur :", userId);

    // Vérifie si le profil existe
    const profile = await Profile.findOne({ userId }).populate("userId", "username email");
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Si username est fourni, mettre à jour également dans User
    if (updateData.username) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.username = updateData.username;
      await user.save();
    }

    if (updateData.decks) {
      profile.decks = [...(profile.decks || []), ...updateData.decks];
    }

    // Mettre à jour uniquement les champs fournis
    Object.assign(profile, updateData);

    profile.email = profile.email || (profile.userId && profile.userId.email);

    await profile.save();

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Ajouter un deck à un profil via userId
exports.addDeck = async (req, res) => {
  const { userId } = req.params;
  const { name, url, commanderImage } = req.body;

  try {
    console.log('Requête pour ajouter un deck pour l\'utilisateur ID:', userId);

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    const newDeck = {
      name,
      url,
      commanderImage,
    };

    profile.decks.push(newDeck);

    await profile.save();

    res.status(200).json({ message: 'Deck ajouté avec succès', profile });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du deck:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Assurez-vous d'avoir ce dossier
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`);
  },
});

const upload = multer({ storage });

exports.uploadProfileImage = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    profile.photo = `/uploads/${req.file.filename}`;
    await profile.save();

    res.status(200).json({ message: 'Photo de profil mise à jour avec succès', photo: profile.photo });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la photo de profil' });
  }
};
