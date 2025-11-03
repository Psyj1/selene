import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import authService  from '../services/authService';
import styles from './index.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Tentando login com:', { email, senha });
      
      const response = await authService.login(email, senha);
      console.log('✅ Resposta do login:', response);
      
      localStorage.setItem('token', response.token);
      console.log('💾 Token salvo no localStorage');
      
      router.push('/farms');
    } catch (error) {
      console.log('❌ Erro completo no login:', error);
      console.log('📡 Status do erro:', error.response?.status);
      console.log('📄 Dados do erro:', error.response?.data);
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Shimeji Vale</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <p>
          Não tem conta?{' '}
          <Link href="/register" legacyBehavior>
            <a>Cadastre-se</a>
          </Link>
        </p>
      </div>
    </div>
  );
}