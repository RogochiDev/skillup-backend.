require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then((client) => {
    console.log('Base de datos PostgreSQL conectada correctamente');
    client.release();
  })
  .catch((err) => console.error('Error conectando a PostgreSQL:', err));

module.exports = { pool };
