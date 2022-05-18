const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    mode: 'development',

    devServer: {
        port: 3000,
        hot: true,
        static: {
            directory: path.join(__dirname, './public'),
        },
    },

    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: ('./public/index.html'),
            inject: 'body'
        }),

        new CleanWebpackPlugin(),

        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    }
}