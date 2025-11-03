// components/AppClient.js
import { ThemeProvider } from '../context/ThemeContext';

export default function AppClient({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}