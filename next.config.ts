// next.config.ts

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack(config, options) {
        config.module?.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

export default nextConfig
