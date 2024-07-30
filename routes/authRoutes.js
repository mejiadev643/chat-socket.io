const express = require('express');
const { register, login, isAlive } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/isAlive', isAlive);

module.exports = router;
