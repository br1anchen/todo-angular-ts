var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var bower_dir = __dirname + '/bower_components';
var npm_dir = __dirname + '/node_modules';

var webpack_config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },

  entry: {
    app: ['./script/Application.ts'],
    vendors: ['angular','todomvc-common']
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: {}
  },

  output: {
     path: __dirname + '/dist',
     filename: 'bundle.js',
     publicPath: "/dist/"
   },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],

  // Add loader for .ts files.
  module: {
    noParse: [],

    loaders: [
      {
        test: /\.ts$/,
        loader: 'typescript-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  }
};

webpack_config.addVendor('todomvc-common', npm_dir + '/todomvc-common/base.js');
webpack_config.addVendor('angular', npm_dir + '/angular/angular.js');

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpack_config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
           path: './dist',
           filename: 'bundle.js'
         }));
        callback();
    });
});

gulp.task("copyIndex", function() {
   return gulp.src('index.html')
   .pipe(gulp.dest('dist/'));
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server

    var devConfig = Object.create(webpack_config);
    devConfig.devtool = "eval";
    devConfig.debug = true;
    var compiler = webpack(devConfig);

    new WebpackDevServer(compiler, {
  		publicPath: "/" + devConfig.output.publicPath,
  		stats: {
  			colors: true
  		}
    }).listen(35729, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:35729/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

var tsProject = ts.createProject({
    target: 'ES5',
    module: 'amd',
    declarationFiles: false
});

gulp.task('ts', function() {
    var tsResult = gulp.src(['script/**/*.ts'])
                       .pipe(sourcemaps.init()) // This means sourcemaps will be generated
                       .pipe(ts(tsProject));

    return tsResult.js
                .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
                .pipe(gulp.dest('script'));
});

gulp.task('build', ['ts','webpack','copyIndex'], function(){

});

gulp.task('watch', ['build','webpack-dev-server'], function(){
  gulp.watch([
    "script/**/*",
    "index.html"
    ], ["build"]);
});
