const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const profileController = require('../controllers/profileController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assure-toi que ce dossier existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Middleware d'upload Multer
// const upload = multer({ storage });
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'), false);
  }
});


// Routes utilisateur
router.get('/id/:email', profileController.getIdFromMail);
router.get('/:userId', profileController.getProfile);
router.put('/modification/:userId', profileController.updateProfile);
router.put('/add-deck/:userId', profileController.addDeck);

// Route pour l'upload de photo de profil
// router.put('/photo/:userId', upload.single('photo'), profileController.uploadProfileImage);
router.put('/photo/:userId', upload.single('photo'), (req, res, next) => {
  // Si Multer a une erreur, elle sera capturée ici
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }
  next(); // Si tout va bien, on continue
}, profileController.uploadProfileImage);


module.exports = router;
