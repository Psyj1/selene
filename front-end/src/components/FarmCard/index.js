import { useState } from 'react';
import { farmService } from '../../services/farmService';
import styles from './FarmCard.module.css';

export default function FarmCard({ farm, onUpdate, onEdit }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir a fazenda "${farm.nome}"?`)) return;
    
    setLoading(true);
    try {
      await farmService.deleteFarm(farm._id);
      onUpdate(); // Recarrega a lista
    } catch (error) {
      alert('Erro ao excluir fazenda: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{farm.nome}</h3>
        <div className={styles.actions}>
          <button 
            onClick={() => onEdit(farm)} 
            className={styles.editButton}
            title="Editar fazenda"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            disabled={loading}
            className={styles.deleteButton}
            title="Excluir fazenda"
          >
            {loading ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span className={styles.label}>📍 Localização:</span>
          <span>{farm.cidade} - {farm.estado}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>🍄 Produção:</span>
          <span>{farm.foco_producao || 'Não informado'}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>📦 Capacidade:</span>
          <span>{farm.capacidade_producao || 'Não informado'}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>🏠 Estufas:</span>
          <span>{farm.numero_estufas || 0}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Status:</span>
          <span className={
            farm.status_operacional === 'Ativa' 
              ? styles.statusActive 
              : styles.statusInactive
          }>
            {farm.status_operacional || 'Não informado'}
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.infoRow}>
          <span className={styles.label}>👤 Responsável:</span>
          <span>{farm.responsavel || 'Não informado'}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>📞 Contato:</span>
          <span>{farm.telefone_responsavel || 'Não informado'}</span>
        </div>
      </div>
    </div>
  );
}