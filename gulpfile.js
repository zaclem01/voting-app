var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');

gulp.task('browserify', function() {
	return browserify({ entries: 'app/index.js', debug: true })
		.transform(babelify, { 
			presets: ['es2015', 'react'],
			plugins: ['transform-object-rest-spread']
		})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('browserify-watch', function() {
	var bundler = watchify(browserify({ entries: 'app/index.js', debug: true }, watchify.args));
	bundler.transform(babelify, { 
		presets: ['es2015', 'react'],
		plugins: ['transform-object-rest-spread']
	});
	bundler.on('update', rebundle)

	function rebundle() {
		var start = Date.now();
		bundler.bundle()
			.on('error', function(err) {
				gutil.log(gutil.color.red(err.toString()));
			})
			.on('end', function() {
				gutil.log(gutil.color.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
			})
			.pipe(source('bundle.js'))
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('public/js'));

		return bundler;
	}

	rebundle();
});

gulp.task('sass', function() {
	return gulp.src('app/stylesheets/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'browserify-watch', 'watch']);