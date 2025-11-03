import { useState } from 'react';
import { sensorService } from '../../services/sensorService';
import styles from './SensorCard.module.css';

export default function SensorCard({ sensor, onUpdate, onEdit }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o sensor "${sensor.nome}"?`)) return;
    
    setLoading(true);
    try {
      await sensorService.deleteSensor(sensor._id);
      onUpdate();
    } catch (error) {
      alert('Erro ao excluir sensor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Ativo': return styles.active;
      case 'Inativo': return styles.inactive;
      case 'Manutenção': return styles.maintenance;
      default: return styles.default;
    }
  };

  const getBatteryIcon = (bateria) => {
    if (bateria >= 80) return '🔋';
    if (bateria >= 50) return '🔋';
    if (bateria >= 20) return '🪫';
    return '🪫';
  };

  const getBatteryClass = (bateria) => {
    if (bateria >= 50) return styles.batteryGood;
    if (bateria >= 20) return styles.batteryMedium;
    return styles.batteryLow;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerInfo}>
          <h3>{sensor.nome}</h3>
          <span className={styles.codigo}>{sensor.codigo}</span>
        </div>
        <div className={styles.actions}>
          <button 
            onClick={() => onEdit(sensor)} 
            className={styles.editButton}
            title="Editar sensor"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            disabled={loading}
            className={styles.deleteButton}
            title="Excluir sensor"
          >
            {loading ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.sensorInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>🔧 Tipo:</span>
            <span className={styles.value}>{sensor.tipo}</span>
          </div>
          
          {sensor.estufa_id && (
            <div className={styles.infoItem}>
              <span className={styles.label}>🏠 Estufa:</span>
              <span className={styles.value}>
                {sensor.estufa_id.nome || sensor.estufa_id.codigo || 'N/A'}
              </span>
            </div>
          )}
          
          {sensor.localizacao && (
            <div className={styles.infoItem}>
              <span className={styles.label}>📍 Localização:</span>
              <span className={styles.value}>{sensor.localizacao}</span>
            </div>
          )}
          
          <div className={styles.infoItem}>
            <span className={styles.label}>📊 Leitura Atual:</span>
            <span className={styles.valueHighlight}>
              {sensor.valor_atual} {sensor.unidade}
            </span>
          </div>
        </div>
        
        <div className={styles.meta}>
          <span className={`${styles.status} ${getStatusClass(sensor.status)}`}>
            {sensor.status}
          </span>
          <span className={`${styles.battery} ${getBatteryClass(sensor.bateria)}`}>
            {getBatteryIcon(sensor.bateria)} {sensor.bateria}%
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.lastReading}>
          📅 Última leitura: {sensor.ultimaLeitura 
            ? new Date(sensor.ultimaLeitura).toLocaleString('pt-BR') 
            : 'Sem dados'}
        </span>
      </div>
    </div>
  );
}