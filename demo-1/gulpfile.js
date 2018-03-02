const gulp = require('gulp');
const postcss = require('gulp-postcss');

const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');

gulp.task('css', function () {
	let plugins = [
		// autoprefixer({browsers: ['last 6 version']}),
		cssnext
	];

	return gulp.src('./src/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dest'));
});