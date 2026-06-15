const express = require('express');
const router = express.Router();

const pipeline = {
  lead: [{ id: 1, cliente: 'Novo Cliente 1', valor: 10000 }],
  interesse: [{ id: 2, cliente: 'Cliente 2', valor: 50000 }, { id: 3, cliente: 'Cliente 3', valor: 30000 }],
  cotacao: [{ id: 4, cliente: 'Cliente 4', valor: 120000 }],
  negociacao: [{ id: 5, cliente: 'Cliente 5', valor: 80000 }],
  fechado: [{ id: 6, cliente: 'Cliente 6', valor: 200000 }]
};

router.get('/', (req, res) => {
  const totais = {
    lead: pipeline.lead.reduce((acc, item) => acc + item.valor, 0),
    interesse: pipeline.interesse.reduce((acc, item) => acc + item.valor, 0),
    cotacao: pipeline.cotacao.reduce((acc, item) => acc + item.valor, 0),
    negociacao: pipeline.negociacao.reduce((acc, item) => acc + item.valor, 0),
    fechado: pipeline.fechado.reduce((acc, item) => acc + item.valor, 0)
  };
  
  res.json({ pipeline, totais });
});

router.post('/mover', (req, res) => {
  const { item_id, origem, destino } = req.body;
  
  const item = pipeline[origem].find(i => i.id === item_id);
  if (!item) return res.status(404).json({ error: 'Item não encontrado' });
  
  pipeline[origem] = pipeline[origem].filter(i => i.id !== item_id);
  pipeline[destino].push(item);
  
  res.json({ mensagem: 'Item movido com sucesso', pipeline });
});

module.exports = router;
