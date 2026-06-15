const express = require('express');
const router = express.Router();

// Mock data
let clientes = [
  { id: 1, nome: 'Aerodinâmica Ltda', tipo: 'Oficina', telefone: '11-9999-9999', email: 'contato@aerodina.com.br', status: 'Prospectado', valor_potencial: 50000 },
  { id: 2, nome: 'Táxi Aéreo BRA', tipo: 'Táxi Aéreo', telefone: '11-8888-8888', email: 'contato@taxibra.com.br', status: 'Interesse', valor_potencial: 120000 },
  { id: 3, nome: 'Escola Flying Brasil', tipo: 'Escola', telefone: '11-7777-7777', email: 'contato@flying.com.br', status: 'Cotação', valor_potencial: 80000 }
];

let idCounter = 4;

// GET - Listar todos
router.get('/', (req, res) => {
  res.json(clientes);
});

// GET - Por ID
router.get('/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
});

// POST - Criar
router.post('/', (req, res) => {
  const { nome, tipo, telefone, email, status, valor_potencial } = req.body;
  
  if (!nome || !tipo) {
    return res.status(400).json({ error: 'Nome e tipo são obrigatórios' });
  }
  
  const novoCliente = {
    id: idCounter++,
    nome,
    tipo,
    telefone,
    email,
    status: status || 'Prospectado',
    valor_potencial: valor_potencial || 0
  };
  
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// PUT - Atualizar
router.put('/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  
  Object.assign(cliente, req.body);
  res.json(cliente);
});

// DELETE - Deletar
router.delete('/:id', (req, res) => {
  const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Cliente não encontrado' });
  
  const deletado = clientes.splice(index, 1);
  res.json({ mensagem: 'Cliente deletado', cliente: deletado[0] });
});

module.exports = router;
