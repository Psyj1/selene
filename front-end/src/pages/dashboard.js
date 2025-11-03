import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { farmService } from '../services/farmService';
import { estufaService } from '../services/estufaService';
import { sensorService } from '../services/sensorService';
import { reportService } from '../services/reportService';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('7days');
  const [realData, setRealData] = useState({
    farms: [],
    greenhouses: [],
    sensors: [],
    reports: []
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [farms, greenhouses, sensors, reports] = await Promise.all([
        farmService.getAllFarms(),
        estufaService.getAllEstufas(),
        sensorService.getAllSensors(),
        reportService.getAllReports()
      ]);
      
      setRealData({ farms, greenhouses, sensors, reports });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // DADOS SIMULADOS - Temperatura 24h
  const temperatureData = [
    { hora: '00:00', estufa_a: 22, estufa_b: 21, estufa_c: 23 },
    { hora: '04:00', estufa_a: 21, estufa_b: 20, estufa_c: 22 },
    { hora: '08:00', estufa_a: 24, estufa_b: 23, estufa_c: 25 },
    { hora: '12:00', estufa_a: 28, estufa_b: 27, estufa_c: 29 },
    { hora: '16:00', estufa_a: 26, estufa_b: 25, estufa_c: 27 },
    { hora: '20:00', estufa_a: 24, estufa_b: 23, estufa_c: 25 },
    { hora: '24:00', estufa_a: 22, estufa_b: 21, estufa_c: 23 }
  ];

  // DADOS SIMULADOS - Produção Mensal
  const productionData = realData.greenhouses.slice(0, 6).map((gh, idx) => ({
    name: gh.nome || `Estufa ${idx + 1}`,
    producao: Math.floor(Math.random() * 300) + 150
  }));

  // DADOS REAIS - Status Sensores
  const sensorStatusData = [
    { name: 'Ativos', value: realData.sensors.filter(s => s.status === 'Ativo').length, color: '#48bb78' },
    { name: 'Inativos', value: realData.sensors.filter(s => s.status === 'Inativo').length, color: '#e53e3e' },
    { name: 'Manutenção', value: realData.sensors.filter(s => s.status === 'Manutenção').length, color: '#f57c00' }
  ].filter(item => item.value > 0);

  // DADOS REAIS - Status Estufas
  const greenhouseStatusData = [
    { name: 'Ativas', value: realData.greenhouses.filter(g => g.status === 'Ativa').length, color: '#48bb78' },
    { name: 'Inativas', value: realData.greenhouses.filter(g => g.status === 'Inativa').length, color: '#e53e3e' },
    { name: 'Manutenção', value: realData.greenhouses.filter(g => g.status === 'Manutenção').length, color: '#f57c00' }
  ].filter(item => item.value > 0);

  // DADOS SIMULADOS - Produção Acumulada
  const cumulativeData = [
    { mes: 'Jan', producao: 850 },
    { mes: 'Fev', producao: 1200 },
    { mes: 'Mar', producao: 1800 },
    { mes: 'Abr', producao: 2400 },
    { mes: 'Mai', producao: 3100 },
    { mes: 'Jun', producao: 3800 }
  ];

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* HEADER */}
        <header className={styles.header}>
          <div>
            <h1>📊 Dashboard Analítico</h1>
            <p>Visão completa do sistema em tempo real</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={loadAllData} 
              className={styles.refreshButton}
              title="Atualizar dados"
            >
              🔄 Atualizar
            </button>
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="today">Hoje</option>
              <option value="7days">7 dias</option>
              <option value="30days">30 dias</option>
              <option value="year">Ano</option>
            </select>
          </div>
        </header>

        {/* CARDS DE RESUMO */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏠</div>
            <div className={styles.cardContent}>
              <h3>Fazendas</h3>
              <span className={styles.number}>{realData.farms.length}</span>
              <span className={styles.label}>total cadastradas</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🍄</div>
            <div className={styles.cardContent}>
              <h3>Estufas</h3>
              <span className={styles.number}>{realData.greenhouses.length}</span>
              <span className={styles.label}>
                {realData.greenhouses.filter(g => g.status === 'Ativa').length} ativas
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📡</div>
            <div className={styles.cardContent}>
              <h3>Sensores</h3>
              <span className={styles.number}>{realData.sensors.length}</span>
              <span className={styles.label}>
                {realData.sensors.filter(s => s.status === 'Ativo').length} online
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <div className={styles.cardContent}>
              <h3>Relatórios</h3>
              <span className={styles.number}>{realData.reports.length}</span>
              <span className={styles.label}>
                {realData.reports.filter(r => r.status === 'Concluído').length} concluídos
              </span>
            </div>
          </div>
        </div>

        {/* GRÁFICOS - LINHA 1 */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <h3>🌡️ Temperatura das Estufas (24h)</h3>
            <p className={styles.subtitle}>Monitoramento em tempo real</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="hora" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="estufa_a" 
                  stroke="#9CC35B" 
                  strokeWidth={2}
                  name="Estufa A"
                  dot={{ fill: '#9CC35B' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="estufa_b" 
                  stroke="#3C4A64" 
                  strokeWidth={2}
                  name="Estufa B"
                  dot={{ fill: '#3C4A64' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="estufa_c" 
                  stroke="#F57C00" 
                  strokeWidth={2}
                  name="Estufa C"
                  dot={{ fill: '#F57C00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h3>🍄 Produção por Estufa (Este Mês)</h3>
            <p className={styles.subtitle}>Quantidade em kg</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="producao" fill="#9CC35B" name="Produção (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICOS - LINHA 2 */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <h3>📡 Status dos Sensores</h3>
            <p className={styles.subtitle}>Distribuição por status</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sensorStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sensorStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h3>✅ Status das Estufas</h3>
            <p className={styles.subtitle}>Distribuição por status</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={greenhouseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {greenhouseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO - LINHA 3 (LARGURA TOTAL) */}
        <div className={styles.chartCardFull}>
          <h3>📈 Produção Acumulada do Ano</h3>
          <p className={styles.subtitle}>Total em kg ao longo dos meses</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="mes" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="producao" 
                stroke="#9CC35B" 
                fill="#9CC35B" 
                fillOpacity={0.3}
                name="Produção Acumulada (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <p>🔄 Última atualização: {new Date().toLocaleString('pt-BR')}</p>
          <div className={styles.footerActions}>
            <button className={styles.exportButton}>📥 Exportar PDF</button>
            <button className={styles.exportButton}>📥 Exportar Excel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}