/// -----------------------------------------------------------------
/// webpack.dev.bat     -> bundle app for development
/// webpack.prod.bat    -> bundle app for production
/// webpack.vendor.bat  -> bundle vendor-lib for production
/// -----------------------------------------------------------------

/// webpack --version
/// webpack --help

/// webpack --config-name vendor --mode production --progress --color
/// webpack --config-name app --mode development --progress --color --watch

/// <binding />
var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

    
module.exports = [
    {
        name: 'vendor',
        target: 'web',
        entry: {
            "lib.vendor1": [
                'jquery',
                'bootstrap'             
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /vendor1/,
                        name: "lib.vendor1",
                        //enforce: true
                        chunks: "all"
                    }
                }
            }
        },


        output: {
            path: path.resolve(__dirname, 'wwwroot'),
            filename: '[name].bundle.js',
            library: "vendor_[hash]"
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery'
            }),
            new webpack.DllPlugin({
                name: "vendor_[hash]",
                path: path.resolve(__dirname, 'wwwroot/manifest.json')
            })

        ]
    },
    {
        name: 'app',
        target: 'web',
        devtool: 'source-map',
        entry: {
            "app": './src/ts/app.ts'
        },

        output: {
            path: path.resolve(__dirname, 'wwwroot'),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader?name=/image/[name].[ext]'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader?name=/fonts/[name].[ext]'
                    ],
                }

            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery'
            }),
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, "wwwroot/manifest.json")
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HardSourceWebpackPlugin()
        ]
    }
];


