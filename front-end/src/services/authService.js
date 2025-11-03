// services/authService.js - VERSÃO FINAL
import api from './api.js';

class AuthService {
  async login(email, senha) {
    try {
      console.log('🔐 Tentando login com:', { email, senha });
      
      // CHAMADA para sua rota de login
      const response = await api.post('/users/login', { 
        email, 
        senha 
      });
      
      console.log('✅ Login realizado com sucesso!', response.data);
      
      // Salva o token e dados do usuário
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
      
      // Mensagens de erro específicas baseadas na resposta do seu backend
      if (error.response?.status === 401) {
        throw new Error('Credenciais inválidas');
      } else if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado');
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Erro de conexão. Verifique se o backend está rodando na porta 4000.');
      } else {
        throw new Error('Falha no login. Tente novamente.');
      }
    }
  }

  async register(userData) {
    try {
      console.log('🔄 Iniciando cadastro:', userData);
      
      // CHAMADA para criar usuário - usa os campos do seu controller
      const response = await api.post('/users', userData);
      
      console.log('✅ Cadastro realizado com sucesso!', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.response?.status === 500) {
        throw new Error('Erro interno do servidor');
      } else {
        throw new Error('Erro ao cadastrar usuário');
      }
    }
  }

  logout() {
    console.log('🚪 Realizando logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Método auxiliar para verificar se está logado
  checkAuth() {
    const token = this.getToken();
    const user = this.getUser();
    
    if (!token || !user) {
      return false;
    }
    
    return true;
  }
}

const authService = new AuthService();
export default authService;