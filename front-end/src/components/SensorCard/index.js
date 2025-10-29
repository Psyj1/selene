// components/SensorCard/index.js
import { useState } from 'react';
import { sensorService } from '../../services/sensorService';
import styles from './SensorCard.module.css';

export default function SensorCard({ sensor, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este sensor?')) return;
    
    setLoading(true);
    try {
      await sensorService.deleteSensor(sensor._id);
      onUpdate();
    } catch (error) {
      alert('Erro ao excluir sensor');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo': return styles.active;
      case 'Inativo': return styles.inactive;
      default: return styles.default;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{sensor.nome || sensor.codigo}</h3>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className={styles.deleteButton}
        >
          {loading ? '...' : '×'}
        </button>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.sensorInfo}>
          <p><strong>Tipo:</strong> {sensor.tipo || 'Não informado'}</p>
          <p><strong>Localização:</strong> {sensor.localizacao || 'Não informada'}</p>
          <p><strong>Última Leitura:</strong> {sensor.ultimaLeitura || 'N/A'}</p>
        </div>
        
        <div className={styles.meta}>
          <span className={`${styles.status} ${getStatusColor(sensor.status)}`}>
            {sensor.status || 'Desconhecido'}
          </span>
          <span className={styles.battery}>
            🔋 {sensor.bateria || 'N/A'}%
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.viewButton}>
          📊 Ver Dados
        </button>
        <button className={styles.editButton}>
          ⚙️ Configurar
        </button>
      </div>
    </div>
  );
}