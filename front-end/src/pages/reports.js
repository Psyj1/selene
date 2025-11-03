import { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import Layout from '../components/Layout';
import ReportCard from '../components/ReportCard';
import ReportFormModal from '../components/ReportFormModal';
import styles from './reports.module.css';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportToEdit, setReportToEdit] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const reportsData = await reportService.getAllReports();
      setReports(reportsData);
      setError('');
    } catch (error) {
      setError('Erro ao carregar relatórios');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (report = null) => {
    setReportToEdit(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportToEdit(null);
  };

  const handleSuccess = () => {
    loadReports();
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando relatórios...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadReports} className={styles.retryButton}>
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
            <h1>📊 Relatórios</h1>
            <p>Gerencie e visualize todos os relatórios do sistema</p>
          </div>
          <button onClick={() => handleOpenModal()} className={styles.addButton}>
            + Novo Relatório
          </button>
        </header>

        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <div className={styles.cardContent}>
              <h3>Total de Relatórios</h3>
              <span className={styles.number}>{reports.length}</span>
              <span className={styles.label}>documentos</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>✅</div>
            <div className={styles.cardContent}>
              <h3>Concluídos</h3>
              <span className={styles.number}>
                {reports.filter(r => r.status === 'Concluído').length}
              </span>
              <span className={styles.label}>finalizados</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>⏳</div>
            <div className={styles.cardContent}>
              <h3>Pendentes</h3>
              <span className={styles.number}>
                {reports.filter(r => r.status === 'Pendente').length}
              </span>
              <span className={styles.label}>aguardando</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔄</div>
            <div className={styles.cardContent}>
              <h3>Em Andamento</h3>
              <span className={styles.number}>
                {reports.filter(r => r.status === 'Em Andamento').length}
              </span>
              <span className={styles.label}>em progresso</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({reports.length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Concluído' ? styles.active : ''}`}
              onClick={() => setFilter('Concluído')}
            >
              Concluídos ({reports.filter(r => r.status === 'Concluído').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Pendente' ? styles.active : ''}`}
              onClick={() => setFilter('Pendente')}
            >
              Pendentes ({reports.filter(r => r.status === 'Pendente').length})
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Em Andamento' ? styles.active : ''}`}
              onClick={() => setFilter('Em Andamento')}
            >
              Em Andamento ({reports.filter(r => r.status === 'Em Andamento').length})
            </button>
          </div>
        </div>

        <section className={styles.reportsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>📋 Relatórios Cadastrados</h2>
              <span className={styles.count}>
                {filteredReports.length} {filteredReports.length === 1 ? 'relatório' : 'relatórios'}
              </span>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📊</div>
              <h3>Nenhum relatório encontrado</h3>
              <p>
                {filter === 'all' 
                  ? 'Comece criando o primeiro relatório do sistema' 
                  : `Nenhum relatório com status "${filter}"`}
              </p>
              {filter === 'all' && (
                <button onClick={() => handleOpenModal()} className={styles.emptyButton}>
                  + Criar Primeiro Relatório
                </button>
              )}
            </div>
          ) : (
            <div className={styles.reportsGrid}>
              {filteredReports.map(report => (
                <ReportCard 
                  key={report._id} 
                  report={report} 
                  onUpdate={loadReports}
                  onEdit={handleOpenModal}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <ReportFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        reportToEdit={reportToEdit}
      />
    </Layout>
  );
}