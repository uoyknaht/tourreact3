'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
  paths: {
    cssSrc: './client/src/css/',
    cssDist: './client/dist/css/'
  }
};

gulp.task('sass', function () {
  gulp.src(config.paths.cssSrc + '*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(gulp.dest('./css'));
    .pipe(gulp.dest(config.paths.cssDist));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(config.paths.cssSrc + '*.scss', ['sass']);
});
