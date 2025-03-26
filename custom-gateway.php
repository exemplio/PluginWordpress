<?php
/*
Plugin Name: Servicios Paguetodo
Description: Botón de pago.
Version: 1.0.0
Author: Paguetodo
*/

// Your plugin code goes here

add_action('wp_enqueue_scripts', 'get_payment_method_script_handles', 0);
function get_payment_method_script_handles() {
    wp_register_script(
        'gateway_paguetodo-blocks-integration',
        plugin_dir_url(__FILE__) . 'views/checkout.js',
        [
            'wc-blocks-registry',
            'wc-settings',
            'wp-element',
            'wp-html-entities',
            'wp-i18n',
        ],
        null,
        true
    );
    wp_register_script(
      'c2p_script',
      plugin_dir_url(__FILE__) . 'views/payment-methods/c2p.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'loading_script',
      plugin_dir_url(__FILE__) . 'views/loading.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'credicard_payments_script',
      plugin_dir_url(__FILE__) . 'views/payment-methods/credicard-payments.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'mercantil_payments_script',
      plugin_dir_url(__FILE__) . 'views/payment-methods/mercantil-tdd.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'online_transfer_script',
      plugin_dir_url(__FILE__) . 'views/payment-methods/online-transfer.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'mobile_payment_script',
      plugin_dir_url(__FILE__) . 'views/payment-methods/mobile-payment.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'modals_script',
      plugin_dir_url(__FILE__) . 'views/modals.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'bootstrap_script',
      plugin_dir_url(__FILE__) . 'js/bootstrap.min.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'indexjs_script',
      plugin_dir_url(__FILE__) . 'js/index.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'callservices_script',
      plugin_dir_url(__FILE__) . 'js/callservices.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'utils_script',
      plugin_dir_url(__FILE__) . 'js/utils.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'jquery_mask_script',
      plugin_dir_url(__FILE__) . 'js/jquery.mask.min.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'messages_script',
      plugin_dir_url(__FILE__) . 'js/messages.es.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'jsbn_script',
      plugin_dir_url(__FILE__) . 'js/jsbn.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'rsa_script',
      plugin_dir_url(__FILE__) . 'js/rsa.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_script(
      'bank_messages_script',
      plugin_dir_url(__FILE__) . 'js/bank-messages.js',
      [
          'gateway_paguetodo-blocks-integration',
      ],
      null,
      true
    );
    wp_register_style(
        'bootstrap_css',
        plugin_dir_url(__FILE__) . 'css/bootstrap.min.css'
    );
    wp_register_style(
        'styles_css',
        plugin_dir_url(__FILE__) . 'css/styles.css'
    );
    $eye_solid = plugin_dir_url(__FILE__) . 'images/eye-solid.svg';
    $eye_slash = plugin_dir_url(__FILE__) . 'images/eye-slash-solid.svg';
    $loading = plugin_dir_url(__FILE__) . 'images/loading.gif';
    $credicard = plugin_dir_url(__FILE__) . 'images/png/credicard.png';
    $mercantil = plugin_dir_url(__FILE__) . 'images/png/mercantil.png';
    $visa = plugin_dir_url(__FILE__) . 'images/png/visa.png';
    $master_card = plugin_dir_url(__FILE__) . 'images/png/master_card.png';
    $maestro = plugin_dir_url(__FILE__) . 'images/png/maestro.png';
    $venezuela = plugin_dir_url(__FILE__) . 'images/png/venezuela.png';
    $bancaribe = plugin_dir_url(__FILE__) . 'images/png/bancaribe.png';
    $mibanco = plugin_dir_url(__FILE__) . 'images/png/mibanco.png';
    $bancrecer = plugin_dir_url(__FILE__) . 'images/png/bancrecer.png';
    $bancamiga = plugin_dir_url(__FILE__) . 'images/png/bancamiga.png';
    $banfanb = plugin_dir_url(__FILE__) . 'images/png/banfanb.png';
    $tesoro = plugin_dir_url(__FILE__) . 'images/png/tesoro.png';
    $bicentenario = plugin_dir_url(__FILE__) . 'images/png/bicentenario.png';
    $bfc = plugin_dir_url(__FILE__) . 'images/png/bfc.png';
    wp_localize_script('gateway_paguetodo-blocks-integration', 'php_var', [
      'eye_solid' => $eye_solid,
      'eye_slash' => $eye_slash,
      'loading' => $loading,
      'credicard' => $credicard,
      'mercantil' => $mercantil,
      'visa' => $visa,
      'master_card' => $master_card,
      'maestro' => $maestro,
      'venezuela' => $venezuela,
      'bancaribe' => $bancaribe,
      'mibanco' => $mibanco,
      'bancrecer' => $bancrecer,
      'bancamiga' => $bancamiga,
      'banfanb' => $banfanb,
      'tesoro' => $tesoro,
      'bicentenario' => $bicentenario,
      'bfc' => $bfc,
      'nonce' => wp_create_nonce('wc_store_api'),
      'cart_total' => WC()->cart !== null ? WC()->cart->total : 0,
      'empty_cart' => admin_url('admin-ajax.php'),
      'customer_info' => admin_url('admin-ajax.php'),
      // 'url_link' => 'https://apid.paguetodo.com/demo', // demo
      'url_link' => 'https://api.paguetodo.com', // prod
      // 'get_static' => 'http://staticd.paguetodo.com/', // demo
      'get_static' => 'http://static.paguetodo.com/', // prod
    ]);
    wp_enqueue_script('gateway_paguetodo-blocks-integration');
    wp_enqueue_script('credicard_payments_script');
    wp_enqueue_script('mercantil_payments_script');
    wp_enqueue_script('online_transfer_script');
    wp_enqueue_script('mobile_payment_script');
    wp_enqueue_script('c2p_script');
    wp_enqueue_script('loading_script');
    wp_enqueue_script('modals_script');
    wp_enqueue_script('bootstrap_script');
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script('indexjs_script');
    wp_enqueue_script('callservices_script');
    wp_enqueue_script('utils_script');
    wp_enqueue_script('jquery_mask_script');
    wp_enqueue_script('messages_script');
    wp_enqueue_script('jsbn_script');
    wp_enqueue_script('rsa_script');
    wp_enqueue_script('bank_messages_script');
    wp_enqueue_style('bootstrap_css');
    wp_enqueue_style('styles_css');

    return [ 'gateway_paguetodo-blocks-integration' ];
}

