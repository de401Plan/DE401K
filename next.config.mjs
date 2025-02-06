/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer }) => {
    // 合并现有的 experiments 配置，并启用 asyncWebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    };

    // 修改 .wasm 文件的处理规则
    config.module.rules.push({
      test: /\.wasm$/,
      use: ['wasm-loader'],
      type: 'webassembly/async',
    });

    // 为 o1js 添加特殊处理
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        os: false,
        http: false,
        https: false,
        stream: false,
        zlib: false,
      };
    }

    // 确保 WebAssembly 可以被正确复制
    config.output = {
      ...config.output,
      webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
    };

    return config;
  },
  // 添加这些配置以确保正确处理静态资源
  output: 'standalone',
  experimental: {
    serverActions: true,
    webassembly: true,
  },
};

export default nextConfig;
