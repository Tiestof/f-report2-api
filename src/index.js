// ================================================
// Montaje de rutas base de la API
// ================================================

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API F-Report funcionando 🚀' });
});

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Rutas de usuarios
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

// Rutas de tipos de usuario
const tipoUsuarioRoutes = require('./routes/tipoUsuario.routes');
app.use('/api/tipousuarios', tipoUsuarioRoutes);

// Rutas de clientes
const clienteRoutes = require('./routes/cliente.routes');
app.use('/api/clientes', clienteRoutes);

// Rutas de tipo servicio
const tipoServicioRoutes = require('./routes/tipoServicio.routes');
app.use('/api/tiposervicios', tipoServicioRoutes);

// Rutas de tipo hardware
const tipoHardwareRoutes = require('./routes/tipoHardware.routes');
app.use('/api/tipohardware', tipoHardwareRoutes);

// Rutas de tipo sistema operativo
const sistemaOperativoRoutes = require('./routes/sistemaOperativo.routes');
app.use('/api/sistemasoperativos', sistemaOperativoRoutes);

// Rutas de Estado servicio
const estadoServicioRoutes = require('./routes/estadoServicio.routes');
app.use('/api/estadoservicios', estadoServicioRoutes);

// Rutas de tipo Gasto
const tipoGastoRoutes = require('./routes/tipoGasto.routes');
app.use('/api/tipogastos', tipoGastoRoutes);

// Rutas de Gsto Reporte
const gastoReporteRoutes = require('./routes/gastoReporte.routes');
app.use('/api/gastos', gastoReporteRoutes);

module.exports = app;
