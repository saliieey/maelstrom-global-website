<?php
/**
 * Plugin Name: Maelstrom Works Custom Post Type
 * Description: Custom post type for managing works/portfolio items for Maelstrom Global website
 * Version: 1.0.0
 * Author: Maelstrom Global
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Register Works Custom Post Type
 */
function maelstrom_register_works_post_type() {
    $labels = array(
        'name'                  => _x('Works', 'Post Type General Name', 'maelstrom'),
        'singular_name'         => _x('Work', 'Post Type Singular Name', 'maelstrom'),
        'menu_name'             => __('Works', 'maelstrom'),
        'name_admin_bar'        => __('Work', 'maelstrom'),
        'archives'              => __('Work Archives', 'maelstrom'),
        'attributes'            => __('Work Attributes', 'maelstrom'),
        'parent_item_colon'     => __('Parent Work:', 'maelstrom'),
        'all_items'             => __('All Works', 'maelstrom'),
        'add_new_item'          => __('Add New Work', 'maelstrom'),
        'add_new'               => __('Add New', 'maelstrom'),
        'new_item'              => __('New Work', 'maelstrom'),
        'edit_item'             => __('Edit Work', 'maelstrom'),
        'update_item'           => __('Update Work', 'maelstrom'),
        'view_item'             => __('View Work', 'maelstrom'),
        'view_items'            => __('View Works', 'maelstrom'),
        'search_items'          => __('Search Work', 'maelstrom'),
        'not_found'             => __('Not found', 'maelstrom'),
        'not_found_in_trash'    => __('Not found in Trash', 'maelstrom'),
        'featured_image'        => __('Featured Image', 'maelstrom'),
        'set_featured_image'    => __('Set featured image', 'maelstrom'),
        'remove_featured_image' => __('Remove featured image', 'maelstrom'),
        'use_featured_image'    => __('Use as featured image', 'maelstrom'),
        'insert_into_item'      => __('Insert into work', 'maelstrom'),
        'uploaded_to_this_item' => __('Uploaded to this work', 'maelstrom'),
        'items_list'            => __('Works list', 'maelstrom'),
        'items_list_navigation' => __('Works list navigation', 'maelstrom'),
        'filter_items_list'     => __('Filter works list', 'maelstrom'),
    );

    $args = array(
        'label'                 => __('Work', 'maelstrom'),
        'description'           => __('Portfolio works and projects', 'maelstrom'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies'            => array('work_category'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-portfolio',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true, // Enable REST API
        'rest_base'             => 'works',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
    );

    register_post_type('works', $args);
}
add_action('init', 'maelstrom_register_works_post_type', 0);

/**
 * Register Work Category Taxonomy
 */
function maelstrom_register_work_category_taxonomy() {
    $labels = array(
        'name'              => _x('Work Categories', 'taxonomy general name', 'maelstrom'),
        'singular_name'     => _x('Work Category', 'taxonomy singular name', 'maelstrom'),
        'search_items'      => __('Search Categories', 'maelstrom'),
        'all_items'         => __('All Categories', 'maelstrom'),
        'parent_item'       => __('Parent Category', 'maelstrom'),
        'parent_item_colon' => __('Parent Category:', 'maelstrom'),
        'edit_item'         => __('Edit Category', 'maelstrom'),
        'update_item'       => __('Update Category', 'maelstrom'),
        'add_new_item'      => __('Add New Category', 'maelstrom'),
        'new_item_name'     => __('New Category Name', 'maelstrom'),
        'menu_name'         => __('Categories', 'maelstrom'),
    );

    $args = array(
        'hierarchical'      => false,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'work-category'),
        'show_in_rest'      => true, // Enable REST API
    );

    register_taxonomy('work_category', array('works'), $args);

    // Register default categories
    $default_categories = array(
        'Social Media',
        'Performance Marketing',
        'SEO',
        'Influencer Marketing',
        'Web Development & UI/UX',
        'Production',
        'Branding & Creative',
    );

    foreach ($default_categories as $category) {
        if (!term_exists($category, 'work_category')) {
            wp_insert_term($category, 'work_category');
        }
    }
}
add_action('init', 'maelstrom_register_work_category_taxonomy', 0);

/**
 * Add custom meta fields to Works post type
 */
