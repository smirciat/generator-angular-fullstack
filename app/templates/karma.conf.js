// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)<% if (filters.jasmine) { %>
    frameworks: ['jasmine'],<% } if (filters.mocha) { %>
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },<% } %>

    // list of files / patterns to load in the browser
    files: [<% if(!filters.webpack) { %>
      // bower:js
      // endbower<% if (filters.socketio) { %>
      'node_modules/socket.io-client/socket.io.js',<% } %><% if(filters.ts) { %>
      '.tmp/app/app.js',
      '.tmp/{app,components}/**/*.module.js',
      '.tmp/{app,components}/**/*.js',
      '.tmp/test/**/*.js',<% } %><% if(filters.babel) { %>
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',<% } %>
      'client/{app,components}/**/*.<%= filters.jade ? '{jade,html}' : 'html' %>'<% } %><% if(filters.webpack) { %>
      'webpack.specs.js'<% } %>
    ],

    preprocessors: {<% if(!filters.webpack) { %>
      '**/*.html': 'ng-html2js',<% if (filters.jade) { %>
      '**/*.jade': 'ng-jade2js',<% } if (filters.babel) { %>
      'client/{app,components}/**/*.js': 'babel'<% } %><% } %><% if(filters.webpack) { %>
      'webpack.specs.js': ['webpack', 'sourcemap']<% } %>
    },<% if(!filters.webpack) { %>

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },<% if (filters.jade) { %>

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },<% } if (filters.babel) { %>

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },<% } %><% } %><% if(filters.webpack) { %>

    //TODO: move all to webpack.make.js
    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      resolve: {
        modulesDirectories: [
          'node_modules'
        ],
        extensions: ['', '.js', '.ts']
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.html$/, loader: 'raw'},
          {test: /\.js$/, loader: 'babel', exclude: /(node_modules)/, include, query: {
            optional: [
              'runtime',
              'es7.classProperties'
            ]
          }},
          {test: /\.js$/, loader: 'ng-annotate?single_quotes'},
          {test: /\.<%= styleExt %>$/, loaders: ['style', 'css', '<%= filters.sass ? 'sass' : filters.less ? 'less' ?  %>']},
          {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
          }
        ],
        postLoaders: [{
          //delays coverage til after tests are run, fixing transpiled source coverage error
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'istanbul-instrumenter'
        }]
      },

      // Sass loader configuration to tell webpack where to find the additional SASS files
      // https://github.com/jtangelder/sass-loader#sass-options
      sassLoader: {
        includePaths: _.union(
          [path.resolve(__dirname, 'node_modules', 'client')],
          require('bourbon').includePaths
        )
      },
      stats: {colors: true, reasons: true},
      debug: false
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      require('karma-chai-plugins'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('karma-html2js-preprocessor'),<% if (filters.jasmine) { %>
      require('karma-jasmine'),<% } %><% if (filters.mocha) { %>
      require('karma-mocha'),<% } %>
      require('karma-phantomjs-launcher'),
      require('karma-script-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
      require('karma-webpack'),
    ],<% } %>

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
