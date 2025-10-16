import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.uzum.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '13.222.190.158',
        port: '5050',
        pathname: '/uploads/**',
      },
    ],
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
