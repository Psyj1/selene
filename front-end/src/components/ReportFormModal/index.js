import { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import styles from './ReportFormModal.module.css';

export default function ReportFormModal({ isOpen, onClose, onSuccess, reportToEdit = null }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'Pendente',
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  });

  useEffect(() => {
    if (reportToEdit) {
      setFormData({
        titulo: reportToEdit.titulo || '',
        descricao: reportToEdit.descricao || '',
        status: reportToEdit.status || 'Pendente',
        data: reportToEdit.data ? new Date(reportToEdit.data).toISOString().split('T')[0] : '',
        hora: reportToEdit.hora || ''
      });
    } else {
      setFormData({
        titulo: '',
        descricao: '',
        status: 'Pendente',
        data: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      });
    }
  }, [reportToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (reportToEdit) {
        await reportService.updateReport(reportToEdit._id, formData);
      } else {
        await reportService.createReport(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      alert(`Erro ao ${reportToEdit ? 'atualizar' : 'criar'} relatório: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{reportToEdit ? '✏️ Editar Relatório' : '📊 Novo Relatório'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Título do Relatório *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ex: Relatório Mensal de Produção"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              placeholder="Descreva os principais pontos deste relatório..."
            />
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
                <option value="Pendente">Pendente</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Data *</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Hora</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
            />
          </div>

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
              {loading ? 'Salvando...' : (reportToEdit ? 'Atualizar' : 'Criar Relatório')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}