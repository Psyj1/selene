// pages/reports.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { reportService } from '../services/reportService';
import Layout from '../components/Layout';
import ReportCard from '../components/ReportCard';
import styles from './reports.module.css';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const router = useRouter();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const reportsData = await reportService.getAllReports();
      setReports(reportsData);
    } catch (error) {
      setError('Erro ao carregar relatórios');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = () => {
    router.push('/report-create');
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
            <h1>Relatórios</h1>
            <p>Gerencie e visualize todos os relatórios do sistema</p>
          </div>
          <button onClick={handleAddReport} className={styles.addButton}>
            + Novo Relatório
          </button>
        </header>

        {/* CARDS DE RESUMO */}
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
              <span className={styles.label}>em andamento</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📅</div>
            <div className={styles.cardContent}>
              <h3>Este Mês</h3>
              <span className={styles.number}>0</span>
              <span className={styles.label}>novos</span>
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
              Todos
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Concluído' ? styles.active : ''}`}
              onClick={() => setFilter('Concluído')}
            >
              Concluídos
            </button>
            <button 
              className={`${styles.filterButton} ${filter === 'Pendente' ? styles.active : ''}`}
              onClick={() => setFilter('Pendente')}
            >
              Pendentes
            </button>
          </div>
        </div>

        {/* LISTA DE RELATÓRIOS */}
        <section className={styles.reportsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Relatórios Cadastrados</h2>
              <span className={styles.count}>{filteredReports.length} relatórios</span>
            </div>
            <button onClick={handleAddReport} className={styles.addReportButton}>
              + Adicionar Relatório
            </button>
          </div>

          <div className={styles.reportsGrid}>
            {filteredReports.map(report => (
              <ReportCard 
                key={report._id} 
                report={report} 
                onUpdate={loadReports}
              />
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📊</div>
              <h3>Nenhum relatório encontrado</h3>
              <p>
                {filter === 'all' 
                  ? 'Comece criando o primeiro relatório do sistema' 
                  : `Nenhum relatório com status "${filter}"`}
              </p>
              {filter === 'all' && (
                <button onClick={handleAddReport} className={styles.emptyButton}>
                  + Criar Primeiro Relatório
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}