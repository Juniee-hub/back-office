/** @type {import('next').NextConfig} */
const securityHeaders = [
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
]
const nextConfig = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/attachment/fileDown',
                destination: '/api/attachment/fileDown',
                has: [{ type: 'query', key: 'id' }],
            },
        ]
    },
    experimental: { appDir: true, esmExternals: 'loose' },
    typescript: {
        ignoreBuildErrors: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    reactStrictMode: false,
}
module.exports = nextConfig
