/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8080',
                pathname: '/api/**',
            },
        ],
    },
}

module.exports = nextConfig
