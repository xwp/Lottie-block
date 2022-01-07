/**
 * WordPress dependencies
 */
const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );
module.exports = {
	...baseConfig,
	transform: {
		'\\.m?jsx?$': 'jest-esm-transformer',
	},
};
