var webpack = require('webpack');
var pkg = require('../package.json');
var util = require('util');
var path = require('path');
var jquery = require('jquery');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bowerRoot = path.join(__dirname, "../bower_components");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var WebPackAngularTranslate = require("webpack-angular-translate");

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
    resolve: {
        extensions: ['', '.js', '.html', '.js', '.scss'],
        modulesDirectories: ['web_modules', 'node_modules', '../app']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin("bootstrap.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebPackAngularTranslate.Plugin()
    ],
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'baggage?[file].html' }
        ],
        loaders: [
            { test: /\.js?$/, loaders: ['babel-loader?experimental' ], exclude: /node_modules/ },
            { test: /\.html$/, loader: "ngtemplate?relativeTo="+path.join(__dirname, "../app")+"/!html" },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file'},
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss')},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.json$/, exclude: /node_modules/, loaders: ['json-loader'] }
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