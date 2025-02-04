// Import des bibliothèques essentielles
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../routes/authentificationRoutes');
const profileRoutes = require('../routes/profileRoutes');
require('dotenv').config(); // Charge les variables d'environnement

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connexion à MongoDB
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('❌ MONGO_URI non défini dans le fichier .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ Connexion MongoDB réussie');
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB :', error.message);
        process.exit(1);
    }
};

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));

module.exports = connectDB;
