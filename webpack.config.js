const path = require('path');
const fs = require("fs")
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');
const Handlebars = require("handlebars")
const DashboardPlugin = require("webpack-dashboard/plugin");
module.exports = {
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".js", ".html"],
        alias: {
            "lib": "src/lib"
        }
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: 'swc-loader'
                }
            },
            {
                exclude: path.resolve(__dirname, "src/index.html"),
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.s(a|c)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, "src/index.html")}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
        }),
        new DashboardPlugin()
    ]
}
