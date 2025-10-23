import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './GreenhouseForm.css';

const GreenhouseForm = ({ greenhouse, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: greenhouse?.name || '',
    location: greenhouse?.location || '',
    producer: greenhouse?.producer || '',
    capacity: greenhouse?.capacity || '',
    status: greenhouse?.status || 'active',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="greenhouse-form">
      <div className="form-row">
        <Input
          label="Nome da Estufa"
          name="name"
          placeholder="Digite o nome da estufa"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <Input
          label="Localização"
          name="location"
          placeholder="Endereço ou localização"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <Input
          label="Produtor Responsável"
          name="producer"
          placeholder="Nome do produtor"
          value={formData.producer}
          onChange={handleChange}
          required
        />

        <Input
          label="Capacidade (m²)"
          type="number"
          name="capacity"
          placeholder="Capacidade em metros quadrados"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="input-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="active">Ativa</option>
            <option value="maintenance">Manutenção</option>
            <option value="inactive">Inativa</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {greenhouse ? 'Atualizar' : 'Cadastrar'} Estufa
        </Button>
      </div>
    </form>
  );
};

export default GreenhouseForm;