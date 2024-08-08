const express = require('express');
const { getChats } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/', authMiddleware, getChats);

module.exports = router;