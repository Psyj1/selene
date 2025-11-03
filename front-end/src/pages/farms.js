import { useState, useEffect } from 'react';
import { farmService } from '../services/farmService';
import Layout from '../components/Layout';
import FarmCard from '../components/FarmCard';
import FarmFormModal from '../components/FarmFormModal';
import styles from './farms.module.css';

export default function Farms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [farmToEdit, setFarmToEdit] = useState(null);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      setLoading(true);
      const farmsData = await farmService.getAllFarms();
      setFarms(farmsData);
      setError('');
    } catch (error) {
      setError('Erro ao carregar fazendas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (farm = null) => {
    setFarmToEdit(farm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFarmToEdit(null);
  };

  const handleSuccess = () => {
    loadFarms();
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
          🔄 Tentar novamente
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
            <h1>🏠 Fazendas</h1>
            <p>Gerencie todas as fazendas cadastradas no sistema</p>
          </div>
          <button onClick={() => handleOpenModal()} className={styles.addButton}>
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
              <span className={styles.number}>
                {farms.reduce((sum, farm) => sum + (farm.numero_estufas || 0), 0)}
              </span>
              <span className={styles.label}>em operação</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>✅</div>
            <div className={styles.cardContent}>
              <h3>Fazendas Ativas</h3>
              <span className={styles.number}>
                {farms.filter(f => f.status_operacional === 'Ativa').length}
              </span>
              <span className={styles.label}>operacionais</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <div className={styles.cardContent}>
              <h3>Produção Total</h3>
              <span className={styles.number}>
                {farms.filter(f => f.capacidade_producao).length}
              </span>
              <span className={styles.label}>fazendas produzindo</span>
            </div>
          </div>
        </div>

        {/* LISTA DE FAZENDAS */}
        <section className={styles.farmsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>📋 Fazendas Cadastradas</h2>
              <span className={styles.count}>{farms.length} fazendas no sistema</span>
            </div>
          </div>

          {farms.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🏠</div>
              <h3>Nenhuma fazenda cadastrada</h3>
              <p>Comece adicionando a primeira fazenda ao sistema</p>
              <button onClick={() => handleOpenModal()} className={styles.emptyButton}>
                + Cadastrar Primeira Fazenda
              </button>
            </div>
          ) : (
            <div className={styles.farmsGrid}>
              {farms.map(farm => (
                <FarmCard 
                  key={farm._id} 
                  farm={farm} 
                  onUpdate={loadFarms}
                  onEdit={handleOpenModal}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MODAL DE CRIAÇÃO/EDIÇÃO */}
      <FarmFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        farmToEdit={farmToEdit}
      />
    </Layout>
  );
}