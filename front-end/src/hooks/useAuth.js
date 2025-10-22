import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    // Só executar no cliente
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, []);

  const login = async (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      await router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      await router.push('/');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return { user, login, logout, loading };
};