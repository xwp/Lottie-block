/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
 export default function Save( props ) {
	const { attributes } = props;
	const { json, autoplay, controls, loop, maxHeight } = attributes;
	const lottieAttributes = {};
	if ( autoplay ) {
		lottieAttributes.autoplay = true;
	}
	if ( controls ) {
		lottieAttributes.controls = true;
	}
	if ( loop ) {
		lottieAttributes.loop = true;
	}

	lottieAttributes.style = { height: `${ maxHeight }px` };

	const blockProps = useBlockProps.save( );

	return (
		<div { ...blockProps }>
			<lottie-player
				background="transparent"
				src={ json }
				{ ...lottieAttributes }
				speed="1"
			></lottie-player>
		</div>
	);
}

