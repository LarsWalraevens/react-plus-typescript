const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.tsx", // Start processing code from this file
    devtool: "eval-source-map",
    resolve: { // resolve typescript files, doesnt do this by default
        extensions: ['.js', '.ts', '.tsx']
    },
    // register ts-loader for typescript files
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node-modules/,
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
}