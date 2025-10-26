import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const menuItems = [
    { id: 'home', label: 'Home', path: '/farms', icon: '🏠' },
    { id: 'relatorios', label: 'Relatórios', path: '/relatorios', icon: '📊' },
    { id: 'sensores', label: 'Sensores', path: '/sensores', icon: '📡' },
    { id: 'estufas', label: 'Estufas', path: '/estufas', icon: '🍄' },
    { id: 'produtores', label: 'Produtores', path: '/produtores', icon: '👨‍🌾' },
  ];

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className={styles.container}>
      {/* NAVBAR VERTICAL */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1>Selene</h1>
          <span>Sistema de Monitoramento</span>
        </div>
        
        <ul className={styles.menu}>
          {menuItems.map(item => (
            <li key={item.id}>
              <button 
                onClick={() => handleNavigation(item.path)}
                className={`${styles.menuButton} ${isActive(item.path) ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          {/* TOGGLE DE TEMA */}
          <button onClick={toggleTheme} className={styles.themeToggle}>
            <span className={styles.icon}>
              {isDark ? '☀️' : '🌙'}
            </span>
            <span className={styles.label}>
              {isDark ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </button>

          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.icon}>🚪</span>
            <span className={styles.label}>Sair</span>
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}