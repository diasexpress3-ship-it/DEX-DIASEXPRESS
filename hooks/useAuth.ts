import { useState, useEffect } from 'react';

// Lista de emails autorizados (substitua pelo seu email)
const AUTHORIZED_EMAILS = ['diasexpress3@gmail.com'];

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para verificar autenticação
    const checkAuth = () => {
      try {
        // Verificar se há um usuário no localStorage
        const storedUser = localStorage.getItem('dex_user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Verificar se é admin baseado no email
          setIsAdmin(AUTHORIZED_EMAILS.includes(parsedUser.email));
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função para fazer login
  const login = (email: string) => {
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('dex_user', JSON.stringify(user));
    setUser(user);
    setIsAdmin(AUTHORIZED_EMAILS.includes(email));
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('dex_user');
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, loading, login, logout };
};
