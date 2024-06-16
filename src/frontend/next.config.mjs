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
				hostname: '127.0.0.1',
				port: '8000',
			},
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_BACKEND_HOST,
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },

};

export default nextConfig;