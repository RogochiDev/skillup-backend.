const express = require('express');
const router = express.Router();
const { register, loginMock } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', loginMock);

module.exports = router;
