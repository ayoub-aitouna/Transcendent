/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '172.17.0.1',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.149',
            },

            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },

};

export default nextConfig;
