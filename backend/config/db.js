// // Import des librarires essentiels
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('../routes/authentificationRoutes');
// const profileRoutes = require('../routes/profileRoutes');
// const app = express();

// require('dotenv').config({ path: '../backend/.env' });

// app.use(cors());
// app.use(express.json());

// // Connexion à MongoDB
// const connectDB = () => {
//     const mongoURI = process.env.MONGO_URI;

//     if (!mongoURI) {
//         console.error('Error: MONGO_URI is not defined in your .env file');
//         process.exit(1);
//     }
//     mongoose.connect(process.env.MONGO_URI)
//       .then(() => console.log(process.env.MONGO_URI))
//       .then(() => console.log('MongoDB is connected'))
//       .catch(err => console.log(err));
//   };
  

// // connectDB()
// app.use('/api/users', userRoutes);
// app.use('/api/profile', profileRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = connectDB;

// Import des librarires essentiels
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../routes/authentificationRoutes');
const profileRoutes = require('../routes/profileRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const swaggerDocs = require('../api-docs/swagger');

require('dotenv').config({ path: '../backend/.env' });

// Middleware de CORS et de parsing JSON
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const connectDB = () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('Error: MONGO_URI is not defined in your .env file');
        process.exit(1);
    }
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB is connected'))
      .catch(err => console.log(err));
  };

// Routes de l'API
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = connectDB;
