const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Models importés
const User = require('../models/User');
const Profile = require('../models/Profile');

// Inscription utilisateur
exports.register = async (req, res) => {
  const { email, password, username } = req.body; // Ajoutez username ici
  try {
    // Validation des champs
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Création de l'utilisateur
    const user = await User.create({ email, password, username });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error during registration:', error.message);

    if (error.code === 11000) { // Gérer l'erreur pour les champs uniques (email ou username)
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    res.status(400).json({ error: 'Error creating user' });
  }
};

// Inscription utilisateur avec création d'un profil par défaut
exports.registerWithProfile = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Validation des champs
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Crée un nouvel utilisateur
    const newUser = new User({ email, password, username });
    await newUser.save();

    // Crée un profil vide pour l'utilisateur
    const newProfile = new Profile({ userId: newUser._id, name: 'Votre nom' });
    await newProfile.save();

    res.status(201).json({ user: newUser, profile: newProfile });
  } catch (error) {
    console.error('Error during registration with profile:', error.message);

    if (error.code === 11000) { // Gérer l'erreur pour les champs uniques
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    res.status(500).json({ error: 'Server error' });
  }
};


// Connexion utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Récupérer tous les emails
exports.getAllEmails = async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, _id: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json({ emails: users.map(user => user.email) });
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Supprimer un utilisateur et son profil (s'il existe)
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = await Profile.findOne({ userId });
    if (profile) {
      await Profile.findOneAndDelete({ userId });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: profile
        ? 'User and profile deleted successfully'
        : 'User deleted successfully (no profile found)',
    });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
