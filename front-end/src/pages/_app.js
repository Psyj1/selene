import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticação em rotas protegidas
    const user = localStorage.getItem('user');
    const publicRoutes = ['/'];
    
    if (!user && !publicRoutes.includes(router.pathname)) {
      router.push('/');
    }
  }, [router]);

  return <Component {...pageProps} />;
}