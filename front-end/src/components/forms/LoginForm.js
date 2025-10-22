import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-header">
        <h2>Login</h2>
        <p>Entre no sistema de monitoramento</p>
      </div>

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Senha"
        type="password"
        name="password"
        placeholder="Sua senha"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="primary" size="large" style={{width: '100%'}}>
        Entrar
      </Button>

      <div className="form-footer">
        <p>Não tem uma conta? <a href="#register">Solicitar acesso</a></p>
      </div>
    </form>
  );
};

export default LoginForm;