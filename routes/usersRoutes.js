const express = require('express');
const { getProfile, newMessage, getUserByEmail } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/new-message', authMiddleware, newMessage);
router.get('/profileEmail', authMiddleware, getUserByEmail);


module.exports = router;
