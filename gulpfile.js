/* eslint-env node */

const gulp = require( 'gulp' );
const del = require( 'del' );
const postcss = require( 'gulp-postcss' );
const rename = require( 'gulp-rename' );
const rtlcss = require( 'gulp-rtlcss' );

const cssConfig = {
	src: 'src',
	dist: 'dist',
};

function cssClean() {
	return del( cssConfig.dist + '/**/*.css' );
}

gulp.task( 'css-clean', cssClean );

function cssBuildSass() {
	return gulp
		.src( cssConfig.src + '/*.scss' )
		.pipe( postcss() ) // Uses the config from postcss.config.js.
		.pipe( rename( { extname: '.css' } ) )
		.pipe( gulp.dest( cssConfig.dist ) )
		.pipe( rtlcss() ) // Uses the config from .rtlcssrc.json.
		.pipe( rename( { suffix: '-rtl' } ) )
		.pipe( gulp.dest( cssConfig.dist ) );
}

gulp.task( 'css-build', gulp.series( cssClean, cssBuildSass ) );

function cssWatch( ) {
	return gulp.watch(
		[ cssConfig.src + '/**/*.scss' ],
		cssBuildSass
	);
}

gulp.task( 'css-watch', cssWatch );
gulp.task( 'build', gulp.series( cssClean, cssBuildSass ) );
