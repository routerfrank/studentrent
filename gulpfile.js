var browserify = require('browserify'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    rev = require('gulp-rev'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    bower = require('gulp-bower'),
    watchify = require('watchify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js',
  staticFiles: [
    'app/**/*.*'
  ]
};


gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});


// gulp.task('lint', function() {
//     gulp.src(['index.js','./app/**/*.js','worker.js','app/shared/*.js','gulpfile.js','populate_user_settings.js']).pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });


gulp.task('nodemon', function () {
  nodemon({ script: 'server.js', ext: 'js', ignore: ['app/**','public/'] })
    .on('change')
    .on('restart', function () {
      console.log('>> node restart');
    });
});

gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./app/application.js', watchify.args));

  bundler.transform(stringify(['.html']));
  // bundler.transform(es6ify);

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(gulp.dest('./public/js'));
  }

  return rebundle();
});

gulp.task('browserify', function() {
 var b = browserify();
 b.add('./app/scriptsapplication.js');
 return b.bundle()
   .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
   .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
   .pipe(source('index.js'))
   .pipe(gulp.dest('./public/js'));
});

gulp.task('usemin', function() {
  gulp.src('public/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('static-files', function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});


gulp.task('production', ['nodemon']);
gulp.task('default', ['nodemon','watch', 'build']);
gulp.task('build', ['jade','bower', 'static-files']);
gulp.task('heroku:production', ['build']);