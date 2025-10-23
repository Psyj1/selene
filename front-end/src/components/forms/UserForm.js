import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './UserForm.css';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    status: user?.status || 'active',
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
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-row">
        <Input
          label="Nome Completo"
          name="name"
          placeholder="Digite o nome completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="usuario@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="input-label">Tipo de Usuário</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
            <option value="producer">Produtor</option>
          </select>
        </div>

        <div className="form-group">
          <label className="input-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {user ? 'Atualizar' : 'Cadastrar'} Usuário
        </Button>
      </div>
    </form>
  );
};

export default UserForm;