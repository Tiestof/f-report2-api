const fs = require('fs');
const https = require('https');
const http = require('http');
const app = require('../index');
require('dotenv').config();

const useHttps = process.env.USE_HTTPS === 'true';

if (useHttps) {
  const credentials = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };
  https.createServer(credentials, app).listen(process.env.PORT, () =>
    console.log(`🔐 API HTTPS corriendo en puerto ${process.env.PORT}`)
  );
} else {
  http.createServer(app).listen(process.env.PORT, () =>
    console.log(`🌐 API HTTP corriendo en puerto ${process.env.PORT}`)
  );
}
