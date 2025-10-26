import api from './api.js';

export const authService = {
  // Login
  login: async (email, senha) => {
    try {
      console.log('📤 Enviando login para backend...');
      
      const response = await api.post('/auth', { 
        email: email.trim().toLowerCase(),
        senha: senha.trim()
      });
      
      console.log('✅ Resposta do backend:', response.data);
      return response.data;
    } catch (error) {
      console.log('💥 ERRO NO LOGIN - DETALHES COMPLETOS:');
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('URL:', error.config?.url);
      console.log('Method:', error.config?.method);
      console.log('Error message:', error.message);
      throw error;
    }
  },

  // Cadastrar usuário
  register: async (userData) => {
    try {
      console.log('📤 Enviando cadastro para backend...');
      
      const normalizedData = {
        ...userData,
        email: userData.email.trim().toLowerCase(),
        senha: userData.senha.trim()
      };
      
      console.log('Dados enviados:', normalizedData);
      
      const response = await api.post('/user', normalizedData);
      console.log('✅ Usuário cadastrado:', response.data);
      return response.data;
    } catch (error) {
      console.log('💥 ERRO NO CADASTRO - DETALHES COMPLETOS:');
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('URL:', error.config?.url);
      console.log('Method:', error.config?.method);
      console.log('Error message:', error.message);
      console.log('Error completo:', error);
      throw error;
    }
  }
};