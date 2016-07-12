var gulp = require("gulp");

var webpack = require("webpack");

var path = require("path");

var rootDir = "/app/av-common-test/";

var isDev = !(process.env.ENV && process.env.ENV == "product");

var clean = require("gulp-clean");

var tpl = require("gulp-tpl2mod");

var runSequence = require("run-sequence").use(gulp);

var registry = require("@dp/av-registry");

var stylishReporter = require("jshint-loader-stylish")();

var imgPrefix = "[path]";

gulp.task("build", function(callback) {
    function _action() {
        webpack({
            devtool: isDev ? "" : "source-map",
            entry: [ "./js/index.js" ],
            output: {
                path: "./dist",
                filename: "bundle.js"
            },
            plugins: [ !isDev ? new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }) : function() {} ],
            resolve: {
                extensions: [ "", ".js" ]
            },
            jshint: {
                reporter: function(e) {
                    stylishReporter(e);
                    process.exit(-1);
                },
                noarg: true,
                expr: true,
                asi: true
            },
            htmlLoader: {
                ignoreCustomFragments: [ /\{\{.*?}}/ ]
            },
            module: {
                preLoaders: [ {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "jshint"
                } ],
                loaders: [ {
                    test: /\.less$/,
                    loaders: [ "style", "css", "less" ]
                }, {
                    test: /\.css$/,
                    loaders: [ "style", "css" ]
                }, {
                    test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                    loaders: [ "url" ]
                }, {
                    test: /\.jsx$/,
                    loaders: [ "babel", "jsx" ]
                }, {
                    test: /\.js$/,
                    loaders: [ "babel" ]
                }, {
                    test: /\.html$/,
                    loaders: [ "html" ]
                } ]
            },
            externals: {
                zepto: "Zepto"
            }
        }, function(err, stats) {
            if (err) {
                console.log(err);
                process.exit(-1);
            }
            callback();
        });
    }
    function _resourceServerSanitizer(v) {
        if (v.indexOf("[") == 0) {
            return JSON.parse(v);
        }
        return [ v.split(",") ];
    }
    _action();
});

gulp.task("clean", function(cb) {
    gulp.src("./dist").pipe(clean());
});

gulp.task("registry", function(cb) {
    registry(cb);
});

gulp.task("watch", "", function() {
    gulp.start("build");
    gulp.watch([ "./less/**/*.less", "./js/**/*" ], function(event) {
        gulp.start("build");
    });
});

gulp.task("default", [ "build" ]);