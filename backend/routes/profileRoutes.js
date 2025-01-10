const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route pour récupérer un profil par userId
router.get('/:userId', profileController.getProfile);

module.exports = router;