function maelstrom_add_works_meta_boxes() {
    add_meta_box(
        'maelstrom_work_details',
        __('Work Details', 'maelstrom'),
        'maelstrom_work_details_callback',
        'works',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'maelstrom_add_works_meta_boxes');

/**
 * Work Details Meta Box Callback
 */
function maelstrom_work_details_callback($post) {
    wp_nonce_field('maelstrom_work_details', 'maelstrom_work_details_nonce');

    $image1 = get_post_meta($post->ID, '_work_image1', true);
    $image1_alt = get_post_meta($post->ID, '_work_image1_alt', true);
    $image2 = get_post_meta($post->ID, '_work_image2', true);
    $image2_alt = get_post_meta($post->ID, '_work_image2_alt', true);
    $featured = get_post_meta($post->ID, '_work_featured', true);
    $order = get_post_meta($post->ID, '_work_order', true);
    $description = get_post_meta($post->ID, '_work_description', true);

    ?>
    <table class="form-table">
        <tr>
            <th><label for="work_description"><?php _e('Description/Tagline', 'maelstrom'); ?></label></th>
            <td>
                <input type="text" id="work_description" name="work_description" value="<?php echo esc_attr($description); ?>" class="regular-text" />
                <p class="description"><?php _e('Short description or tagline displayed below the title', 'maelstrom'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="work_image1"><?php _e('Image 1 URL', 'maelstrom'); ?></label></th>
            <td>
                <input type="url" id="work_image1" name="work_image1" value="<?php echo esc_url($image1); ?>" class="regular-text" />
                <button type="button" class="button" onclick="maelstrom_media_upload('work_image1')"><?php _e('Select Image', 'maelstrom'); ?></button>
                <p class="description"><?php _e('Primary image for the work (recommended: 534x300px)', 'maelstrom'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="work_image1_alt"><?php _e('Image 1 Alt Text', 'maelstrom'); ?></label></th>
            <td>
                <input type="text" id="work_image1_alt" name="work_image1_alt" value="<?php echo esc_attr($image1_alt); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="work_image2"><?php _e('Image 2 URL', 'maelstrom'); ?></label></th>
            <td>
                <input type="url" id="work_image2" name="work_image2" value="<?php echo esc_url($image2); ?>" class="regular-text" />
                <button type="button" class="button" onclick="maelstrom_media_upload('work_image2')"><?php _e('Select Image', 'maelstrom'); ?></button>
                <p class="description"><?php _e('Secondary image for the work', 'maelstrom'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="work_image2_alt"><?php _e('Image 2 Alt Text', 'maelstrom'); ?></label></th>
            <td>
                <input type="text" id="work_image2_alt" name="work_image2_alt" value="<?php echo esc_attr($image2_alt); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="work_featured"><?php _e('Featured', 'maelstrom'); ?></label></th>
            <td>
                <input type="checkbox" id="work_featured" name="work_featured" value="1" <?php checked($featured, 1); ?> />
                <label for="work_featured"><?php _e('Show on home page', 'maelstrom'); ?></label>
            </td>
        </tr>
        <tr>
            <th><label for="work_order"><?php _e('Order', 'maelstrom'); ?></label></th>
            <td>
                <input type="number" id="work_order" name="work_order" value="<?php echo esc_attr($order ? $order : 0); ?>" min="0" class="small-text" />
                <p class="description"><?php _e('Display order (lower numbers appear first)', 'maelstrom'); ?></p>
            </td>
        </tr>
    </table>

    <script>
    function maelstrom_media_upload(field_id) {
        var mediaUploader = wp.media({
            title: 'Select Image',
            button: {
                text: 'Use this image'
            },
            multiple: false
        });

        mediaUploader.on('select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            document.getElementById(field_id).value = attachment.url;
        });

        mediaUploader.open();
    }
    </script>
    <?php
}

/**
 * Save Work Meta Fields
 */
function maelstrom_save_work_meta($post_id) {
    // Check nonce
    if (!isset($_POST['maelstrom_work_details_nonce']) || !wp_verify_nonce($_POST['maelstrom_work_details_nonce'], 'maelstrom_work_details')) {
        return;
    }

    // Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save meta fields
    if (isset($_POST['work_description'])) {
        update_post_meta($post_id, '_work_description', sanitize_text_field($_POST['work_description']));
    }

    if (isset($_POST['work_image1'])) {
        update_post_meta($post_id, '_work_image1', esc_url_raw($_POST['work_image1']));
    }

    if (isset($_POST['work_image1_alt'])) {
        update_post_meta($post_id, '_work_image1_alt', sanitize_text_field($_POST['work_image1_alt']));
    }

    if (isset($_POST['work_image2'])) {
        update_post_meta($post_id, '_work_image2', esc_url_raw($_POST['work_image2']));
    }

    if (isset($_POST['work_image2_alt'])) {
        update_post_meta($post_id, '_work_image2_alt', sanitize_text_field($_POST['work_image2_alt']));
    }

    if (isset($_POST['work_featured'])) {
        update_post_meta($post_id, '_work_featured', 1);
    } else {
        update_post_meta($post_id, '_work_featured', 0);
    }

    if (isset($_POST['work_order'])) {
        update_post_meta($post_id, '_work_order', intval($_POST['work_order']));
    }
}
add_action('save_post', 'maelstrom_save_work_meta');

/**
 * Add custom fields to REST API response
 */
function maelstrom_add_works_rest_fields() {
    register_rest_field('works', 'work_details', array(
        'get_callback' => function($post) {
            return array(
                'description' => get_post_meta($post['id'], '_work_description', true),
                'image1' => get_post_meta($post['id'], '_work_image1', true),
                'image1_alt' => get_post_meta($post['id'], '_work_image1_alt', true),
                'image2' => get_post_meta($post['id'], '_work_image2', true),
                'image2_alt' => get_post_meta($post['id'], '_work_image2_alt', true),
                'featured' => (bool) get_post_meta($post['id'], '_work_featured', true),
                'order' => (int) get_post_meta($post['id'], '_work_order', true),
            );
        },
        'schema' => array(
            'description' => 'Work custom fields',
            'type' => 'object',
            'context' => array('view', 'edit'),
        ),
    ));

    // Add category names to REST API
    register_rest_field('works', 'work_category_names', array(
        'get_callback' => function($post) {
            $terms = wp_get_post_terms($post['id'], 'work_category', array('fields' => 'names'));
            return !empty($terms) ? $terms[0] : '';
        },
        'schema' => array(
            'description' => 'Work category name',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));
}
add_action('rest_api_init', 'maelstrom_add_works_rest_fields');


