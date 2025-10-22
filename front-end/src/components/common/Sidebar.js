import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiUsers, FiPackage, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/users', label: 'Usuários', icon: <FiUsers size={20} /> },
    { path: '/greenhouses', label: 'Estufas', icon: <FiPackage size={20} /> },
    { path: '/settings', label: 'Configurações', icon: <FiSettings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`nav-link ${router.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;