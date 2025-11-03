import { useState, useEffect } from 'react';
import { sensorService } from '../services/sensorService';
import Layout from '../components/Layout';
import SensorCard from '../components/SensorCard';
import SensorFormModal from '../components/SensorFormModal';
import styles from './sensores.module.css';

export default function Sensores() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sensorToEdit, setSensorToEdit] = useState(null);

  useEffect(() => {
    loadSensors();
  }, []);

  const loadSensors = async () => {
    try {
      setLoading(true);
      const sensorsData = await sensorService.getAllSensors();
      setSensors(sensorsData);
      setError('');
    } catch (error) {
      setError('Erro ao carregar sensores');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (sensor = null) => {
    setSensorToEdit(sensor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSensorToEdit(null);
  };

  const handleSuccess = () => {
    loadSensors();
  };

  const filteredSensors = sensors.filter(sensor => {
    if (filter === 'all') return true;
    return sensor.status === filter;
  });

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando sensores...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadSensors} className={styles.retryButton}>
          🔄 Tentar novamente
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={styles.dashboard}>
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1>📡 Sensores</h1>
            <p>Monitoramento em tempo real dos sensores do sistema</p>
          </div>
          <button onClick={() => handleOpenModal()} className={styles.addButton}>
            + Novo Sensor
          </button>
        </header>

        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📡</div>
            <div className={styles.cardContent}>
              <h3>Total de Sensores</h3>
              <span className={styles.number}>{sensors.length}</span>
              <span className={styles.label}>dispositivos</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>✅</div>
            <div className={styles.cardContent}>
              <h3>Sensores Ativos</h3>
              <span className={styles.number}>
                {sensors.filter(s => s.status === 'Ativo').length}
              </span>
              <span className={styles.label}>online</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>❌</div>
            <div className={styles.cardContent}>
              <h3>Inativos</h3>
              <span className={styles.number}>
                {sensors.filter(s => s.status === 'Inativo').length}
              </span>
              <span className={styles.label}>offline</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔧</div>
            <div className={styles.cardContent}>
              <h3>Manutenção</h3>
              <span className={styles.number}>
                {sensors.filter(s => s.status === 'Manutenção').length}
              </span>
              <span className={styles.label}>em reparo</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({sensors.length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Ativo' ? styles.active : ''}`}
              onClick={() => setFilter('Ativo')}
            >
              Ativos ({sensors.filter(s => s.status === 'Ativo').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Inativo' ? styles.active : ''}`}
              onClick={() => setFilter('Inativo')}
            >
              Inativos ({sensors.filter(s => s.status === 'Inativo').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Manutenção' ? styles.active : ''}`}
              onClick={() => setFilter('Manutenção')}
            >
              Manutenção ({sensors.filter(s => s.status === 'Manutenção').length})
            </button>
          </div>
        </div>

        <section className={styles.sensorsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>📋 Sensores Cadastrados</h2>
              <span className={styles.count}>
                {filteredSensors.length} {filteredSensors.length === 1 ? 'sensor' : 'sensores'}
              </span>
            </div>
          </div>

          {filteredSensors.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📡</div>
              <h3>Nenhum sensor encontrado</h3>
              <p>
                {filter === 'all' 
                  ? 'Comece adicionando o primeiro sensor ao sistema' 
                  : `Nenhum sensor com status "${filter}"`}
              </p>
              {filter === 'all' && (
                <button onClick={() => handleOpenModal()} className={styles.emptyButton}>
                  + Adicionar Primeiro Sensor
                </button>
              )}
            </div>
          ) : (
            <div className={styles.sensorsGrid}>
              {filteredSensors.map(sensor => (
                <SensorCard 
                  key={sensor._id} 
                  sensor={sensor} 
                  onUpdate={loadSensors}
                  onEdit={handleOpenModal}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <SensorFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        sensorToEdit={sensorToEdit}
      />
    </Layout>
  );
}