const bcrypt = require('bcryptjs');
const { pool } = require('../config/prisma');

// Registro real en PostgreSQL (Semana 3)
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

    const newUser = insertResult.rows;

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error interno al registrar el usuario' });
  }
};

// Contrato Mock de Login para Frontend (Semana 2)
const loginMock = (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    message: 'Login simulado exitoso (Contrato API)',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_skillup',
    user: {
      id: 1,
      name: 'Rodolfo Estudiante',
      email: email || 'rodolfo@skillup.com',
      role: 'STUDENT',
    },
  });
};

module.exports = { register, loginMock };
