const { pool } = require('../config/prisma');

// 1. POST /api/enrollments - Inscribir al usuario autenticado en un curso
const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    // Aceptamos courseId o course_id para compatibilidad total con Frontend
    const courseId = req.body.courseId || req.body.course_id;

    if (!courseId) {
      return res.status(400).json({ 
        error: 'El ID del curso (courseId) es obligatorio' 
      });
    }

    // Verificar que el curso exista en PostgreSQL
    const courseCheck = await pool.query(
      'SELECT id, title FROM "Course" WHERE id = $1 LIMIT 1',
      [courseId]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'El curso seleccionado no existe' });
    }

    // Regla de negocio obligatoria: verificar que el usuario NO esté ya inscrito
    const existingEnrollment = await pool.query(
      'SELECT id FROM "Enrollment" WHERE "userId" = $1 AND "courseId" = $2 LIMIT 1',
      [userId, courseId]
    );

    if (existingEnrollment.rows.length > 0) {
      return res.status(400).json({ 
        error: 'Ya estás inscrito en este curso' 
      });
    }

    // Crear la inscripción en PostgreSQL
    const insertResult = await pool.query(
      `INSERT INTO "Enrollment" ("userId", "courseId")
       VALUES ($1, $2)
       RETURNING id, "userId", "courseId", "enrolledAt"`,
      [userId, courseId]
    );

    res.status(201).json({
      message: 'Inscripción realizada exitosamente',
      enrollment: insertResult.rows,
      course: courseCheck.rows,
    });
  } catch (error) {
    console.error('Error en enrollInCourse:', error);
    res.status(500).json({ error: 'Error interno al procesar la inscripción' });
  }
};

// 2. GET /api/enrollments/me - Obtener "Mis Cursos" con JOIN a la tabla Course
const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
         e.id AS "enrollmentId",
         e."enrolledAt",
         c.id AS "courseId",
         c.title,
         c.description,
         c.instructor,
         c.duration,
         c.level
       FROM "Enrollment" e
       INNER JOIN "Course" c ON e."courseId" = c.id
       WHERE e."userId" = $1
       ORDER BY e."enrolledAt" DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getMyEnrollments:', error);
    res.status(500).json({ error: 'Error al obtener tus cursos inscritos' });
  }
};

module.exports = { enrollInCourse, getMyEnrollments };
