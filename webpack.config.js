/**
 * External dependencies
 */
const path = require( 'path' );
const WebpackBar = require( 'webpackbar' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const fs = require( 'fs' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Patch the default WP config to prevent removing the "stale" assets.
// https://github.com/WordPress/gutenberg/pull/35986/files.
defaultConfig.plugins[ 0 ] = new CleanWebpackPlugin( {
	// Prevent it from deleting webpack assets during builds that have
	// multiple configurations returned in the webpack config.
	cleanOnceBeforeBuildPatterns: [ '**/*.js', '**/*.php' ],
	cleanStaleWebpackAssets: false,
} );

const configureBabelLoader = ( browserlist ) => {
	return {
		test: /\.js$/,
		use: {
			loader: 'babel-loader',
			options: {
				babelrc: false,
				exclude: [ /core-js/, /regenerator-runtime/ ],
				presets: [
					[
						'@wordpress/babel-preset-default',
						{
							targets: {
								browsers: browserlist,
							},
						},
					],
				],
				plugins: [ '@babel/plugin-syntax-dynamic-import' ],
			},
		},
	};
};

const blocksConfig = {
	dirSrc: '/src',
	dirDist: '/dist',
};

const entries = {};

fs.readdirSync( path.join( __dirname, blocksConfig.dirSrc ) )
	.filter( function( file ) {
		return file.match( /^(script|editor)\.js$/ );
	} )
	.forEach( function( file ) {
		entries[
			file.replace( /^(.+)\.js$/, '$1' )
		] = `${ blocksConfig.dirSrc }/${ file }`;
	} );

const modernConfig = {
	output: {
		path: path.join( __dirname, blocksConfig.dirDist ),
		filename: `[name].js`,
		chunkFilename: `[name].js`,
	},
	module: {
		rules: defaultConfig.module.rules,
	},
	optimization: {
		minimizer: [
			...defaultConfig.optimization.minimizer,
			new OptimizeCSSAssetsPlugin( {} ),
		],
	},
};

modernConfig.module.rules.unshift(
	configureBabelLoader( [
		// The last two versions of each browser, excluding versions
		// that don't support <script type="module">.
		'last 2 Chrome versions',
		'not Chrome < 60',
		'last 2 Safari versions',
		'not Safari < 10.1',
		'last 2 iOS versions',
		'not iOS < 10.3',
		'last 2 Firefox versions',
		'not Firefox < 54',
		'last 2 Edge versions',
		'not Edge < 15',
	] )
);

const modernJs = {
	...defaultConfig,
	...modernConfig,
	entry: entries,
	plugins: [
		...defaultConfig.plugins,
		// Display nice progress bar while building or watching.
		new WebpackBar( {
			name: 'ModernJs',
			color: '#36f271',
		} ),
	],
};

module.exports = [ modernJs ];
