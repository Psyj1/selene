import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/forms/LoginForm';
import '../styles/globals.css';

export default function Login() {
  const { login } = useAuth();

  const handleLogin = (credentials) => {
    console.log('Tentativa de login:', credentials);
    // Simular login bem-sucedido
    login({
      id: 1,
      name: 'Administrador',
      email: credentials.email,
      role: 'admin'
    });
  };

  return (
    <>
      <Head>
        <title>FungoDetect - Login</title>
        <meta name="description" content="Sistema de detecção de fungos" />
      </Head>

      <div className="login-page">
        <div className="login-container">
          <div className="login-hero">
            <div className="hero-content">
              <h1>FungoDetect</h1>
              <h2>Sistema de Detecção de Fungos</h2>
              <p>
                Monitoramento inteligente de cogumelos usando aprendizagem profunda 
                para detecção precoce de fungos parasitas.
              </p>
              <div className="features">
                <div className="feature">
                  <span>🔍</span>
                  <span>Detecção Automática</span>
                </div>
                <div className="feature">
                  <span>📊</span>
                  <span>Monitoramento em Tempo Real</span>
                </div>
                <div className="feature">
                  <span>🚨</span>
                  <span>Alertas Imediatos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="login-form-container">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--secondary-color) 0%, #2D3748 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-container {
          background: var(--white);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1000px;
          width: 100%;
        }

        .login-hero {
          background: linear-gradient(135deg, var(--primary-color) 0%, #8ab350 100%);
          color: var(--white);
          padding: 60px 40px;
          display: flex;
          align-items: center;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
          color: var(--secondary-color);
        }

        .hero-content h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .hero-content p {
          margin-bottom: 30px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .feature span:first-child {
          font-size: 1.2rem;
        }

        .login-form-container {
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .login-container {
            grid-template-columns: 1fr;
          }
          
          .login-hero {
            padding: 40px 20px;
          }
        }
      `}</style>
    </>
  );
}