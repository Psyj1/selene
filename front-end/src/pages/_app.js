// pages/_app.js
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Não renderiza até estar no cliente
  if (!mounted) {
    return <div style={{ visibility: 'hidden', height: '100vh' }}></div>;
  }

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}