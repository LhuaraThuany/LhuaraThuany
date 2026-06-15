import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Ligacoes = () => {
  const [ligacoes, setLigacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    data: '',
    hora: '',
    duracao: '',
    responsavel: '',
    status: 'Realizada',
    notas: ''
  });

  useEffect(() => {
    fetchLigacoes();
    fetchClientes();
  }, []);

  const fetchLigacoes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ligacoes');
      setLigacoes(response.data);
    } catch (err) {
      console.error('Erro ao carregar ligações:', err);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/ligacoes/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/ligacoes', formData);
      }
      fetchLigacoes();
      setShowModal(false);
      setFormData({
        cliente_id: '',
        data: '',
        hora: '',
        duracao: '',
        responsavel: '',
        status: 'Realizada',
        notas: ''
      });
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar ligação:', err);
    }
  };

  const handleEdit = (ligacao) => {
    setFormData(ligacao);
    setEditingId(ligacao.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await axios.delete(`http://localhost:5000/api/ligacoes/${id}`);
        fetchLigacoes();
      } catch (err) {
        console.error('Erro ao deletar:', err);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Ligações</h1>
          <p className="text-gray-600 mt-2">Registro e acompanhamento de contatos</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              cliente_id: '',
              data: '',
              hora: '',
              duracao: '',
              responsavel: '',
              status: 'Realizada',
              notas: ''
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Nova Ligação
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingId ? 'Editar' : 'Nova'} Ligação</h2>
            <form onSubmit={handleSubmit}>
              <select
                value={formData.cliente_id}
                onChange={(e) => setFormData({ ...formData, cliente_id: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                required
              />
              <input
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                required
              />
              <input
                type="text"
                placeholder="Duração (ex: 15min)"
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <input
                type="text"
                placeholder="Responsável"
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                required
              />
              <textarea
                placeholder="Notas da ligação"
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 resize-none"
                rows="3"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Cliente</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Data</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Hora</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Responsável</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Notas</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ligacoes.map((ligacao) => {
              const cliente = clientes.find(c => c.id === ligacao.cliente_id);
              return (
                <tr key={ligacao.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">{cliente?.nome || 'N/A'}</td>
                  <td className="py-4 px-6">{ligacao.data}</td>
                  <td className="py-4 px-6">{ligacao.hora}</td>
                  <td className="py-4 px-6">{ligacao.responsavel}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{ligacao.notas.substring(0, 30)}...</td>
                  <td className="py-4 px-6 flex gap-2">
                    <button
                      onClick={() => handleEdit(ligacao)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ligacao.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ligacoes;
