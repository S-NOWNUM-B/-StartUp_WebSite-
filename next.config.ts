import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем экспериментальные функции
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Временно отключаем ESLint для сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Улучшенная обработка изображений
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Настройки производительности
  compress: true,
  poweredByHeader: false,
  
  // Заголовки безопасности
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
