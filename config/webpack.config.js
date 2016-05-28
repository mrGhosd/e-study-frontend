var webpack = require('webpack');
var pkg = require('../package.json');
var util = require('util');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebPackAngularTranslate = require("webpack-angular-translate");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var DEV = process.env.NODE_ENV === 'development';
var jsBundle = path.join('js', util.format('bundle.js'));

var entry = [
    path.resolve(__dirname, '../app/app.js')
];

if (DEV) {
  entry.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort
    )
  );
  entry.push('webpack/hot/dev-server');
}

var plugins = [
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
  }),
  new ExtractTextPlugin("bootstrap.css"),
  new webpack.HotModuleReplacementPlugin(),
  new WebPackAngularTranslate.Plugin(),
  new webpack.EnvironmentPlugin("NODE_ENV")
];

if (!DEV) {
  plugins.push(new ngAnnotatePlugin({add: true}));
}

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../app'),
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['babel-loader' ],
          exclude: /node_modules/
        },
        { test: /\.html$/, loader: "raw"},
        { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3)$/, loader: 'file'},
        { test: /\.scss$/, loaders: ["style", "css", "sass"] },
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss')},
        { test: /\.(otf|eot|png|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=1000000000', exclude: /app\/images/ },
        // { test: /.svg$/, loader: 'svg-url', exclude: /node_modules/ },
        { test: /\.json$/, exclude: /node_modules/, loaders: ['json-loader'] }
      ]
  },
  resolve: {
    extensions: ['', '.js', '.html', '.scss'],
    modulesDirectories: ['web_modules', 'node_modules', '../app']
  },
  devServer:{
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    quiet: true,
    inline: true,
    stats: { colors: true },
    historyApiFallback: true
  }
};