add_action('plugins_loaded', 'woocommerce_myplugin', 0);
function woocommerce_myplugin(){
    if (!class_exists('WC_Payment_Gateway'))
        return; // if the WC payment gateway class 

    include(plugin_dir_path(__FILE__) . 'class-gateway.php');
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

add_action('wp_ajax_get_customer_orders', 'get_customer_orders');
add_action('wp_ajax_nopriv_get_customer_orders', 'get_customer_orders');

function get_customer_orders() {
    $data = array(
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
    );
    wp_send_json_success($data);
}

add_action('wp_ajax_set_payment_status_true', 'set_payment_status_true');
add_action('wp_ajax_nopriv_set_payment_status_true', 'set_payment_status_true');

function set_payment_status_true() {
  set_transient( 'payment_status', true , MINUTE_IN_SECONDS*1 );
  wp_send_json_success();
}

add_action('wp_ajax_set_payment_status_false', 'set_payment_status_false');
add_action('wp_ajax_nopriv_set_payment_status_false', 'set_payment_status_false');

function set_payment_status_false() {
  set_transient( 'payment_status', false , MINUTE_IN_SECONDS*1 );
  wp_send_json_success();
}

add_action('wp_ajax_place_order_woo', 'place_order_woo');
add_action('wp_ajax_nopriv_place_order_woo', 'place_order_woo');

function place_order_woo() {
  global $woocommerce;
  $get_order_id = get_transient( 'order_id' );
  $order = new WC_Order( $get_order_id );
  $order->update_status('completed', __('Payment received, order completed.', 'Servicios Paguetodo'));
  wc_reduce_stock_levels( $get_order_id );
  if(isset($_POST[ $get_order_id.'-admin-note']) && trim($_POST[ $get_order_id.'-admin-note'])!=''){
    $order->add_order_note(esc_html($_POST[ $get_order_id.'-admin-note']));
  }
  if (isset($_POST['param_name'])) {
    $param_value = sanitize_text_field($_POST['param_name']);    
    $order->set_payment_method_title($param_value);
    $order->save();
  }
  WC()->cart->empty_cart();
  return array(
    'result' => 'success',
  );
}

?>