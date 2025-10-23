import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { FiUsers, FiPackage, FiCamera, FiSearch } from 'react-icons/fi';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // O _app.js vai redirecionar
  }

  const stats = [
    { label: 'Total de Usuários', value: '24', icon: <FiUsers size={24} />, color: '#9CC35B' },
    { label: 'Estufas Ativas', value: '12', icon: <FiPackage size={24} />, color: '#3C4A64' },
    { label: 'Câmeras Conectadas', value: '36', icon: <FiCamera size={24} />, color: '#4299E1' },
    { label: 'Detecções Hoje', value: '8', icon: <FiSearch size={24} />, color: '#ED8936' },
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'Novo usuário cadastrado', time: '2 min atrás' },
    { id: 2, type: 'greenhouse', message: 'Estufa B foi atualizada', time: '15 min atrás' },
    { id: 3, type: 'detection', message: 'Fungo detectado na Estufa C', time: '1 hora atrás' },
    { id: 4, type: 'system', message: 'Backup do sistema realizado', time: '2 horas atrás' },
  ];

  return (
    <>
      <Head>
        <title>Dashboard - FungoDetect</title>
      </Head>

      <Header />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Visão geral do sistema de monitoramento</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-content">
            <div className="content-grid">
              <div className="content-card">
                <h2>Atividades Recentes</h2>
                <div className="activities-list">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'user' && '👤'}
                        {activity.type === 'greenhouse' && '🏭'}
                        {activity.type === 'detection' && '🔍'}
                        {activity.type === 'system' && '⚙️'}
                      </div>
                      <div className="activity-content">
                        <p>{activity.message}</p>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-card">
                <h2>Status do Sistema</h2>
                <div className="system-status">
                  <div className="status-item">
                    <span className="status-label">API de Detecção</span>
                    <span className="status-indicator online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Banco de Dados</span>
                    <span className="status-indicator online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Serviço de Notificações</span>
                    <span className="status-indicator online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Câmeras Ativas</span>
                    <span className="status-value">36/40</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: var(--white);
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-info h3 {
          font-size: 2rem;
          color: var(--secondary-color);
          margin: 0;
        }

        .stat-info p {
          color: var(--text-light);
          margin: 0;
        }

        .dashboard-content {
          margin-top: 30px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .content-card {
          background: var(--white);
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .content-card h2 {
          color: var(--secondary-color);
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          background: var(--background-color);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .activity-content p {
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .activity-content span {
          color: var(--text-light);
          font-size: 12px;
        }

        .system-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .status-item:last-child {
          border-bottom: none;
        }

        .status-label {
          font-weight: 500;
        }

        .status-indicator {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-indicator.online {
          background-color: #C6F6D5;
          color: #276749;
        }

        .status-value {
          font-weight: 600;
          color: var(--secondary-color);
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}