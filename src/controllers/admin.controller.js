const { pool } = require('../config/prisma');

// GET /api/admin/users - Listar todos los usuarios registrados (Solo Admin)
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, "createdAt", "updatedAt"
       FROM "User"
       ORDER BY id ASC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
};

module.exports = { getAllUsers };
