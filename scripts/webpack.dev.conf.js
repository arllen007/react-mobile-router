const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './example/index.js'
    },
    output: {
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            include: [resolve('src'), resolve('example')],
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            include: [resolve('src'), resolve('example')],
            use: ['style-loader', 'css-loader']
        }
        ],
    },
    devServer: {
        host: 'localhost',
        port: 8088,
        open: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: resolve('/dist/index.html'),
            template: resolve('/example/index.html')
        })
    ]
}
