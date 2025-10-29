// pages/produtores.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { produtorService } from '../services/produtorService';
import Layout from '../components/Layout';
import styles from './produtores.module.css';

export default function Produtores() {
  const [produtores, setProdutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    loadProdutores();
  }, []);

  const loadProdutores = async () => {
    try {
      const produtoresData = await produtorService.getAllProdutores();
      console.log('📦 Dados dos produtores:', produtoresData); // ← DEBUG
      setProdutores(produtoresData);
    } catch (error) {
      console.error('❌ Erro detalhado:', error);
      setError('Erro ao carregar produtores');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProdutor = () => {
    router.push('/produtor-register');
  };

  const handleEditProdutor = (id) => {
    router.push(`/produtor-edit/${id}`);
  };

  const handleDeleteProdutor = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produtor?')) return;
    
    try {
      await produtorService.deleteProdutor(id);
      loadProdutores();
    } catch (error) {
      alert('Erro ao excluir produtor');
    }
  };

  // Evita hydration
  if (!mounted) {
    return (
      <Layout>
        <div style={{ minHeight: '400px' }}></div>
      </Layout>
    );
  }

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando produtores...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadProdutores} className={styles.retryButton}>
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
            <h1>👨‍🌾 Produtores</h1>
            <p>Gerencie todos os produtores cadastrados no sistema</p>
          </div>
          <button onClick={handleAddProdutor} className={styles.addButton}>
            + Novo Produtor
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>👥</div>
            <div className={styles.cardContent}>
              <h3>Total de Produtores</h3>
              <span className={styles.number}>{produtores.length}</span>
              <span className={styles.label}>cadastrados</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📞</div>
            <div className={styles.cardContent}>
              <h3>Com Contato</h3>
              <span className={styles.number}>
                {produtores.filter(p => p.telefone).length}
              </span>
              <span className={styles.label}>com telefone</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📧</div>
            <div className={styles.cardContent}>
              <h3>Com Email</h3>
              <span className={styles.number}>
                {produtores.filter(p => p.email).length}
              </span>
              <span className={styles.label}>com email</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎂</div>
            <div className={styles.cardContent}>
              <h3>Idade Média</h3>
              <span className={styles.number}>
                {produtores.length > 0 ? '--' : '0'}
              </span>
              <span className={styles.label}>anos</span>
            </div>
          </div>
        </div>

        {/* LISTA DE PRODUTORES */}
        <section className={styles.produtoresSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Produtores Cadastrados</h2>
              <span className={styles.count}>{produtores.length} produtores</span>
            </div>
            <button onClick={handleAddProdutor} className={styles.addProdutorButton}>
              + Adicionar Produtor
            </button>
          </div>

          <div className={styles.produtoresGrid}>
            {produtores.map(produtor => (
              <div key={produtor._id} className={styles.produtorCard}>
                <div className={styles.cardHeader}>
                  <h3>{produtor.nome}</h3>
                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => handleEditProdutor(produtor._id)}
                      className={styles.editButton}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteProdutor(produtor._id)}
                      className={styles.deleteButton}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>📧 Email:</span>
                      <span className={styles.value}>{produtor.email || 'Não informado'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>📞 Telefone:</span>
                      <span className={styles.value}>{produtor.telefone || 'Não informado'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>🆔 CPF:</span>
                      <span className={styles.value}>{produtor.cpf || 'Não informado'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>🎂 Data Nasc.:</span>
                      <span className={styles.value}>
                        {produtor.data_nascimento ? 
                          new Date(produtor.data_nascimento).toLocaleDateString('pt-BR') : 
                          'Não informada'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.registered}>
                    📅 Cadastrado em: {new Date().toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {produtores.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>👨‍🌾</div>
              <h3>Nenhum produtor encontrado</h3>
              <p>Comece cadastrando o primeiro produtor do sistema</p>
              <button onClick={handleAddProdutor} className={styles.emptyButton}>
                + Cadastrar Primeiro Produtor
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}