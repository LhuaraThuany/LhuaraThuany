import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Oficina',
    telefone: '',
    email: '',
    status: 'Prospectado',
    valor_potencial: 0
  });

  useEffect(() => {
    fetchClientes();
  }, []);

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
        await axios.put(`http://localhost:5000/api/clientes/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/clientes', formData);
      }
      fetchClientes();
      setShowModal(false);
      setFormData({
        nome: '',
        tipo: 'Oficina',
        telefone: '',
        email: '',
        status: 'Prospectado',
        valor_potencial: 0
      });
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
    }
  };

  const handleEdit = (cliente) => {
    setFormData(cliente);
    setEditingId(cliente.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clientes/${id}`);
        fetchClientes();
      } catch (err) {
        console.error('Erro ao deletar cliente:', err);
      }
    }
  };

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-2">Gestão de prospects e contas</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              nome: '',
              tipo: 'Oficina',
              telefone: '',
              email: '',
              status: 'Prospectado',
              valor_potencial: 0
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">{editingId ? 'Editar' : 'Novo'} Cliente</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                required
              />
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              >
                <option>Oficina</option>
                <option>Táxi Aéreo</option>
                <option>Escola</option>
                <option>Operador Privado</option>
                <option>Operador Agrícola</option>
              </select>
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              >
                <option>Prospectado</option>
                <option>Interesse</option>
                <option>Cotação</option>
                <option>Negociação</option>
                <option>Fechado</option>
              </select>
              <input
                type="number"
                placeholder="Valor Potencial"
                value={formData.valor_potencial}
                onChange={(e) => setFormData({ ...formData, valor_potencial: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
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

      {/* Clientes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Nome</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Tipo</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Contato</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Valor</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">{cliente.nome}</td>
                <td className="py-4 px-6">
                  <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                    {cliente.tipo}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm">
                    <p>{cliente.telefone}</p>
                    <p className="text-gray-500">{cliente.email}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`py-1 px-3 rounded-full text-sm ${
                    cliente.status === 'Fechado' ? 'bg-green-100 text-green-800' :
                    cliente.status === 'Negociação' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cliente.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-semibold">R$ {cliente.valor_potencial.toLocaleString()}</td>
                <td className="py-4 px-6 flex gap-2">
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
