// pages/estufas.js - ATUALIZADO
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { estufaService } from '../services/estufaService';
import Layout from '../components/Layout';
import styles from './estufas.module.css';

export default function Estufas() {
  const [estufas, setEstufas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadEstufas();
  }, []);

  const loadEstufas = async () => {
    try {
      const estufasData = await estufaService.getAllEstufas();
      console.log('📦 Dados das estufas:', estufasData); // ← DEBUG
      setEstufas(estufasData);
    } catch (error) {
      console.error('❌ Erro detalhado:', error);
      setError('Erro ao carregar estufas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEstufa = () => {
    router.push('/estufa-register');
  };

  const handleEditEstufa = (id) => {
    router.push(`/estufa-edit/${id}`);
  };

  const handleDeleteEstufa = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta estufa?')) return;
    
    try {
      await estufaService.deleteEstufa(id);
      loadEstufas();
    } catch (error) {
      alert('Erro ao excluir estufa');
    }
  };

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
          Tentar novamente
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
          <button onClick={handleAddEstufa} className={styles.addButton}>
            + Nova Estufa
          </button>
        </header>

        <div className={styles.estufasGrid}>
          {estufas.map(estufa => (
            <div key={estufa._id} className={styles.estufaCard}>
              <div className={styles.cardHeader}>
                <h3>{estufa.nome}</h3>
                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleEditEstufa(estufa._id)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteEstufa(estufa._id)}
                    className={styles.deleteButton}
                  >
                    Excluir
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
                <div className={styles.infoRow}>
                  <span className={styles.label}>Descrição:</span>
                  <span className={styles.value}>{estufa.descricao}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Compostos:</span>
                  <span className={styles.value}>{estufa.numero_compostos}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.status} ${estufa.status === 'Ativa' ? styles.active : styles.inactive}`}>
                    {estufa.status}
                  </span>
                </div>
              </div>

              {/* SEÇÃO DE PLANTIO */}
              {estufa.plantio && (
                <div className={styles.plantioSection}>
                  <h4>🌱 Informações de Plantio</h4>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Substrato:</span>
                    <span className={styles.value}>{estufa.plantio.substrato}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Tipo Cogumelo:</span>
                    <span className={styles.value}>{estufa.plantio.tipo_cogumelo}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Data Plantio:</span>
                    <span className={styles.value}>
                      {new Date(estufa.plantio.data_plantio).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Data Coleta:</span>
                    <span className={styles.value}>
                      {new Date(estufa.plantio.data_coleta).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {estufas.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🍄</div>
            <h3>Nenhuma estufa cadastrada</h3>
            <p>Comece adicionando a primeira estufa ao sistema</p>
            <button onClick={handleAddEstufa} className={styles.emptyButton}>
              + Cadastrar Primeira Estufa
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}