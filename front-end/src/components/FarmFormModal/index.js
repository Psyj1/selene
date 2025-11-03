import { useState, useEffect } from 'react';
import { farmService } from '../../services/farmService';
import styles from './FarmFormModal.module.css';

export default function FarmFormModal({ isOpen, onClose, onSuccess, farmToEdit = null }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '',
    foco_producao: '',
    area_total: '',
    area_cultivo: '',
    tipo_terreno: '',
    numero_estufas: '',
    capacidade_producao: '',
    status_operacional: 'Ativa',
    responsavel: '',
    telefone_responsavel: '',
    email_responsavel: '',
    cnpj: ''
  });

  // Preencher formulário quando for edição
  useEffect(() => {
    if (farmToEdit) {
      setFormData(farmToEdit);
    } else {
      // Reset form quando não for edição
      setFormData({
        nome: '',
        rua: '',
        bairro: '',
        numero: '',
        cidade: '',
        estado: '',
        foco_producao: '',
        area_total: '',
        area_cultivo: '',
        tipo_terreno: '',
        numero_estufas: '',
        capacidade_producao: '',
        status_operacional: 'Ativa',
        responsavel: '',
        telefone_responsavel: '',
        email_responsavel: '',
        cnpj: ''
      });
    }
  }, [farmToEdit, isOpen]);

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
      if (farmToEdit) {
        // UPDATE
        await farmService.updateFarm(farmToEdit._id, formData);
      } else {
        // CREATE
        await farmService.createFarm(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      alert(`Erro ao ${farmToEdit ? 'atualizar' : 'criar'} fazenda: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{farmToEdit ? '✏️ Editar Fazenda' : '➕ Nova Fazenda'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* INFORMAÇÕES BÁSICAS */}
          <section className={styles.section}>
            <h3>📋 Informações Básicas</h3>
            
            <div className={styles.formGroup}>
              <label>Nome da Fazenda *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Fazenda Cogumelo Feliz"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Foco de Produção *</label>
                <select
                  name="foco_producao"
                  value={formData.foco_producao}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Shiitake">Shiitake</option>
                  <option value="Champignon">Champignon</option>
                  <option value="Shimeji">Shimeji</option>
                  <option value="Pleurotus">Pleurotus (Ostra)</option>
                  <option value="Misto">Misto</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Status Operacional *</label>
                <select
                  name="status_operacional"
                  value={formData.status_operacional}
                  onChange={handleChange}
                  required
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                  <option value="Em Manutenção">Em Manutenção</option>
                </select>
              </div>
            </div>
          </section>

          {/* ENDEREÇO */}
          <section className={styles.section}>
            <h3>📍 Endereço</h3>
            
            <div className={styles.row}>
              <div className={styles.formGroup} style={{ flex: 2 }}>
                <label>Rua</label>
                <input
                  type="text"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                  placeholder="Ex: Rua das Flores"
                />
              </div>

              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label>Número</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="123"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Ex: Centro"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Cidade *</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  placeholder="Ex: São Paulo"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Estado *</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="">UF</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
            </div>
          </section>

          {/* DADOS TÉCNICOS */}
          <section className={styles.section}>
            <h3>🌾 Dados Técnicos</h3>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Área Total (hectares)</label>
                <input
                  type="number"
                  name="area_total"
                  value={formData.area_total}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Ex: 5.5"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Área de Cultivo (hectares)</label>
                <input
                  type="number"
                  name="area_cultivo"
                  value={formData.area_cultivo}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Ex: 3.2"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Tipo de Terreno</label>
                <select
                  name="tipo_terreno"
                  value={formData.tipo_terreno}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="Plano">Plano</option>
                  <option value="Inclinado">Inclinado</option>
                  <option value="Misto">Misto</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Número de Estufas</label>
                <input
                  type="number"
                  name="numero_estufas"
                  value={formData.numero_estufas}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Capacidade de Produção</label>
              <input
                type="text"
                name="capacidade_producao"
                value={formData.capacidade_producao}
                onChange={handleChange}
                placeholder="Ex: 500kg/mês"
              />
            </div>
          </section>

          {/* RESPONSÁVEL */}
          <section className={styles.section}>
            <h3>👤 Responsável</h3>
            
            <div className={styles.formGroup}>
              <label>Nome do Responsável *</label>
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                required
                placeholder="Ex: João Silva"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="telefone_responsavel"
                  value={formData.telefone_responsavel}
                  onChange={handleChange}
                  required
                  placeholder="(11) 98888-7777"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email_responsavel"
                  value={formData.email_responsavel}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
              />
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
              {loading ? 'Salvando...' : (farmToEdit ? 'Atualizar' : 'Criar Fazenda')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}