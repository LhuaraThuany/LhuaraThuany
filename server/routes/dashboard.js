const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const metrics = {
    leads_prospectados: 45,
    oportunidades_abertas: 18,
    receita_prevista: 890000,
    receita_fechada: 450000,
    receita_nao_explorada: 440000,
    taxa_conversao: 42,
    clientes_sem_contato: 12,
    proximas_acoes: [
      { cliente: 'Aerodinâmica Ltda', acao: 'Ligar', data: '2024-01-16' },
      { cliente: 'Táxi Aéreo BRA', acao: 'Enviar Orçamento', data: '2024-01-16' },
      { cliente: 'Escola Flying', acao: 'Follow-up', data: '2024-01-17' }
    ]
  };
  
  res.json(metrics);
});

router.get('/grafico-pipeline', (req, res) => {
  const data = [
    { etapa: 'Lead', valor: 120000, quantidade: 12 },
    { etapa: 'Interesse', valor: 250000, quantidade: 8 },
    { etapa: 'Cotação', valor: 300000, quantidade: 5 },
    { etapa: 'Negociação', valor: 220000, quantidade: 3 },
    { etapa: 'Fechado', valor: 450000, quantidade: 4 }
  ];
  
  res.json(data);
});

router.get('/conversao-mensal', (req, res) => {
  const data = [
    { mes: 'Janeiro', conversoes: 12, perdidos: 5 },
    { mes: 'Fevereiro', conversoes: 15, perdidos: 4 },
    { mes: 'Março', conversoes: 18, perdidos: 3 }
  ];
  
  res.json(data);
});

module.exports = router;
