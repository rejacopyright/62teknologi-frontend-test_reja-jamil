const webpack = require('webpack')
const path = require('path')
const { whenDev, whenProd } = require('craco')

module.exports = {
  target: 'node',
  eslint: whenDev(() => ({
    enable: true,
    mode: 'file',
  })),
  typescript: whenDev(() => ({
    enableTypeChecking: true,
  })),
  webpack: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/_api'),
      '@assets': path.resolve(__dirname, 'src/_assets'),
      '@images': path.resolve(__dirname, 'src/_assets/images'),
      '@components': path.resolve(__dirname, 'src/_components'),
      '@helpers': path.resolve(__dirname, 'src/_helpers'),
      '@styles': path.resolve(__dirname, 'src/_styles'),
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process',
        }),
      ],
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 100000, // in bytes
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },

    configure: {
      ignoreWarnings: [/Failed to parse source map/],
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
          stream: require.resolve('stream-browserify'),
          crypto: require.resolve('crypto-browserify'),
          buffer: require.resolve('buffer'),
        },
      },
      optimization: whenProd(() => ({
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 1,
          maxSize: 100000,
          minChunks: 1,
          minRemainingSize: 0,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 30000,
          cacheGroups: {
            defaultVendors: {
              name: 'enam-dua',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      })),
    },
  },
}
