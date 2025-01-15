const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const validateObjectId = require('../middlewares/authentificationMiddleware');

// Route pour récupérer un profil par userId
router.get('/:userId', validateObjectId, profileController.getProfile);

module.exports = router;
