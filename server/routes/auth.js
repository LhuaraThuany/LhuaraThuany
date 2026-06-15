const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock users (em produção, usar banco de dados)
const users = [
  { id: 1, email: 'admin@jazzaero.com', password: bcrypt.hashSync('admin123', 10), name: 'Admin' },
  { id: 2, email: 'vendedor@jazzaero.com', password: bcrypt.hashSync('vendor123', 10), name: 'Vendedor' }
];

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Verify Token
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
