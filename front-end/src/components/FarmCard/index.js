// 📍 FRONTEND: components/FarmCard/index.js
// CRIE este arquivo:

import { useState } from 'react';
import { farmService } from '../../services/farmService';
import styles from './FarmCard.module.css';

export default function FarmCard({ farm, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta fazenda?')) return;
    
    setLoading(true);
    try {
      await farmService.deleteFarm(farm._id);
      onUpdate();
    } catch (error) {
      alert('Erro ao excluir fazenda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{farm.nome}</h3>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className={styles.deleteButton}
        >
          {loading ? '...' : '×'}
        </button>
      </div>
      
      <div className={styles.cardBody}>
        <p><strong>Localização:</strong> {farm.cidade} - {farm.estado}</p>
        <p><strong>Produção:</strong> {farm.foco_producao}</p>
        <p><strong>Capacidade:</strong> {farm.capacidade_producao}</p>
        <p><strong>Estufas:</strong> {farm.numero_estufas}</p>
        <p><strong>Status:</strong> 
          <span className={farm.status_operacional === 'Ativa' ? styles.active : styles.inactive}>
            {farm.status_operacional}
          </span>
        </p>
      </div>

      <div className={styles.cardFooter}>
        <p><strong>Responsável:</strong> {farm.responsavel}</p>
        <p><strong>Contato:</strong> {farm.telefone_responsavel}</p>
      </div>
    </div>
  );
}