const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');



module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '~',
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new GenerateSW({
            swDest: './sw.bundle.js',
            runtimeCaching: [
                {
                    urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'e-halalResto',
                    },
                },
            ],
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/templates/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: path.resolve(__dirname, 'dist/'),
                    globOptions: {
                        ignore: ['**/images/**'],
                    }
                },
            ],
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
        }),
    ],
};
