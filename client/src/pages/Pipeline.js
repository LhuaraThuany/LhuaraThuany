import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pipeline = () => {
  const [pipeline, setPipeline] = useState(null);
  const [totais, setTotais] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPipeline();
  }, []);

  const fetchPipeline = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pipeline');
      setPipeline(response.data.pipeline);
      setTotais(response.data.totais);
    } catch (err) {
      console.error('Erro ao carregar pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  const etapas = [
    { key: 'lead', label: 'Lead', color: 'bg-blue-100', textColor: 'text-blue-900', border: 'border-blue-300' },
    { key: 'interesse', label: 'Interesse', color: 'bg-yellow-100', textColor: 'text-yellow-900', border: 'border-yellow-300' },
    { key: 'cotacao', label: 'Cotação', color: 'bg-orange-100', textColor: 'text-orange-900', border: 'border-orange-300' },
    { key: 'negociacao', label: 'Negociação', color: 'bg-purple-100', textColor: 'text-purple-900', border: 'border-purple-300' },
    { key: 'fechado', label: 'Fechado', color: 'bg-green-100', textColor: 'text-green-900', border: 'border-green-300' }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pipeline Comercial</h1>
        <p className="text-gray-600 mt-2">Visualize suas oportunidades em cada etapa</p>
      </div>

      {/* Totais por Etapa */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {etapas.map((etapa) => (
          <div key={etapa.key} className={`${etapa.color} rounded-lg shadow p-4`}>
            <h3 className={`font-semibold ${etapa.textColor} mb-2`}>{etapa.label}</h3>
            <p className="text-3xl font-bold text-gray-900">R$ {(totais?.[etapa.key] / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-600 mt-2">{pipeline?.[etapa.key]?.length || 0} itens</p>
          </div>
        ))}
      </div>

      {/* Pipeline Kanban */}
      <div className="grid grid-cols-5 gap-4">
        {etapas.map((etapa) => (
          <div key={etapa.key} className={`${etapa.color} rounded-lg shadow p-4 min-h-96 ${etapa.border} border-2`}>
            <h2 className="font-bold text-lg mb-4 text-gray-900">{etapa.label}</h2>
            <div className="space-y-2">
              {pipeline?.[etapa.key]?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded p-3 shadow-sm border-l-4 border-gray-400 cursor-move hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-900 text-sm">{item.cliente}</p>
                  <p className="text-blue-600 font-bold mt-2">R$ {(item.valor / 1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
