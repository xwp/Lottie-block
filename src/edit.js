/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';


import { useSelect, useDispatch } from '@wordpress/data';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';


import { G, Path, SVG, Rect } from '@wordpress/components';

/**
 * Inspector Controls appear in the post settings sidebar when a block is being edited.
 * The controls appear in both HTML and visual editing modes, and thus should contain settings that affect the entire block.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Components used for adjusting Lottie settings
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/range-control/
 */
import { TextControl, PanelBody, ToggleControl, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

//Extensive check to make sure object is not of string type and not null.
const isJson = ( item ) => {
	item = typeof item !== "string"
		? JSON.stringify(item)
		: item;

	try {
		item = JSON.parse(item);
	} catch (e) {
		return false;
	}

	if (typeof item === "object" && item !== null) {
		return true;
	}

	return false;
}

 export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { json, autoplay, controls, loop, maxHeight } = attributes;

	const blockProps = useBlockProps( {
		className: 'lottie-wrapper',
	} );

	// Adds the ability to create notices when JSON is added
	const { createErrorNotice, createSuccessNotice } = useDispatch(
		'core/notices'
	);

	// Adds Lottie JSON animation, and plays it immediately in the editor view.
	const onJsonAddedHandler = ( value ) => {
		// Save src attribute value if the animation if the field contains valid json or is empty.
		if(isJson(value) || value=='')
		{
			if(value=='')
			{
				createSuccessNotice(__("Animation is removed successfully","lottie-block"));
			}
			if(isJson(value))
			{
				createSuccessNotice(__("Animation is added successfully","lottie-block"));
				const block = document.querySelector( '#block-' + clientId );
				const player = block.querySelector( 'lottie-player' );
				player.load( value );
			}
			setAttributes({ json: value } );
		}
		else
		{
			createErrorNotice(__("JSON is not valid, please check if all JSON code is copied","lottie-block"))
		}
	};

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
	if ( json ) {
		lottieAttributes.src = json;
	}
	lottieAttributes.style = {
		height: `${ maxHeight }px`,
		display: json.length === 0 ? 'none' : 'block'
	};

	return (
		<div { ...blockProps }>
			{ /* Shows Lottie logo if JSON animation is not added. */ }
			<SVG
				style={ { display: json.length === 0 ? 'block' : 'none' } }
				width="250px"
				height="50px"
				viewBox="0 0 600 125"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<G
					id="lf_Logo"
					stroke="none"
					strokeWidth="1"
					fill="none"
					fillRule="evenodd"
				>
					<G id="Logo">
						<G id="text">
							<Path
								d="M0.254040816,94.2412834 L0.254040816,3.82059257 L18.4179592,3.82059257 L18.4179592,78.3221477 L58.3023673,78.3221477 L58.3023673,94.2412834 L0.254040816,94.2412834 Z M98.6948571,95.3874611 C78.8796735,95.3874611 65.669551,81.760681 65.669551,63.1671305 C65.669551,44.57358 78.8796735,31.0741529 98.6948571,31.0741529 C118.001959,31.0741529 131.593143,44.0641676 131.593143,63.1671305 C131.593143,82.1427402 118.001959,95.3874611 98.6948571,95.3874611 Z M98.6948571,80.359797 C107.586286,80.359797 114.699429,73.3553773 114.699429,63.1671305 C114.699429,52.9788836 107.840327,45.9744639 98.6948571,45.9744639 C89.0413061,45.9744639 82.5632653,53.3609429 82.5632653,63.1671305 C82.5632653,72.845965 89.1683265,80.359797 98.6948571,80.359797 Z M160.680816,95.3874611 C150.011102,95.3874611 143.02498,88.6377476 143.02498,74.6289082 L143.02498,45.8471108 L135.657796,45.8471108 L135.657796,31.9656245 L143.02498,31.9656245 L143.02498,11.7164839 L159.664653,9.93354068 L159.664653,31.9656245 L176.431347,31.9656245 L176.431347,45.8471108 L159.664653,45.8471108 L159.664653,72.2091995 C159.664653,77.6853822 161.061878,80.2324439 164.99951,80.2324439 C167.031837,80.2324439 170.080327,79.4683254 172.874776,78.0674415 L177.066449,91.4395155 C173.128816,93.6045179 169.064163,95.3874611 160.680816,95.3874611 Z M207.551347,95.3874611 C196.881633,95.3874611 189.89551,88.6377476 189.89551,74.6289082 L189.89551,45.8471108 L182.528327,45.8471108 L182.528327,31.9656245 L189.89551,31.9656245 L189.89551,11.7164839 L206.535184,9.93354068 L206.535184,31.9656245 L223.301878,31.9656245 L223.301878,45.8471108 L206.535184,45.8471108 L206.535184,72.2091995 C206.535184,77.6853822 207.932408,80.2324439 211.870041,80.2324439 C213.902367,80.2324439 216.950857,79.4683254 219.745306,78.0674415 L223.93698,91.4395155 C219.999347,93.6045179 215.934694,95.3874611 207.551347,95.3874611 Z M244.514286,23.5603208 C238.417306,23.5603208 233.971592,18.9756098 233.971592,13.2447209 C233.971592,7.64118514 238.417306,3.05647405 244.514286,3.05647405 C250.484245,3.05647405 255.05698,7.64118514 255.05698,13.2447209 C255.05698,18.9756098 250.484245,23.5603208 244.514286,23.5603208 Z M236.003918,94.2412834 L236.003918,31.9656245 L252.643592,31.9656245 L252.643592,94.2412834 L236.003918,94.2412834 Z M323.902041,62.530365 C323.902041,64.5680144 323.648,67.4971354 323.52098,68.5159601 L279.95298,68.5159601 C281.985306,76.0297921 287.955265,80.4871501 296.338612,80.4871501 C303.324735,80.4871501 308.15151,77.5580291 311.454041,73.4827304 L322.250776,83.5436242 C317.042939,90.2933377 309.040653,95.3874611 295.195429,95.3874611 C276.142367,95.3874611 262.678204,82.5247995 262.678204,63.0397774 C262.678204,44.0641676 275.761306,31.0741529 294.179265,31.0741529 C311.708082,31.0741529 323.902041,44.3188738 323.902041,62.530365 Z M294.052245,45.5924046 C287.320163,45.5924046 281.985306,49.4129972 280.08,56.54477 L307.389388,56.54477 C305.738122,49.9224096 301.292408,45.5924046 294.052245,45.5924046 Z"
								id="lottie"
								fill="#18C8CA"
							></Path>
							<Path
								d="M335.841959,94.2412834 L335.841959,3.82059257 L395.668571,3.82059257 L395.668571,19.7397283 L353.497796,19.7397283 L353.497796,43.9368145 L388.682449,43.9368145 L388.682449,59.9833033 L353.497796,59.9833033 L353.497796,94.2412834 L335.841959,94.2412834 Z M418.024163,23.5603208 C411.927184,23.5603208 407.481469,18.9756098 407.481469,13.2447209 C407.481469,7.64118514 411.927184,3.05647405 418.024163,3.05647405 C423.994122,3.05647405 428.566857,7.64118514 428.566857,13.2447209 C428.566857,18.9756098 423.994122,23.5603208 418.024163,23.5603208 Z M409.513796,94.2412834 L409.513796,31.9656245 L426.153469,31.9656245 L426.153469,94.2412834 L409.513796,94.2412834 Z M439.744653,94.2412834 L439.744653,0.509412342 L456.384327,0.509412342 L456.384327,94.2412834 L439.744653,94.2412834 Z M527.642776,62.530365 C527.642776,64.5680144 527.388735,67.4971354 527.261714,68.5159601 L483.693714,68.5159601 C485.726041,76.0297921 491.696,80.4871501 500.079347,80.4871501 C507.065469,80.4871501 511.892245,77.5580291 515.194776,73.4827304 L525.99151,83.5436242 C520.783673,90.2933377 512.781388,95.3874611 498.936163,95.3874611 C479.883102,95.3874611 466.418939,82.5247995 466.418939,63.0397774 C466.418939,44.0641676 479.502041,31.0741529 497.92,31.0741529 C515.448816,31.0741529 527.642776,44.3188738 527.642776,62.530365 Z M497.79298,45.5924046 C491.060898,45.5924046 485.726041,49.4129972 483.820735,56.54477 L511.130122,56.54477 C509.478857,49.9224096 505.033143,45.5924046 497.79298,45.5924046 Z M560.668082,95.3874611 C550.76049,95.3874611 542.250122,92.0762809 535.518041,86.218039 L543.520327,74.6289082 C548.601143,79.3409723 553.936,81.760681 560.795102,81.760681 C565.621878,81.760681 568.289306,79.7230316 568.289306,76.6665575 C568.289306,73.9921427 565.113796,72.5912588 557.11151,69.916844 C546.822857,66.4783107 537.931429,61.6388934 537.931429,49.5403503 C537.931429,38.3332788 547.58498,31.0741529 560.414041,31.0741529 C568.924408,31.0741529 575.910531,33.3665084 583.023673,38.8426911 L574.894367,51.1959404 C570.194612,46.6112293 564.605714,44.57358 560.03298,44.57358 C557.492571,44.57358 554.190041,45.8471108 554.190041,49.158291 C554.190041,51.7053528 557.238531,53.488296 563.33551,55.7806515 C576.799673,60.7474218 584.674939,63.6765428 584.674939,76.0297921 C584.674939,86.9821575 576.926694,95.3874611 560.668082,95.3874611 Z"
								id="files"
								fill="#006B78"
							></Path>
						</G>
					</G>
				</G>
			</SVG>
			<lottie-player
				background="transparent"
				{ ...lottieAttributes }
				speed="1"
			></lottie-player>
			<InspectorControls>
				<PanelBody title={ __( 'Lottie settings', 'lottie-block' ) }>
					<TextControl
						label={ __( 'JSON animation data', 'lottie-block' ) }
						value={ json }
						onChange={ (value) => onJsonAddedHandler(value) }
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'lottie-block' ) }
						help={ __( 'Animation will start automatically', 'lottie-block' ) }
						checked={ autoplay }
						onChange={ () => {
							setAttributes( { autoplay: ! autoplay } );
						} }
					/>
					<ToggleControl
						label={ __( 'Loop', 'lottie-block' ) }
						help={ __( 'Animation will loop', 'lottie-block' ) }
						checked={ loop }
						onChange={ () => {
							setAttributes( { loop: ! loop } );
						} }
					/>
					<ToggleControl
						label={ __( 'Controls', 'lottie-block' ) }
						help={ __( 'Allow controls', 'lottie-block' ) }
						checked={ controls }
						onChange={ () => {
							setAttributes( { controls: ! controls } );
						} }
					/>
					<RangeControl
						label={ __( 'Maximum animation height in pixels', 'lottie-block' ) }
						initialPosition="300"
						value={ maxHeight }
						min="100"
						max="1000"
						onChange={ ( value ) => {
							setAttributes( { maxHeight: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

