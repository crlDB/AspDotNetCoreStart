## AspDotNetCoreStart

### node configuration file - package.json

```
{
  "version": "1.0.0",
  "name": "asp.net",
  "private": true,
  "devDependencies": {
    "webpack": "4.29.6",
    "webpack-cli": "^3.3.0",
    "mini-css-extract-plugin": "0.5.0",
    "hard-source-webpack-plugin": "0.13.1",
    "ts-loader": "5.3.3",
    "typescript": "3.4.3",
    "css-loader": "2.1.1"
  },
  "dependencies": {
    "jquery": "3.4.0",
    "bootstrap": "4.3.1",
    "popper.js": "1.15.0"
  }
}
```



### webpack configuration file - webpack.config.js


```
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
```


### typescript configuration file - tsconfig.json

```
{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5",
    "moduleResolution": "node",
    "rootDir": "./src/ts",
    "outDir": "./src/js",
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": false
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules",
    "wwwroot"
  ]
}
``` 

### source folder

* Scr
* Scr/css
* Scr/js
* Src/ts



### typescript start

### add tpes (d.ts)





