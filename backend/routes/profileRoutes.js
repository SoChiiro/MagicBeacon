const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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
router.put('/api/profile/photo/:userId', upload.single('photo'), profileController.uploadProfileImage);

module.exports = router;
