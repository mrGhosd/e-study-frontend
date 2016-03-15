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

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../app'),
    filename: 'bundle.js'
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoErrorsPlugin(),
      new WebPackAngularTranslate.Plugin(),
      new webpack.EnvironmentPlugin("NODE_ENV"),
      // new ngAnnotatePlugin({add: true})
  ],
  module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['babel-loader' ],
          exclude: /node_modules/
        },
        { test: /\.html$/, loader: "raw"},
        { test: /\.(png|jpg|jpeg|gif|mp3)$/, loader: 'file'},
        { test: /\.scss$/, loaders: ["style", "css", "sass"] },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss')},
        {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/, /FontAwesome\.otf/],
            loader: 'file?name=fonts/[name].[ext]'
        },
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
