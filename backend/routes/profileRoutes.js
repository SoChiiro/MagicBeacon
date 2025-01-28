const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const validateObjectId = require('../middlewares/authentificationMiddleware');

// Route pour récupérer l'id en fonction de l'email
router.get('/id/:email', validateObjectId, profileController.getIdFromMail);

// Route pour récupérer un profil par userId
router.get('/:userId', validateObjectId, profileController.getProfile);

// ROute pour l'update des profiles
router.put('/modification/:userId', validateObjectId , profileController.updateProfile);

// Route pour l'update des profiles
router.put('/add-deck/:userId', validateObjectId , profileController.addDeck);

module.exports = router;
