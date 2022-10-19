const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.tsx", // Start processing code from this file
    devtool: "eval-source-map",
    resolve: { // resolve typescript files, doesnt do this by default
        extensions: ['.js', '.ts', '.tsx']
    },
    // register ts-loader for typescript files
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node-modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { modules: true } }
                ]
            },
            {
                test: /\.svg$/,
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        // disable plugins
                                        removeViewBox: false,
                                    },
                                },
                            },
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
}