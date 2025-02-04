<?php

use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;

final class My_Custom_Gateway_Blocks extends AbstractPaymentMethodType {

    protected $name = 'gateway_paguetodo';// your payment gateway name

    public function initialize() {
		  $this->settings = get_option( "woocommerce_{$this->name}_settings", array() );
        // $this->gateway = new My_Custom_Gateway();
    }

    public function is_active() {
		  return ! empty( $this->settings[ 'enabled' ] ) && 'yes' === $this->settings[ 'enabled' ];
    }

}
?>