var webpack = require('webpack');
var pkg = require('../package.json');
var util = require('util');
var path = require('path');
var jquery = require('jquery');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bowerRoot = path.join(__dirname, "../bower_components");
var BowerWebpackPlugin = require("bower-webpack-plugin");

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
        alias: {
            angular: path.join(bowerRoot, '/angular'),
            uirouter: path.join(bowerRoot, '/angular-ui-router/release/angular-ui-router'),
            angular_bootstrap: path.join(bowerRoot, '/angular-bootstrap/ui-bootstrap'),
            angular_devise: path.join(bowerRoot, '/angular-devise/lib/devise'),
            angular_translate: path.join(bowerRoot, '/angular-translate/angular-translate'),
            angular_upload: path.join(bowerRoot, '/angular-upload'),
            jquery: path.join(bowerRoot, '/jquery/dist/jquery'),
            bootstrap: path.join(bowerRoot, '/bootstrap/dist/js/bootstrap'),
            font_awesome: path.join(bowerRoot, '/font-awesome'),
            ng_file_upload: path.join(bowerRoot, '/ng-file-upload/ng-file-upload-all'),
            ng_file_upload_shim: path.join(bowerRoot, '/ng-file-upload-shim'),
            rangy: path.join(bowerRoot, '/rangy/rangy-core')
        },
        root: bowerRoot,
        extensions: ['', '.js', '.html', '.js', '.scss'],
        modulesDirectories: ['web_modules', 'node_modules', '../app']
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: [bowerRoot],
            manifestFiles:      path.join(__dirname, "bower.json"),
            includes:           /.*/
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(path.join(__dirname, "../bower.json"), ["main"])
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'baggage?[file].html' }
        ],
        loaders: [
            { test: /\.js?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ },
            { test: /\.html$/, loader: "ngtemplate?relativeTo="+path.join(__dirname, "../app")+"/!html", exclude: [bowerRoot] },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file'},
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    noParse: [
        bowerRoot
    ],
    devServer:{
        contentBase: path.resolve(pkg.config.buildDir),
        hot: true,
        noInfo: true,
        inline: true,
        stats: { colors: true },
        historyApiFallback: true
    }
}