// Karma configuration
// Generated on Tue Nov 17 2015 00:48:20 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/app.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/build/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        'app/home/*.js',
        'app/app.config.js',
        'app/app.js',
        'app/bundle.js',
        'app/util/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*.spec.js': ['webpack'],
      '**/*.html': ['ng-html2js'],
      '**/*.js': ['webpack', 'coverage']
    },

    ngHtml2JsPreprocessor: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      'coverage'
    ],

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      'webpack',
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'ng-html2js'
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    webpack: {
      module: {
        loaders: [
          { test: /\.js?$/, loaders: ['babel-loader?experimental' ], exclude: /node_modules/},
          { test: /\.html$/, loader: "raw"}
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
