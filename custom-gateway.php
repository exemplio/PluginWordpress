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

function re_redirect_woo_checkout( $order_id ){
    $order = wc_get_order( $order_id );
    $url = 'custom thankyou page url here';
    if ( ! $order->has_status( 'failed' ) ) {
        wp_safe_redirect( $url );
        exit;
    }
}

// Process the payment
function process_payment($order_id) {
    $order = wc_get_order($order_id);

    // Implement your payment processing logic here

    // Mark the order as processed
    $order->payment_complete();

    // Redirect to the thank you page
    return array(
        'result'   => 'success',
        'redirect' => get_return_url($order),
    );
}

add_action('wp_ajax_my_custom_function', 'my_custom_function');
add_action('wp_ajax_nopriv_my_custom_function', 'my_custom_function');

function my_custom_function() {
    
    $data = array('message' => 'Hello from PHP!');        
    $redirect_url = home_url('index.php/finalizar-compra/thankyou'); 
    WC()->cart->empty_cart();
    wp_send_json_success(array(
        'redirect_url' => $redirect_url,
        'billing_first_name'  => wc()->customer->get_billing_first_name(),
        'billing_last_name'   => wc()->customer->get_billing_last_name(),
        'billing_company'     => wc()->customer->get_billing_company(),
        'billing_address_1'   => wc()->customer->get_billing_address_1(),
        'billing_address_2'   => wc()->customer->get_billing_address_2(),
        'billing_city'        => wc()->customer->get_billing_city(),
        'billing_state'       => wc()->customer->get_billing_state(),
        'billing_postcode'    => wc()->customer->get_billing_postcode(),
        'billing_country'     => wc()->customer->get_billing_country(),
        'billing_email'       => wc()->customer->get_billing_email(),
        'billing_phone'       => wc()->customer->get_billing_phone(),
        'shipping_first_name' => wc()->customer->get_shipping_first_name(),
        'shipping_last_name'  => wc()->customer->get_shipping_last_name(),
        'shipping_company'    => wc()->customer->get_shipping_company(),
        'shipping_address_1'  => wc()->customer->get_shipping_address_1(),
        'shipping_address_2'  => wc()->customer->get_shipping_address_2(),
        'shipping_city'       => wc()->customer->get_shipping_city(),
        'shipping_state'      => wc()->customer->get_shipping_state(),
        'shipping_postcode'   => wc()->customer->get_shipping_postcode(),
        'shipping_country'    => wc()->customer->get_shipping_country(),
        'shipping_phone'      => wc()->customer->get_shipping_phone(),    
    ));
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
            // echo "<script>const cartItems= ". json_encode($response) .";</script>";
        } else {
            $response = ['message' => 'Your cart is empty.'];
            echo "<script>const cartItems= ". json_encode($response) .";</script>";
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