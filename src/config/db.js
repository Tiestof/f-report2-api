// ================================================
// Archivo: db.js
// Descripción: Configura el pool de conexión a MySQL
// ================================================

const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Validar conexión al iniciar
(async () => {
  try {
    console.log('⏳ Conectando a la base de datos MySQL...');
    const conn = await pool.getConnection();
    console.log(`✅ Conexión exitosa a la BD '${process.env.DB_NAME}'`);
    conn.release();
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  }
})();

// Exportar pool correctamente
module.exports = pool;
