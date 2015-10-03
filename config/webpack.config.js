var webpack = require('webpack');
var pkg = require('../package.json');
var util = require('util');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version=' + 1,
        'title=' + 'vd',
        'debug=' + true
    ].join('&')
].join('!');
var entry = {
    app: [
        'webpack/hot/dev-server',
        './app.js'
    ]
};
entry.app.push(
    util.format(
        'webpack-dev-server/client?http://%s:%d',
        pkg.config.devHost,
        pkg.config.devPort
    )
);
entry.app.push('webpack/hot/dev-server');

module.exports = {
    context: path.join(__dirname, '../app'),
    devtool: 'inline-source-map',
    publicPath: '',
    entry: entry,
    output: {
        path: __dirname + '/app',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.html', '.js', '.scss'],
        modulesDirectories: ['web_modules', 'node_modules', '../app']
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')}
        ]
    },
    devServer:{
        contentBase: path.resolve(pkg.config.buildDir),
        hot: true,
        noInfo: true,
        inline: true,
        stats: { colors: true },
        historyApiFallback: true
    }
}