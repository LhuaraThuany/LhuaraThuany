require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'jazz_user',
  password: process.env.DB_PASSWORD || 'jazz_secure_pass_2024',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'jazz_aero_db',
});

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  } else {
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    release();
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/ligacoes', require('./routes/ligacoes'));
app.use('/api/pipeline', require('./routes/pipeline'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'JAZZ Aero Intelligence Backend Running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard em http://localhost:3000`);
});

module.exports = app;
