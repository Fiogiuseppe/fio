import type { NextConfig } from 'next';

const ureesProductSlugs = ['urees-piece-026', 'urees-drop-02'];

const workToShopRedirects = [
  'art-hag',
  'tutti-in-uno',
  'art-ig-20213',
  'pee-pee',
  'skin-is-the-new-canvas',
  'eyes',
  'art-ig-2021',
] as const;

const workToShopDestinations: Record<string, string> = {
  'art-hag': '/shop/drawing-hag',
  'art-ig-20213': '/shop/artwork-blue-study',
  'art-ig-2021': '/shop/artwork-visual-study',
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/shop/cacophobia',
        destination: '/cacophobia',
        permanent: true,
      },
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
      ...workToShopRedirects.map((slug) => ({
        source: `/work/${slug}`,
        destination: workToShopDestinations[slug] ?? `/shop/${slug}`,
        permanent: true,
      })),
      {
        source: '/work/zalio',
        destination: 'https://www.instagram.com/p/CkyPK69N3sB/',
        permanent: false,
      },
      {
        source: '/work/sec-brunch',
        destination: 'https://www.instagram.com/p/CavSZkFNRM-/?img_index=1',
        permanent: false,
      },
      {
        source: '/work/urees',
        destination: 'https://www.instagram.com/p/CtOaVAYNWa9/?img_index=1',
        permanent: false,
      },
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
        hostname: 'scontent-iad3-1.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-2.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
        pathname: '/**',
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
