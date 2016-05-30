'use strict';

var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var ttf2woff = require('gulp-ttf2woff');
var fs = require('fs');
var del = require('del');
var baseChar = fs.readFileSync('baseChar.txt', 'utf-8');
var extChar = fs.readFileSync('extChar.txt', 'utf-8');


gulp.task('subset:ttf', function() {
	return gulp.src(['./src/**/*.ttf'], {
			base: 'src'
		})
		.pipe(fontmin({
			text: extChar+baseChar,
			hinting: false
		}))
		.pipe(gulp.dest('subseted'));
});

gulp.task('ttf2woff', ['subset:ttf'], function() {
	return gulp.src(['./subseted/**/*.ttf'], {
			base: 'subseted'
		})
		.pipe(ttf2woff())
		.pipe(gulp.dest('dist'));
});

gulp.task('license', function() {
	return gulp.src(['./src/**/*.txt'], {
			base: 'src'
		})
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', ['ttf2woff','license'], function() {
	del(['subseted']);
});

gulp.task('default', ['clean']);
