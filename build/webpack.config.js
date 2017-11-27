const path = require('path');
const webpack = require('webpack')
const pkg = require('../package.json');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const RELEASE_ROOT_PATH = 'dist';
const SOURCE_ROOT_PATH = 'src';
const EXAMPLE_PATH = 'example';
const RELEASE_FILE_NAME = pkg.name;
const RELEASE_FILE_VERSION = pkg.version;
const SOURCE_ENTRY_FILE = `${SOURCE_ROOT_PATH}/index.js`;

function resolvePath(p) {
    return path.resolve(__dirname, '../', p);
}

const banner = [
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * (c) 2017-09-10--<%= date %> <%= pkg.author %>',
    ' * Released under the <%= pkg.license %> License.',
    ' * <%= pkg.homepage %>',
    ' * <%= pkg.keywords %>'
].join('\n').replace(/<%=\s([^%]+)\s%>/g, ($0, $1) => ($1 === 'date' ? ((new Date()).toLocaleDateString()) : (pkg[$1.split('.')[1]] || '')));



module.exports = [{
    entry: resolvePath(SOURCE_ENTRY_FILE),
    output: {
        libraryTarget: "umd",
        filename: `${RELEASE_FILE_NAME}@webpack.js`,
        path: resolvePath(`${EXAMPLE_PATH}`),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|woff|svg)$/,
                use: "url-loader?limit=8000&name=img/[name].[hash:8].[ext]"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
},
{
    entry: resolvePath(SOURCE_ENTRY_FILE),
    output: {
        libraryTarget: "umd",
        filename: `${RELEASE_FILE_NAME}@webpack.js`,
        path: resolvePath(`${RELEASE_ROOT_PATH}/debug`),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|woff|svg)$/,
                use: "url-loader?limit=8000&name=img/[name].[hash:8].[ext]"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
},
{
    entry: resolvePath(SOURCE_ENTRY_FILE),
    output: {
        libraryTarget: "umd",
        filename: `${RELEASE_FILE_NAME}@webpack.min.js`,
        path: resolvePath(`${RELEASE_ROOT_PATH}/release`),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|woff|svg)$/,
                use: "url-loader?limit=8000&name=img/[name].[hash:8].[ext]"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new UglifyJSPlugin()
    ]
}];