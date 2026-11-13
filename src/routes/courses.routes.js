const express = require('express');
const router = express.Router();

// Contrato Mock de catálogo de cursos para Frontend (Semana 2)
router.get('/', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      title: 'Desarrollo Web Full Stack con Node.js y React',
      description: 'Aprende a construir aplicaciones web completas desde cero.',
      instructor: 'Prof. Carlos Mendoza',
      duration: '8 semanas',
      level: 'Intermedio',
    },
    {
      id: 2,
      title: 'Bases de Datos Relacionales con PostgreSQL',
      description: 'Domina el modelado de datos, consultas SQL y optimización.',
      instructor: 'Prof. Laura Gómez',
      duration: '4 semanas',
      level: 'Inicial',
    },
  ]);
});

module.exports = router;
