import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const { login, isAdmin, user, logout } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    setShowLogin(false);
    setEmail('');
  };

  // Se já está logado como admin
  if (isAdmin) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-3 shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Admin: {user?.email}
          </span>
          <button 
            onClick={logout}
            className="bg-white text-green-500 px-2 py-1 rounded text-xs font-bold hover:bg-opacity-90 transition-all"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Botão de login flutuante
  return (
    <>
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="fixed top-20 right-4 z-50 bg-dexBlue text-white px-4 py-2 rounded-lg text-sm shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Login Admin
      </button>

      {showLogin && (
        <div className="fixed top-32 right-4 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 w-80 animate-slideDown">
          <h3 className="font-black text-dexDarkBlue mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-dexOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Acesso Administrativo
          </h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-dexOrange"
              required
            />
            <button
              type="submit"
              className="w-full bg-dexOrange text-white font-bold py-2 rounded-xl hover:bg-opacity-90 transition-all"
            >
              Entrar como Admin
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Email autorizado: <strong>diasexpress3@gmail.com</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
