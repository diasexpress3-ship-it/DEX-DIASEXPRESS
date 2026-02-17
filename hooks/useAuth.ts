import { useState, useEffect } from 'react';

// Lista de emails autorizados (substitua pelo seu email)
const AUTHORIZED_EMAILS = ['diasexpress3@gmail.com', 'seu-email@admin.com'];

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    // Isso é apenas uma simulação - em produção use Firebase Auth
    const checkAuth = () => {
      const userEmail = localStorage.getItem('userEmail');
      setIsAdmin(userEmail ? AUTHORIZED_EMAILS.includes(userEmail) : false);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isAdmin, loading };
};
