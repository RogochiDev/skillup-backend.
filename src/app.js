require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const coursesRoutes = require('./routes/courses.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de SkillUp Campus funcionando correctamente',
    status: 'OK'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/enrollments', enrollmentsRoutes); // Alias de compatibilidad para Frontend
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor SkillUp corriendo en http://localhost:${PORT}`);
});
