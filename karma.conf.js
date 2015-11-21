// Karma configuration
// Generated on Tue Nov 17 2015 00:48:20 GMT+0300 (MSK)
var webpackConfig = require('./config/webpack.config');
webpackConfig.entry = {};
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.js',
      'specs/**/*.js'
    ],

    exclude: [
        'app/home/*.js',
        'app/bundle.js',
        'app/util/*.js'
    ],
    preprocessors: {
      'node_modules/angular': ['webpack'],
      'app/app.js': ['webpack'],
      'specs/**/*.spec.js': ['webpack'],
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {

    },
    reporters: [
      'progress',
      'coverage'
    ],

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-coverage'),
      'ng-html2js'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],

    // webpack: {
    //   devtool: 'inline-source-map',
    //   modulesDirectories: ['web_modules', 'node_modules', '../app'],
    //   module: {
    //     loaders: [
    //       { test: /\.js?$/, loaders: ['babel-loader?experimental' ], exclude: /node_modules/},
    //       { test: /\.html$/, loader: "raw"}
    //     ]
    //   }
    // },
    webpack: require('./config/webpack.config'),
    singleRun: true,
    concurrency: Infinity
  })
}
