import { useState, useEffect } from 'react';
import { sensorService } from '../../services/sensorService';
import { estufaService } from '../../services/estufaService';
import styles from './SensorFormModal.module.css';

export default function SensorFormModal({ isOpen, onClose, onSuccess, sensorToEdit = null }) {
  const [loading, setLoading] = useState(false);
  const [estufas, setEstufas] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    tipo: 'Temperatura',
    estufa_id: '',
    status: 'Ativo',
    bateria: 100,
    valor_atual: 0,
    unidade: '°C',
    localizacao: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadEstufas();
      if (sensorToEdit) {
        setFormData({
          nome: sensorToEdit.nome || '',
          codigo: sensorToEdit.codigo || '',
          tipo: sensorToEdit.tipo || 'Temperatura',
          estufa_id: sensorToEdit.estufa_id?._id || sensorToEdit.estufa_id || '',
          status: sensorToEdit.status || 'Ativo',
          bateria: sensorToEdit.bateria || 100,
          valor_atual: sensorToEdit.valor_atual || 0,
          unidade: sensorToEdit.unidade || '°C',
          localizacao: sensorToEdit.localizacao || ''
        });
      } else {
        resetForm();
      }
    }
  }, [sensorToEdit, isOpen]);

  const loadEstufas = async () => {
    try {
      const data = await estufaService.getAllEstufas();
      setEstufas(data);
    } catch (error) {
      console.error('Erro ao carregar estufas:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      codigo: '',
      tipo: 'Temperatura',
      estufa_id: '',
      status: 'Ativo',
      bateria: 100,
      valor_atual: 0,
      unidade: '°C',
      localizacao: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Atualiza unidade automaticamente baseado no tipo
    if (name === 'tipo') {
      const unidades = {
        'Temperatura': '°C',
        'Umidade': '%',
        'CO2': 'ppm',
        'pH': 'pH',
        'Luminosidade': 'lux'
      };
      setFormData(prev => ({
        ...prev,
        [name]: newValue,
        unidade: unidades[newValue] || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (sensorToEdit) {
        await sensorService.updateSensor(sensorToEdit._id, formData);
      } else {
        await sensorService.createSensor(formData);
      }
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      alert(`Erro ao ${sensorToEdit ? 'atualizar' : 'criar'} sensor: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{sensorToEdit ? '✏️ Editar Sensor' : '📡 Novo Sensor'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <section className={styles.section}>
            <h3>📋 Informações Básicas</h3>
            
            <div className={styles.formGroup}>
              <label>Nome do Sensor *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Sensor de Temperatura 01"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Código do Sensor *</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: TEMP-001"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo de Sensor *</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="Temperatura">Temperatura</option>
                  <option value="Umidade">Umidade</option>
                  <option value="CO2">CO2</option>
                  <option value="pH">pH</option>
                  <option value="Luminosidade">Luminosidade</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Estufa</label>
                <select
                  name="estufa_id"
                  value={formData.estufa_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma estufa (opcional)</option>
                  {estufas.map(estufa => (
                    <option key={estufa._id} value={estufa._id}>
                      {estufa.nome} - {estufa.codigo}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Localização</label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  placeholder="Ex: Setor A, Prateleira 3"
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3>⚙️ Configurações Técnicas</h3>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Bateria (%)</label>
                <input
                  type="number"
                  name="bateria"
                  value={formData.bateria}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="100"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Valor Atual</label>
                <input
                  type="number"
                  name="valor_atual"
                  value={formData.valor_atual}
                  onChange={handleChange}
                  step="0.1"
                  placeholder="0.0"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Unidade</label>
                <input
                  type="text"
                  name="unidade"
                  value={formData.unidade}
                  onChange={handleChange}
                  placeholder="°C, %, ppm..."
                  readOnly
                />
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Salvando...' : (sensorToEdit ? 'Atualizar' : 'Criar Sensor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}