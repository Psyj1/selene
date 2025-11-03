// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opções para evitar hydration errors
  compiler: {
    styledComponents: true,
  },
  // Se estiver usando experimental features
  experimental: {
    serverComponents: false,
  },
  // Melhor tratamento de erros
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;