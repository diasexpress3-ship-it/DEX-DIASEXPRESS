import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Credenciais do admin
  const ADMIN_EMAIL = "diasexpress3@gmail.com";
  const ADMIN_PASSWORD = "Sahombe13";

  // SÓ MOSTRA NA ROTA SECRETA - ALTERE AQUI PARA A ROTA QUE DESEJAR
  const SECRET_ROUTE = '/admin-secret-2026';
  
  // Se não estiver na rota secreta, não renderiza nada
  if (location.pathname !== SECRET_ROUTE) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validação básica
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }
    
    // Simular delay de rede
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setIsAdmin(true);
        // Salvar no localStorage para persistir login
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        setSuccess('Login realizado com sucesso!');
        setError('');
        setLoading(false);
      } else {
        setError('Email ou senha inválidos');
        setLoading(false);
      }
    }, 800);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminLoginTime');
    setEmail('');
    setPassword('');
    setSuccess('Você saiu da área administrativa');
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => setSuccess(''), 3000);
  };

  // Verificar se já está logado ao carregar
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminStatus === 'true' && adminEmail) {
      setIsAdmin(true);
      setEmail(adminEmail);
    }
  }, []);

  if (isAdmin) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 shadow-lg animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-black text-green-800 flex items-center gap-2">
                Login ativo
                <span className="bg-green-200 text-green-800 text-[10px] px-2 py-1 rounded-full">Admin</span>
              </p>
              <p className="text-sm mt-1 text-gray-600">{email}</p>
              <p className="text-[10px] text-gray-400 mt-1">
                Sessão iniciada em: {new Date().toLocaleDateString('pt-PT')}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-red-600 transition-all transform hover:scale-105 flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
            title="Clique para sair da área administrativa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sair</span>
          </button>
        </div>
        
        {/* Dicas de admin */}
        <div className="mt-4 pt-4 border-t border-green-200 text-xs text-gray-500">
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            Você tem acesso a todas as funcionalidades de upload
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fadeIn">
      {/* Header com ícone animado */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-dexBlue/10 to-dexOrange/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-10 h-10 text-dexBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-dexDarkBlue">Área Administrativa</h2>
        <p className="text-sm text-gray-500 mt-2">Acesso restrito à equipe DEX</p>
      </div>
      
      {/* Mensagem de sucesso (ex: após logout) */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-600 mb-6 flex items-center gap-3 animate-slideDown">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">{success}</span>
        </div>
      )}
      
      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 mb-6 flex items-center gap-3 animate-shake">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-dexBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dexOrange focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            placeholder="diasexpress3@gmail.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-dexBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Senha
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dexOrange focus:border-transparent transition-all bg-gray-50 focus:bg-white pr-12"
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dexOrange transition-colors"
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-dexOrange to-orange-600 text-white font-black py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Autenticando...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Acessar Painel</span>
            </>
          )}
        </button>
      </form>

      {/* Dica de segurança */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="bg-blue-50/50 p-3 rounded-xl text-center">
          <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <svg className="w-3 h-3 text-dexBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Acesso exclusivo para administradores da DEX
          </p>
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-3">
          © {new Date().getFullYear()} DEX Holding - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
