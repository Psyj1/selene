import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authService } from '../services/authService';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
    console.log('🔄 Iniciando cadastro...');
    await authService.register(formData);
    console.log('✅ Cadastro concluído com sucesso!');
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } catch (error) {
    console.log('❌ Erro no handleSubmit:', error);
    const errorMessage = error.response?.data?.error || 'Erro ao cadastrar usuário';
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.successBox}>
          <h2>Cadastro realizado com sucesso!</h2>
          <p>Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h1>Shimeji Vale</h1>
        <h2>Cadastro de Usuário</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="data_nascimento"
            placeholder="Data de nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p>
          Já tem conta?{' '}
          <Link href="/" legacyBehavior>
            <a>Faça login</a>
          </Link>
        </p>
      </div>
    </div>
  );
}