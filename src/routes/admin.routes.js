const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { getAllUsers } = require('../controllers/admin.controller');

// Ruta protegida: requiere Token válido + Rol Administrador
router.get('/users', auth, admin, getAllUsers);

module.exports = router;
