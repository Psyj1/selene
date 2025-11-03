import { useState, useEffect } from 'react';
import { produtorService } from '../services/produtorService';
import Layout from '../components/Layout';
import ProducerFormModal from '../components/ProducerFormModal';
import styles from './produtores.module.css';

export default function Produtores() {
  const [produtores, setProdutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtorToEdit, setProdutorToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProdutores();
  }, []);

  const loadProdutores = async () => {
    try {
      setLoading(true);
      const produtoresData = await produtorService.getAllProdutores();
      setProdutores(produtoresData);
      setError('');
    } catch (error) {
      console.error('❌ Erro detalhado:', error);
      setError('Erro ao carregar produtores');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (produtor = null) => {
    setProdutorToEdit(produtor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProdutorToEdit(null);
  };

  const handleSuccess = () => {
    loadProdutores();
  };

  const handleDeleteProdutor = async (id, nome) => {
    if (!confirm(`Tem certeza que deseja excluir o produtor "${nome}"?`)) return;
    
    try {
      await produtorService.deleteProdutor(id);
      loadProdutores();
    } catch (error) {
      alert('Erro ao excluir produtor: ' + error.message);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const averageAge = () => {
    const ages = produtores
      .filter(p => p.data_nascimento)
      .map(p => calculateAge(p.data_nascimento))
      .filter(age => age !== null);
    
    if (ages.length === 0) return 0;
    return Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length);
  };

  const filteredProdutores = produtores.filter(produtor =>
    produtor.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produtor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produtor.cpf?.includes(searchTerm)
  );

  if (loading) return (
    <Layout>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando produtores...</p>
      </div>
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <div className={styles.error}>
        <h3>❌ Erro ao carregar</h3>
        <p>{error}</p>
        <button onClick={loadProdutores} className={styles.retryButton}>
          🔄 Tentar novamente
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={styles.dashboard}>
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1>👨‍🌾 Produtores</h1>
            <p>Gerencie todos os produtores cadastrados no sistema</p>
          </div>
          <button onClick={() => handleOpenModal()} className={styles.addButton}>
            + Novo Produtor
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>👥</div>
            <div className={styles.cardContent}>
              <h3>Total de Produtores</h3>
              <span className={styles.number}>{produtores.length}</span>
              <span className={styles.label}>cadastrados</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📞</div>
            <div className={styles.cardContent}>
              <h3>Com Contato</h3>
              <span className={styles.number}>
                {produtores.filter(p => p.telefone).length}
              </span>
              <span className={styles.label}>com telefone</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>📧</div>
            <div className={styles.cardContent}>
              <h3>Com Email</h3>
              <span className={styles.number}>
                {produtores.filter(p => p.email).length}
              </span>
              <span className={styles.label}>com email</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎂</div>
            <div className={styles.cardContent}>
              <h3>Idade Média</h3>
              <span className={styles.number}>{averageAge()}</span>
              <span className={styles.label}>anos</span>
            </div>
          </div>
        </div>

        {/* BUSCA */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="🔍 Buscar por nome, email ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className={styles.clearButton}
            >
              ✕
            </button>
          )}
        </div>

        {/* LISTA DE PRODUTORES */}
        <section className={styles.produtoresSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>📋 Produtores Cadastrados</h2>
              <span className={styles.count}>
                {filteredProdutores.length} {filteredProdutores.length === 1 ? 'produtor' : 'produtores'}
              </span>
            </div>
          </div>

          {filteredProdutores.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>👨‍🌾</div>
              <h3>
                {searchTerm ? 'Nenhum produtor encontrado' : 'Nenhum produtor cadastrado'}
              </h3>
              <p>
                {searchTerm 
                  ? `Não encontramos resultados para "${searchTerm}"`
                  : 'Comece cadastrando o primeiro produtor do sistema'}
              </p>
              {!searchTerm && (
                <button onClick={() => handleOpenModal()} className={styles.emptyButton}>
                  + Cadastrar Primeiro Produtor
                </button>
              )}
            </div>
          ) : (
            <div className={styles.produtoresGrid}>
              {filteredProdutores.map(produtor => (
                <div key={produtor._id} className={styles.produtorCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      {produtor.nome?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.headerInfo}>
                      <h3>{produtor.nome}</h3>
                      <span className={styles.email}>{produtor.email}</span>
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        onClick={() => handleOpenModal(produtor)}
                        className={styles.editButton}
                        title="Editar produtor"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteProdutor(produtor._id, produtor.nome)}
                        className={styles.deleteButton}
                        title="Excluir produtor"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <div className={styles.infoGrid}>
                      {produtor.cpf && (
                        <div className={styles.infoItem}>
                          <span className={styles.label}>🆔 CPF:</span>
                          <span className={styles.value}>{produtor.cpf}</span>
                        </div>
                      )}
                      {produtor.telefone && (
                        <div className={styles.infoItem}>
                          <span className={styles.label}>📞 Telefone:</span>
                          <span className={styles.value}>{produtor.telefone}</span>
                        </div>
                      )}
                      {produtor.data_nascimento && (
                        <div className={styles.infoItem}>
                          <span className={styles.label}>🎂 Nascimento:</span>
                          <span className={styles.value}>
                            {new Date(produtor.data_nascimento).toLocaleDateString('pt-BR')}
                            {' '}({calculateAge(produtor.data_nascimento)} anos)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <ProducerFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        produtorToEdit={produtorToEdit}
      />
    </Layout>
  );
}