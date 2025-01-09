const express = require('express');
const { register, login, getAllEmails } = require('../controllers/authentificationController');
const authentificationMiddleware = require('../middlewares/authentificationMiddleware');
const router = express.Router();

// POST
router.post('/register', register);
router.post('/login', login);

// GET
router.get('/getAllEmails', authentificationMiddleware, getAllEmails)

module.exports = router;