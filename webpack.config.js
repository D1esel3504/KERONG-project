const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

let isDev = process.env.NODE_ENV === 'development';
let isProd = !isDev;

let optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}



module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    optimization: optimization(),

    devServer: {
        port: 3000,
        hot: isDev,
        static: {
            directory: path.join(__dirname, './public'),
        },
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
    },

    stats: {
        children: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: ('./public/index.html'),
            minify: {
                collapseWhitespace: isProd
            }
        }),

        new CleanWebpackPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        new ESLintPlugin(),

        new PrettierPlugin({
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            encoding: 'utf-8',
            singleQuote: true,
            extensions: [".js", ".jsx", 'css', 'scss']
        })

    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
}