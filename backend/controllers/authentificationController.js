const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// model importé des users
const User = require('../models/User');

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


// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(404).json({error : 'User not found '});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Récupérer tous les mails
exports.getAllEmails = async (req, res) => {
  try {
    // Récupère uniquement les emails
    const users = await User.find({}, { email: 1, _id: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json({ emails: users.map(user => user.email) }); // Renvoie une liste d'emails
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

