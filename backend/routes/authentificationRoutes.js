const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// POST
router.post('/register', register);
router.post('/login', login);

// GET
router.get('/getAllEmails', getAllEmails)

module.exports = router;
