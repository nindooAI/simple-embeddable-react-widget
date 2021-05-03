const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/main.js',
        mode: 'production',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                        presets: [
                            [
                                '@babel/preset-env', 
                                {
                                    "targets": "defaults" 
                                }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                  }],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack', 'url-loader'],
                },
                {
                    test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                }
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: [new copyWebpackPlugin([{ from: 'dist/' }])]
    }];
};