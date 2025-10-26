import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { farmService } from '../services/farmService';
import Layout from '../components/Layout';
import FarmCard from '../components/FarmCard';
import styles from './farms.module.css';

export default function Farms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const farmsData = await farmService.getAllFarms();
      setFarms(farmsData);
    } catch (error) {
      setError('Erro ao carregar fazendas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarm = () => {
    router.push('/farm-register');
  };

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando fazendas...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadFarms} className={styles.retryButton}>
          Tentar novamente
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* HEADER DO DASHBOARD */}
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1>Dashboard</h1>
            <p>Visão geral do sistema Selene</p>
          </div>
          <button onClick={handleAddFarm} className={styles.addButton}>
            + Nova Fazenda
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏠</div>
            <div className={styles.cardContent}>
              <h3>Total de Fazendas</h3>
              <span className={styles.number}>{farms.length}</span>
              <span className={styles.label}>unidades cadastradas</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🍄</div>
            <div className={styles.cardContent}>
              <h3>Estufas Ativas</h3>
              <span className={styles.number}>0</span>
              <span className={styles.label}>em operação</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <div className={styles.cardContent}>
              <h3>Relatórios</h3>
              <span className={styles.number}>0</span>
              <span className={styles.label}>este mês</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📡</div>
            <div className={styles.cardContent}>
              <h3>Sensores</h3>
              <span className={styles.number}>0</span>
              <span className={styles.label}>conectados</span>
            </div>
          </div>
        </div>

        {/* LISTA DE FAZENDAS */}
        <section className={styles.farmsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Fazendas Cadastradas</h2>
              <span className={styles.count}>{farms.length} fazendas</span>
            </div>
            <button onClick={handleAddFarm} className={styles.addFarmButton}>
              + Adicionar Fazenda
            </button>
          </div>

          <div className={styles.farmsGrid}>
            {farms.map(farm => (
              <FarmCard 
                key={farm._id} 
                farm={farm} 
                onUpdate={loadFarms}
              />
            ))}
          </div>

          {farms.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🏠</div>
              <h3>Nenhuma fazenda cadastrada</h3>
              <p>Comece adicionando a primeira fazenda ao sistema</p>
              <button onClick={handleAddFarm} className={styles.emptyButton}>
                + Cadastrar Primeira Fazenda
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}