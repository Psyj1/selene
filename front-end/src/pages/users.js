import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import UserForm from '../components/forms/UserForm';

export default function Users() {
  const { user, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleSubmitUser = (userData) => {
    console.log('Dados do usuário:', userData);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <>
      <Head>
        <title>Usuários - FungoDetect</title>
      </Head>

      <Header />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1>Gerenciar Usuários</h1>
                <p>Cadastre e gerencie os usuários do sistema</p>
              </div>
              <Button onClick={handleAddUser} variant="primary">
                + Novo Usuário
              </Button>
            </div>
          </div>

          {showForm ? (
            <div className="form-container">
              <UserForm
                user={editingUser}
                onSubmit={handleSubmitUser}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div className="users-container">
              <div className="card">
                <p>Lista de usuários será exibida aqui...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
        }

        .form-container {
          max-width: 600px;
        }

        .users-container {
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}