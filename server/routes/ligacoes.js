const express = require('express');
const router = express.Router();

let ligacoes = [
  { id: 1, cliente_id: 1, data: '2024-01-15', hora: '10:30', duracao: '15min', responsavel: 'João', status: 'Realizada', notas: 'Cliente interessado em alternadores' },
  { id: 2, cliente_id: 2, data: '2024-01-14', hora: '14:00', duracao: '20min', responsavel: 'Maria', status: 'Realizada', notas: 'Solicitou orçamento para garmin' }
];

let idCounter = 3;

router.get('/', (req, res) => {
  res.json(ligacoes);
});

router.get('/:id', (req, res) => {
  const ligacao = ligacoes.find(l => l.id === parseInt(req.params.id));
  if (!ligacao) return res.status(404).json({ error: 'Ligação não encontrada' });
  res.json(ligacao);
});

router.post('/', (req, res) => {
  const { cliente_id, data, hora, duracao, responsavel, status, notas } = req.body;
  
  const novaLigacao = {
    id: idCounter++,
    cliente_id,
    data,
    hora,
    duracao,
    responsavel,
    status: status || 'Pendente',
    notas
  };
  
  ligacoes.push(novaLigacao);
  res.status(201).json(novaLigacao);
});

router.put('/:id', (req, res) => {
  const ligacao = ligacoes.find(l => l.id === parseInt(req.params.id));
  if (!ligacao) return res.status(404).json({ error: 'Ligação não encontrada' });
  
  Object.assign(ligacao, req.body);
  res.json(ligacao);
});

router.delete('/:id', (req, res) => {
  const index = ligacoes.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Ligação não encontrada' });
  
  const deletada = ligacoes.splice(index, 1);
  res.json({ mensagem: 'Ligação deletada', ligacao: deletada[0] });
});

module.exports = router;
