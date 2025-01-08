// Import des librarires essentiels
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../backend/.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
//TODO useNewUrlParser et useUnifiedTopology ne seront plus prit en charge

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB is connected'))
      .catch(err => console.log(err));
};

// connectDB()

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running correctly !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = connectDB;

