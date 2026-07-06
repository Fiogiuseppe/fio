import type { NextConfig } from 'next';

const ureesProductSlugs = ['urees-piece-026', 'urees-drop-02'];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/the_conide',
        destination: '/the-conide',
        permanent: true,
      },
      {
        source: '/the_conide/:path*',
        destination: '/the-conide',
        permanent: true,
      },
      {
        source: '/shop/category/:category',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/shop/category/urees',
        destination: '/urees',
        permanent: true,
      },
      ...ureesProductSlugs.map((slug) => ({
        source: `/shop/${slug}`,
        destination: `/urees/shop/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fiogiuseppe.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: 'urees.shop',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lego.com',
        pathname: '/cdn/**',
      },
    ],
  },
};

export default nextConfig;
