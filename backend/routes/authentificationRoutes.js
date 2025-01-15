const express = require('express');
const { register, login, getAllEmails, deleteUser, registerWithProfile } = require('../controllers/authentificationController');
const authentificationMiddleware = require('../middlewares/authentificationMiddleware');
const router = express.Router();

// POST
router.post('/register', register);
router.post('/registerWithProfile', registerWithProfile);
router.post('/login', login);
router.delete('/deleteUser/:userId', deleteUser);

// GET
router.get('/getAllEmails', authentificationMiddleware, getAllEmails)

module.exports = router;