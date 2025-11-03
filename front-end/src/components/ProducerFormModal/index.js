import { useState, useEffect } from 'react';
import { produtorService } from '../../services/produtorService';
import styles from './ProducerFormModal.module.css';

export default function ProducerFormModal({ isOpen, onClose, onSuccess, produtorToEdit = null }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    data_nascimento: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (produtorToEdit) {
        setFormData({
          nome: produtorToEdit.nome || '',
          email: produtorToEdit.email || '',
          senha: '', // Não preenche senha por segurança
          cpf: produtorToEdit.cpf || '',
          telefone: produtorToEdit.telefone || '',
          data_nascimento: produtorToEdit.data_nascimento 
            ? new Date(produtorToEdit.data_nascimento).toISOString().split('T')[0]
            : ''
        });
      } else {
        resetForm();
      }
    }
  }, [produtorToEdit, isOpen]);

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      cpf: '',
      telefone: '',
      data_nascimento: ''
    });
  };

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
      // Remove senha vazia em edição
      const dataToSend = { ...formData };
      if (produtorToEdit && !dataToSend.senha) {
        delete dataToSend.senha;
      }

      if (produtorToEdit) {
        await produtorService.updateProdutor(produtorToEdit._id, dataToSend);
      } else {
        await produtorService.createProdutor(dataToSend);
      }
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      alert(`Erro ao ${produtorToEdit ? 'atualizar' : 'criar'} produtor: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{produtorToEdit ? '✏️ Editar Produtor' : '👨‍🌾 Novo Produtor'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <section className={styles.section}>
            <h3>📋 Dados Pessoais</h3>
            
            <div className={styles.formGroup}>
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: João Silva Santos"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength="14"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3>📞 Contato</h3>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 98888-7777"
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3>🔒 Acesso ao Sistema</h3>
            
            <div className={styles.formGroup}>
              <label>
                {produtorToEdit ? 'Nova Senha (deixe vazio para manter a atual)' : 'Senha *'}
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required={!produtorToEdit}
                placeholder={produtorToEdit ? 'Digite apenas se quiser alterar' : 'Digite uma senha segura'}
                minLength="6"
              />
              <small className={styles.hint}>
                {produtorToEdit 
                  ? 'Deixe em branco para manter a senha atual'
                  : 'Mínimo de 6 caracteres'}
              </small>
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
              {loading ? 'Salvando...' : (produtorToEdit ? 'Atualizar' : 'Criar Produtor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}