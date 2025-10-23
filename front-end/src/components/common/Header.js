import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>FungoDetect</h1>
          <span>Sistema de Monitoramento</span>
        </div>
        
        <div className="header-actions">
          <div className="user-info">
            <span>Bem-vindo, {user?.name || 'Usuário'}</span>
          </div>
          <button onClick={logout} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;