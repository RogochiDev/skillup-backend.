const { pool } = require('../config/prisma');

// 1. GET /api/courses - Listar todos los cursos (Público)
const getAllCourses = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Course" ORDER BY id ASC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getAllCourses:', error);
    res.status(500).json({ error: 'Error al obtener el catálogo de cursos' });
  }
};

// 2. GET /api/courses/:id - Obtener un curso por su ID (Público)
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM "Course" WHERE id = $1 LIMIT 1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en getCourseById:', error);
    res.status(500).json({ error: 'Error al obtener el detalle del curso' });
  }
};

// 3. POST /api/courses - Crear un curso nuevo (Solo Admin)
const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration, level } = req.body;

    if (!title || !description || !instructor || !duration) {
      return res.status(400).json({
        error: 'Los campos title, description, instructor y duration son obligatorios',
      });
    }

    const result = await pool.query(
      `INSERT INTO "Course" (title, description, instructor, duration, level, "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [title, description, instructor, duration, level || 'Inicial']
    );

    res.status(201).json({
      message: 'Curso creado exitosamente',
      course: result.rows[0],
    });
  } catch (error) {
    console.error('Error en createCourse:', error);
    res.status(500).json({ error: 'Error interno al crear el curso' });
  }
};

// 4. PUT /api/courses/:id - Editar un curso existente (Solo Admin)
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructor, duration, level } = req.body;

    const existing = await pool.query(
      'SELECT * FROM "Course" WHERE id = $1 LIMIT 1',
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const current = existing.rows[0];

    const result = await pool.query(
      `UPDATE "Course"
       SET title = $1,
           description = $2,
           instructor = $3,
           duration = $4,
           level = $5,
           "updatedAt" = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        title || current.title,
        description || current.description,
        instructor || current.instructor,
        duration || current.duration,
        level || current.level,
        id,
      ]
    );

    res.status(200).json({
      message: 'Curso actualizado exitosamente',
      course: result.rows[0],
    });
  } catch (error) {
    console.error('Error en updateCourse:', error);
    res.status(500).json({ error: 'Error interno al actualizar el curso' });
  }
};

// 5. DELETE /api/courses/:id - Eliminar un curso (Solo Admin)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM "Course" WHERE id = $1 RETURNING id, title',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(200).json({
      message: 'Curso eliminado exitosamente',
      deletedCourse: result.rows[0],
    });
  } catch (error) {
    console.error('Error en deleteCourse:', error);
    res.status(500).json({ error: 'Error interno al eliminar el curso' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
