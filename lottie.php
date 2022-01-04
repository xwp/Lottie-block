<?php
/**
 * Plugin Name:       Lottie
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lottie
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_lottie_block_init() {
	register_block_type( __DIR__ );
	// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	wp_register_script(
		'integration-lottie',
		'https://unpkg.com/@lottiefiles/lottie-player@1.5.4/dist/lottie-player.js',
		array(),
		null,
		true
	);
}
add_action( 'init', 'create_block_lottie_block_init' );



add_action( 'wp', 'action_register_scripts' );
add_action( 'admin_enqueue_scripts', 'action_admin_enqueue_scripts' );

/**
 * Register necessary assets
 */
function action_register_scripts() {
	if ( ! is_singular() ) {
		return;
	}
	add_filter( 'the_content', 'filter_the_content' );
}

/**
 * Adds lottie script if needed
 *
 * @param string $content Content of the post.
 */
function filter_the_content( $content ) {
	if ( false !== strpos( $content, '<lottie-player' ) ) {
		wp_enqueue_script( 'integration-lottie' );
	}

	return $content;
}

/**
 * Registers or enqueues scripts (admin/editor).
 */
function action_admin_enqueue_scripts() {
	// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	wp_enqueue_script( 'integration-lottie' );
}
