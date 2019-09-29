const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const location = require('./config/location')

const NODE_ENV = process.env.NODE_ENV
const PUBLIC_URL = '/annotate/';
const devMode = NODE_ENV === "production";

module.exports = {
    entry: {
        'app': [
            location.root('src/index.js')
        ]
    },
    output: {
        path: location.root('build'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app' : 'src/index',
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]

            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

      
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV: JSON.stringify(NODE_ENV),
                PUBLIC_URL: JSON.stringify(PUBLIC_URL)
            }
        }),
        new HtmlWebPackPlugin({
            template: location.root('/public/index.html'),
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
    ]
}

