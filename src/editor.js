/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import { G, Path, SVG, Rect } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

const LottieIcon = {
	src: (
		<SVG xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="245px" height="245px" viewBox="0 0 245 245" version="1.1">
			<G id="lf_Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<G id="Logo" transform="translate(39.607873, 43.766155)">
					<Rect id="Rectangle" fill="#2BEAED" fillRule="nonzero" x="0" y="0" width="156.235102" height="156.644295" rx="12.6881879" />
					<Path d="M119.051594,30.8255039 C123.336947,31.4603785 126.294995,35.4543174 125.662603,39.744408 C125.030002,44.0359205 121.043533,47.0033043 116.756754,46.3682183 C109.165831,45.2436237 97.7937371,57.0646985 85.0619695,81.3710892 C68.8082808,112.401227 53.679639,127.185853 37.7520893,126.00602 C33.4315183,125.685974 30.1904166,121.918243 30.5091961,117.5931 C30.8280292,113.267228 34.5875305,110.01692 38.9088326,110.33702 C46.7741162,110.91964 58.3269568,98.5949648 71.1726655,74.0710477 C87.5303275,42.8424127 102.86428,28.4273547 119.051594,30.8255039 Z" id="path" fill="#FFFFFF" fillRule="nonzero" />
				</G>
			</G>
		</SVG>
	),
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'xwp/lottie-blocks', {

	icon: LottieIcon,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
