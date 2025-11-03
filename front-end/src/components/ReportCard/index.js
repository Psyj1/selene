import { useState } from 'react';
import { reportService } from '../../services/reportService';
import styles from './ReportCard.module.css';

export default function ReportCard({ report, onUpdate, onEdit }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o relatório "${report.titulo}"?`)) return;
    
    setLoading(true);
    try {
      await reportService.deleteReport(report._id);
      onUpdate();
    } catch (error) {
      alert('Erro ao excluir relatório: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Concluído': return styles.completed;
      case 'Pendente': return styles.pending;
      case 'Em Andamento': return styles.progress;
      case 'Cancelado': return styles.cancelled;
      default: return styles.default;
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'Concluído': return '✅';
      case 'Pendente': return '⏳';
      case 'Em Andamento': return '🔄';
      case 'Cancelado': return '❌';
      default: return '📄';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{report.titulo}</h3>
        <div className={styles.actions}>
          <button 
            onClick={() => onEdit(report)} 
            className={styles.editButton}
            title="Editar relatório"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            disabled={loading}
            className={styles.deleteButton}
            title="Excluir relatório"
          >
            {loading ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.description}>
          {report.descricao || 'Sem descrição'}
        </p>
        
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.status} ${getStatusClass(report.status)}`}>
              {getStatusEmoji(report.status)} {report.status}
            </span>
          </div>
          
          <div className={styles.metaItem}>
            <span className={styles.label}>📅 Data:</span>
            <span className={styles.value}>
              {report.data ? new Date(report.data).toLocaleDateString('pt-BR') : 'Não definida'}
            </span>
          </div>
          
          {report.hora && (
            <div className={styles.metaItem}>
              <span className={styles.label}>🕐 Hora:</span>
              <span className={styles.value}>{report.hora}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}