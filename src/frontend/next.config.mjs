/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
            },
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_BACKEND_IP,
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_BACKEND_IP,
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.intra.42.fr',
            }
        ],
    },
};

export default nextConfig;
