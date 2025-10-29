// pages/sensors.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Simula carregamento de dados
    setTimeout(() => {
      setSensors([
        {
          _id: '1',
          nome: 'Sensor de Temperatura 01',
          tipo: 'Temperatura', 
          localizacao: 'Estufa A',
          status: 'Ativo',
          bateria: '85',
          ultimaLeitura: '2024-01-15 14:30'
        },
        {
          _id: '2', 
          nome: 'Sensor de Umidade 01',
          tipo: 'Umidade',
          localizacao: 'Estufa B',
          status: 'Ativo',
          bateria: '72',
          ultimaLeitura: '2024-01-15 14:25'
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddSensor = () => {
    router.push('/sensor-create');
  };

  // Evita hydration
  if (!mounted) {
    return (
      <Layout>
        <div style={{ minHeight: '400px' }}></div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #000',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Carregando Sensores</h3>
          <p style={{ color: '#666' }}>Buscando dados dos sensores...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              color: '#333', 
              marginBottom: '8px',
              fontWeight: '700'
            }}>
              📡 Sensores
            </h1>
            <p style={{ 
              color: '#666', 
              margin: 0,
              fontSize: '16px'
            }}>
              Monitoramento em tempo real dos sensores do sistema
            </p>
          </div>
          <button onClick={handleAddSensor} style={{
            background: '#000',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            + Novo Sensor
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              fontSize: '32px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>📡</div>
            <div>
              <h3 style={{
                fontSize: '14px',
                color: '#666',
                margin: '0 0 8px 0',
                textTransform: 'uppercase'
              }}>Total de Sensores</h3>
              <span style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#000',
                display: 'block'
              }}>{sensors.length}</span>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              fontSize: '32px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>✅</div>
            <div>
              <h3 style={{
                fontSize: '14px',
                color: '#666',
                margin: '0 0 8px 0',
                textTransform: 'uppercase'
              }}>Sensores Ativos</h3>
              <span style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#000',
                display: 'block'
              }}>
                {sensors.filter(s => s.status === 'Ativo').length}
              </span>
            </div>
          </div>
        </div>

        {/* LISTA DE SENSORES */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{ 
                color: '#333', 
                margin: '0',
                fontSize: '24px'
              }}>
                Sensores Cadastrados
              </h2>
              <span style={{
                color: '#666',
                fontSize: '14px',
                display: 'block',
                marginTop: '4px'
              }}>
                {sensors.length} sensores encontrados
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {sensors.map(sensor => (
              <div key={sensor._id} style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    margin: '0',
                    fontSize: '18px',
                    color: '#333',
                    flex: '1',
                    marginRight: '10px'
                  }}>{sensor.nome}</h3>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#333', minWidth: '80px' }}>Tipo:</strong> 
                      {sensor.tipo}
                    </p>
                    <p style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#333', minWidth: '80px' }}>Localização:</strong> 
                      {sensor.localizacao}
                    </p>
                    <p style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#333', minWidth: '80px' }}>Bateria:</strong> 
                      🔋 {sensor.bateria}%
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      background: sensor.status === 'Ativo' ? '#e8f5e8' : '#ffebee',
                      color: sensor.status === 'Ativo' ? '#2e7d32' : '#c62828'
                    }}>
                      {sensor.status}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      📅 {sensor.ultimaLeitura}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '16px'
                }}>
                  <button style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    📊 Ver Dados
                  </button>
                  <button style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    ⚙️ Configurar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sensors.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📡</div>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>Nenhum sensor encontrado</h3>
              <p>Comece adicionando o primeiro sensor ao sistema</p>
              <button onClick={handleAddSensor} style={{
                background: '#000',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                marginTop: '16px',
                cursor: 'pointer'
              }}>
                + Adicionar Primeiro Sensor
              </button>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}