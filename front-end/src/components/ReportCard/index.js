// components/ReportCard/index.js
import { useState } from 'react';
import { reportService } from '../../services/reportService';
import styles from './ReportCard.module.css';

export default function ReportCard({ report, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este relatório?')) return;
    
    setLoading(true);
    try {
      await reportService.deleteReport(report._id);
      onUpdate();
    } catch (error) {
      alert('Erro ao excluir relatório');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return styles.completed;
      case 'Pendente': return styles.pending;
      default: return styles.default;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{report.titulo}</h3>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className={styles.deleteButton}
        >
          {loading ? '...' : '×'}
        </button>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.description}>{report.descricao}</p>
        
        <div className={styles.meta}>
          <p><strong>Status:</strong> 
            <span className={`${styles.status} ${getStatusColor(report.status)}`}>
              {report.status}
            </span>
          </p>
          <p><strong>Data:</strong> {new Date(report.data).toLocaleDateString('pt-BR')}</p>
          <p><strong>Hora:</strong> {report.hora}</p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.viewButton}>
          👁️ Ver Detalhes
        </button>
        <button className={styles.editButton}>
          ✏️ Editar
        </button>
      </div>
    </div>
  );
}