const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/prisma');

// Registro de Usuario (Semana 3)
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios (name, email, password)' 
      });
    }

    const existingResult = await pool.query(
      'SELECT id, email FROM "User" WHERE email = $1 LIMIT 1',
      [email]
    );

    if (existingResult.rows.length > 0) {
      return res.status(400).json({ 
        error: 'El correo electrónico ya está registrado' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await pool.query(
      `INSERT INTO "User" (name, email, password, role, "updatedAt")
       VALUES ($1, $2, $3, 'STUDENT', NOW())
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    const newUser = insertResult.rows[0];

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error interno al registrar el usuario' });
  }
};

// Login Real con JWT (Semana 4)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Debes ingresar email y password' 
      });
    }

    // 1. Buscar usuario por email en PostgreSQL
    const result = await pool.query(
      'SELECT id, name, email, password, role FROM "User" WHERE email = $1 LIMIT 1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 2. Comparar contraseña enviada contra el hash guardado en BD
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar Token JWT con expiración de 24h y payload { id, role }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 4. Responder con el token y datos básicos (sin password)
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  }
};

module.exports = { register, login };
