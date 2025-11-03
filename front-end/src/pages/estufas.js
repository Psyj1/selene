import { useState, useEffect } from 'react';
import { estufaService } from '../services/estufaService';
import Layout from '../components/Layout';
import GreenhouseFormModal from '../components/GreenhouseFormModal';
import styles from './estufas.module.css';

export default function Estufas() {
  const [estufas, setEstufas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estufaToEdit, setEstufaToEdit] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEstufas();
  }, []);

  const loadEstufas = async () => {
    try {
      setLoading(true);
      const estufasData = await estufaService.getAllEstufas();
      setEstufas(estufasData);
      setError('');
    } catch (error) {
      console.error('❌ Erro detalhado:', error);
      setError('Erro ao carregar estufas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (estufa = null) => {
    setEstufaToEdit(estufa);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEstufaToEdit(null);
  };

  const handleSuccess = () => {
    loadEstufas();
  };

  const handleDeleteEstufa = async (id, nome) => {
    if (!confirm(`Tem certeza que deseja excluir a estufa "${nome}"?`)) return;
    
    try {
      await estufaService.deleteEstufa(id);
      loadEstufas();
    } catch (error) {
      alert('Erro ao excluir estufa: ' + error.message);
    }
  };

  const filteredEstufas = estufas.filter(estufa => {
    if (filter === 'all') return true;
    return estufa.status === filter;
  });

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando estufas...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadEstufas} className={styles.retryButton}>
          🔄 Tentar novamente
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>🍄 Estufas</h1>
            <p>Gerencie todas as estufas de cultivo</p>
          </div>
          <button onClick={() => handleOpenModal()} className={styles.addButton}>
            + Nova Estufa
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🍄</div>
            <div className={styles.cardContent}>
              <h3>Total de Estufas</h3>
              <span className={styles.number}>{estufas.length}</span>
              <span className={styles.label}>unidades</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>✅</div>
            <div className={styles.cardContent}>
              <h3>Estufas Ativas</h3>
              <span className={styles.number}>
                {estufas.filter(e => e.status === 'Ativa').length}
              </span>
              <span className={styles.label}>operacionais</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>❌</div>
            <div className={styles.cardContent}>
              <h3>Inativas</h3>
              <span className={styles.number}>
                {estufas.filter(e => e.status === 'Inativa').length}
              </span>
              <span className={styles.label}>paradas</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔧</div>
            <div className={styles.cardContent}>
              <h3>Manutenção</h3>
              <span className={styles.number}>
                {estufas.filter(e => e.status === 'Manutenção').length}
              </span>
              <span className={styles.label}>em reparo</span>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Todas ({estufas.length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Ativa' ? styles.active : ''}`}
              onClick={() => setFilter('Ativa')}
            >
              Ativas ({estufas.filter(e => e.status === 'Ativa').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Inativa' ? styles.active : ''}`}
              onClick={() => setFilter('Inativa')}
            >
              Inativas ({estufas.filter(e => e.status === 'Inativa').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Manutenção' ? styles.active : ''}`}
              onClick={() => setFilter('Manutenção')}
            >
              Manutenção ({estufas.filter(e => e.status === 'Manutenção').length})
            </button>
          </div>
        </div>

        {/* GRID DE ESTUFAS */}
        {filteredEstufas.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🍄</div>
            <h3>Nenhuma estufa encontrada</h3>
            <p>
              {filter === 'all' 
                ? 'Comece adicionando a primeira estufa ao sistema' 
                : `Nenhuma estufa com status "${filter}"`}
            </p>
            {filter === 'all' && (
              <button onClick={() => handleOpenModal()} className={styles.emptyButton}>
                + Cadastrar Primeira Estufa
              </button>
            )}
          </div>
        ) : (
          <div className={styles.estufasGrid}>
            {filteredEstufas.map(estufa => (
              <div key={estufa._id} className={styles.estufaCard}>
                <div className={styles.cardHeader}>
                  <h3>{estufa.nome}</h3>
                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => handleOpenModal(estufa)}
                      className={styles.editButton}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteEstufa(estufa._id, estufa.nome)}
                      className={styles.deleteButton}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Código:</span>
                    <span className={styles.value}>{estufa.codigo}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Tipo:</span>
                    <span className={styles.value}>{estufa.tipo}</span>
                  </div>
                  {estufa.descricao && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Descrição:</span>
                      <span className={styles.value}>{estufa.descricao}</span>
                    </div>
                  )}
                  {estufa.numero_compostos && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Compostos:</span>
                      <span className={styles.value}>{estufa.numero_compostos}</span>
                    </div>
                  )}
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Status:</span>
                    <span className={`${styles.status} ${
                      estufa.status === 'Ativa' ? styles.active : 
                      estufa.status === 'Inativa' ? styles.inactive : 
                      styles.maintenance
                    }`}>
                      {estufa.status}
                    </span>
                  </div>
                </div>

                {/* SEÇÃO DE PLANTIO */}
                {estufa.plantio && (estufa.plantio.substrato || estufa.plantio.tipo_cogumelo) && (
                  <div className={styles.plantioSection}>
                    <h4>🌱 Informações de Plantio</h4>
                    {estufa.plantio.substrato && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Substrato:</span>
                        <span className={styles.value}>{estufa.plantio.substrato}</span>
                      </div>
                    )}
                    {estufa.plantio.tipo_cogumelo && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Tipo Cogumelo:</span>
                        <span className={styles.value}>{estufa.plantio.tipo_cogumelo}</span>
                      </div>
                    )}
                    {estufa.plantio.data_plantio && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Data Plantio:</span>
                        <span className={styles.value}>
                          {new Date(estufa.plantio.data_plantio).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                    {estufa.plantio.data_coleta && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Data Colheita:</span>
                        <span className={styles.value}>
                          {new Date(estufa.plantio.data_coleta).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <GreenhouseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        estufaToEdit={estufaToEdit}
      />
    </Layout>
  );
}