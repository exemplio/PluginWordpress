<?php
/*
Plugin Name: Pago personalizado
Description: Botón de pago.
Version: 1.0.0
Author: Paguetodo
*/

// Your plugin code goes here

add_action('plugins_loaded', 'woocommerce_myplugin', 0);
function woocommerce_myplugin(){
    if (!class_exists('WC_Payment_Gateway'))
        return; // if the WC payment gateway class 

    include(plugin_dir_path(__FILE__) . 'class-gateway.php');
}

add_action('woocommerce_payment_gateways', 'get_amount');
function get_amount(){
    $response = [];
    if (WC()->cart !== null) {
        if ( ! WC()->cart->is_empty() ) {
            $cart_items = WC()->cart->get_cart();    
            foreach ( $cart_items as $cart_item_key => $cart_item ) {
                $product_id = $cart_item['product_id'];
                $quantity = $cart_item['quantity'];    
                $product = wc_get_product( $product_id );
                if ( $product ) {
                    $response[] = [
                        'quantity' => $quantity,
                        'price' => $product->get_price(),
                        'total' => 0,
                    ];
                }
            }
            echo "<script>var cartItems= ". json_encode($response) .";</script>";
            echo "<script>var cartTotal= ". WC()->cart->total .";</script>";
        } else {
            $response = ['message' => 'Your cart is empty.'];
            echo "<script>var cartItems= ". json_encode($response) .";</script>";
        }
    }
}

add_filter('woocommerce_payment_gateways', 'add_my_custom_gateway');

function add_my_custom_gateway($gateways) {
  $gateways[] = 'My_Custom_Gateway';
  return $gateways;
}

/**
 * Custom function to declare compatibility with cart_checkout_blocks feature 
*/
function declare_cart_checkout_blocks_compatibility() {
    // Check if the required class exists
    if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
        // Declare compatibility for 'cart_checkout_blocks'
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks', __FILE__, true);
    }
}
// Hook the custom function to the 'before_woocommerce_init' action
add_action('before_woocommerce_init', 'declare_cart_checkout_blocks_compatibility');

// Hook the custom function to the 'woocommerce_blocks_loaded' action
add_action( 'woocommerce_blocks_loaded', 'oawoo_register_order_approval_payment_method_type' );

/**
 * Custom function to register a payment method type

 */
function oawoo_register_order_approval_payment_method_type() {
    // Check if the required class exists
    if ( ! class_exists( 'Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType' ) ) {
        return;
    }

    // Include the custom Blocks Checkout class
    require_once plugin_dir_path(__FILE__) . 'class-block.php';

    // Hook the registration function to the 'woocommerce_blocks_payment_method_type_registration' action
    add_action(
        'woocommerce_blocks_payment_method_type_registration',
        function( Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry $payment_method_registry ) {
            // Register an instance of My_Custom_Gateway_Blocks
            $payment_method_registry->register( new My_Custom_Gateway_Blocks );
        }
    );
}
?>