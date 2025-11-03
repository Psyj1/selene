import { useState, useEffect } from 'react';
import { estufaService } from '../../services/estufaService';
import styles from './GreenhouseFormModal.module.css';

export default function GreenhouseFormModal({ isOpen, onClose, onSuccess, estufaToEdit = null }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    tipo: '',
    descricao: '',
    status: 'Ativa',
    numero_compostos: '',
    // Plantio
    plantio: {
      substrato: '',
      tipo_cogumelo: '',
      data_plantio: '',
      data_coleta: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (estufaToEdit) {
        setFormData({
          nome: estufaToEdit.nome || '',
          codigo: estufaToEdit.codigo || '',
          tipo: estufaToEdit.tipo || '',
          descricao: estufaToEdit.descricao || '',
          status: estufaToEdit.status || 'Ativa',
          numero_compostos: estufaToEdit.numero_compostos || '',
          plantio: {
            substrato: estufaToEdit.plantio?.substrato || '',
            tipo_cogumelo: estufaToEdit.plantio?.tipo_cogumelo || '',
            data_plantio: estufaToEdit.plantio?.data_plantio 
              ? new Date(estufaToEdit.plantio.data_plantio).toISOString().split('T')[0] 
              : '',
            data_coleta: estufaToEdit.plantio?.data_coleta 
              ? new Date(estufaToEdit.plantio.data_coleta).toISOString().split('T')[0] 
              : ''
          }
        });
      } else {
        resetForm();
      }
    }
  }, [estufaToEdit, isOpen]);

  const resetForm = () => {
    setFormData({
      nome: '',
      codigo: '',
      tipo: '',
      descricao: '',
      status: 'Ativa',
      numero_compostos: '',
      plantio: {
        substrato: '',
        tipo_cogumelo: '',
        data_plantio: '',
        data_coleta: ''
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('plantio.')) {
      const plantioField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        plantio: {
          ...prev.plantio,
          [plantioField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (estufaToEdit) {
        await estufaService.updateEstufa(estufaToEdit._id, formData);
      } else {
        await estufaService.createEstufa(formData);
      }
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      alert(`Erro ao ${estufaToEdit ? 'atualizar' : 'criar'} estufa: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{estufaToEdit ? '✏️ Editar Estufa' : '🍄 Nova Estufa'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* INFORMAÇÕES BÁSICAS */}
          <section className={styles.section}>
            <h3>📋 Informações Básicas</h3>
            
            <div className={styles.formGroup}>
              <label>Nome da Estufa *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Estufa A - Shiitake"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Código *</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: EST-001"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo *</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Climatizada">Climatizada</option>
                  <option value="Natural">Natural</option>
                  <option value="Semi-climatizada">Semi-climatizada</option>
                  <option value="Túnel">Túnel</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Número de Compostos</label>
                <input
                  type="text"
                  name="numero_compostos"
                  value={formData.numero_compostos}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="3"
                placeholder="Descreva as características da estufa..."
              />
            </div>
          </section>

          {/* INFORMAÇÕES DE PLANTIO */}
          <section className={styles.section}>
            <h3>🌱 Informações de Plantio</h3>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Substrato</label>
                <input
                  type="text"
                  name="plantio.substrato"
                  value={formData.plantio.substrato}
                  onChange={handleChange}
                  placeholder="Ex: Palha de trigo"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo de Cogumelo</label>
                <select
                  name="plantio.tipo_cogumelo"
                  value={formData.plantio.tipo_cogumelo}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="Shiitake">Shiitake</option>
                  <option value="Shimeji">Shimeji</option>
                  <option value="Champignon">Champignon</option>
                  <option value="Pleurotus">Pleurotus (Ostra)</option>
                  <option value="Hiratake">Hiratake</option>
                  <option value="Misto">Misto</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Data de Plantio</label>
                <input
                  type="date"
                  name="plantio.data_plantio"
                  value={formData.plantio.data_plantio}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Data de Colheita Prevista</label>
                <input
                  type="date"
                  name="plantio.data_coleta"
                  value={formData.plantio.data_coleta}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* BOTÕES */}
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
              {loading ? 'Salvando...' : (estufaToEdit ? 'Atualizar' : 'Criar Estufa')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}