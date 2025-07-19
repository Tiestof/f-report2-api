// ================================================
// Archivo: server.js
// Descripción: Levanta el servidor HTTP o HTTPS
// ================================================

const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('../index'); // Importa la app principal (donde están las rutas)
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

if (USE_HTTPS) {
  // ⚠️ Asegúrate de definir estas variables en el archivo .env
  // SSL_KEY_PATH=/ruta/a/privkey.pem
  // SSL_CERT_PATH=/ruta/a/fullchain.pem

  const credentials = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`🔐 Servidor HTTPS corriendo en puerto ${PORT}`);
  });

} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`🌐 Servidor HTTP corriendo en puerto ${PORT}`);
  });
}
