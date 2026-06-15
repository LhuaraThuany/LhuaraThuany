import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Phone, Trello, LogOut } from 'lucide-react';

const Navigation = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">JAZZ</h1>
        <p className="text-xs text-gray-400 mt-1">Aero Intelligence</p>
      </div>

      <div className="p-6 border-b border-gray-700">
        <p className="text-sm text-gray-300">Bem-vindo,</p>
        <p className="font-semibold text-white">{user?.name || 'Usuário'}</p>
        <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
      </div>

      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/clientes"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/clientes')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Users className="w-5 h-5" />
              Clientes
            </Link>
          </li>
          <li>
            <Link
              to="/ligacoes"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/ligacoes')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Phone className="w-5 h-5" />
              Ligações
            </Link>
          </li>
          <li>
            <Link
              to="/pipeline"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/pipeline')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Trello className="w-5 h-5" />
              Pipeline
            </Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
