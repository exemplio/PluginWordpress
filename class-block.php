<?php

use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;

final class My_Custom_Gateway_Blocks extends AbstractPaymentMethodType {

    protected $name = 'my_custom_gateway';// your payment gateway name

    public function initialize() {
		$this->settings = get_option( "woocommerce_{$this->name}_settings", array() );
        // $this->gateway = new My_Custom_Gateway();
    }

    public function is_active() {
		return ! empty( $this->settings[ 'enabled' ] ) && 'yes' === $this->settings[ 'enabled' ];
    }

    public function get_payment_method_script_handles() {
      wp_register_script(
          'my_custom_gateway-blocks-integration',
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
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'credicard_payments_script',
        plugin_dir_url(__FILE__) . 'views/payment-methods/credicard-payments.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'inmediate_transfer_script',
        plugin_dir_url(__FILE__) . 'views/payment-methods/inmediate-transfer.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'mobile_payment_script',
        plugin_dir_url(__FILE__) . 'views/payment-methods/mobile-payment.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'modals_script',
        plugin_dir_url(__FILE__) . 'views/modals.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'bootstrap_script',
        plugin_dir_url(__FILE__) . 'js/bootstrap.min.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'jquery_script',
        plugin_dir_url(__FILE__) . 'js/jquery.min.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'indexjs_script',
        plugin_dir_url(__FILE__) . 'js/index.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'callservices_script',
        plugin_dir_url(__FILE__) . 'js/callservices.js',
        [
            'my_custom_gateway-blocks-integration',
        ],
        null,
        true
      );
      wp_register_script(
        'utils_script',
        plugin_dir_url(__FILE__) . 'js/utils.js',
        [
            'my_custom_gateway-blocks-integration',
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
      wp_localize_script('my_custom_gateway-blocks-integration', 'myPluginImage', [
        'eye_solid' => $eye_solid,
        'eye_slash' => $eye_slash,
      ]);
      wp_enqueue_script('my_custom_gateway-blocks-integration');
      wp_enqueue_script('credicard_payments_script');
      wp_enqueue_script('inmediate_transfer_script');
      wp_enqueue_script('mobile_payment_script');
      wp_enqueue_script('c2p_script');
      wp_enqueue_script('modals_script');
      wp_enqueue_script('bootstrap_script');
      wp_enqueue_script('jquery_script');
      wp_enqueue_script('indexjs_script');
      wp_enqueue_script('callservices_script');
      wp_enqueue_script('utils_script');
      wp_enqueue_style('bootstrap_css');
      wp_enqueue_style('styles_css');
  
      return [ 'my_custom_gateway-blocks-integration' ];
  }
}
?>