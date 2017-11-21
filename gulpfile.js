var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: '*'
});


gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe($.browserSync.stream());
});


gulp.task('default', ['iconfont', 'sass'], function () {
  $.browserSync.init({
    server: {
      index: "index.html"
    }
  });
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/icons/**/*.svg'], ['iconfont', 'sass']);
});


var fontName = 'customicons';

gulp.task('iconfont', function () {
  return gulp.src(['src/icons/*.svg']).pipe(iconfontProcessing());
});

var iconfontProcessing = $.lazypipe()
  .pipe($.iconfontCss, {
    fontName: fontName,
    path: 'scss',
    targetPath: '../../../src/scss/_icons.scss',
    fontPath: '../fonts/icons/',
    cssClass: 'icn'
  })
  .pipe($.iconfont,{
    fontName: fontName,
    prependUnicode: true, // recommended option
    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'] // default, 'woff2' and 'svg' are available
  })
  .pipe(gulp.dest, 'dist/fonts/icons/');