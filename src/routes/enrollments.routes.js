const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { enrollInCourse, getMyEnrollments } = require('../controllers/enrollments.controller');

// Rutas protegidas (requieren usuario autenticado con Token JWT)
router.post('/', auth, enrollInCourse);
router.get('/me', auth, getMyEnrollments);

module.exports = router;
