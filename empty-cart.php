<?php
// add_action('wp_ajax_my_custom_function', 'my_custom_function');
// add_action('wp_ajax_nopriv_my_custom_function', 'my_custom_function');

function my_custom_function() {

    WC()->cart->empty_cart();
}
?>