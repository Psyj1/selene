import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'home', label: 'Fazendas', path: '/farms', icon: '🏠' },
    { id: 'estufas', label: 'Estufas', path: '/estufas', icon: '🍄' },
    { id: 'sensores', label: 'Sensores', path: '/sensores', icon: '📡' },
    { id: 'relatorios', label: 'Relatórios', path: '/reports', icon: '📋' },
    { id: 'produtores', label: 'Produtores', path: '/produtores', icon: '👨‍🌾' },
  ];

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
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
        </div>
      </nav>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}