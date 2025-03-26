<?php
class My_Custom_Gateway extends WC_Payment_Gateway {
  
  private $order_status;
  private $text_box_required;


  public function __construct(){
    $this->id = 'gateway_paguetodo';
    $this->method_title = __('Servicios Paguetodo', 'gateway_paguetodo');
    $this->method_description = __('Realizar pagos personalizados', 'gateway_paguetodo');
    $this->init_form_fields();
    $this->title = __('Servicios Paguetodo');
    $this->description = __('Servicios Paguetodo');


    add_action('woocommerce_update_options_payment_gateways_'.$this->id, array($this, 'process_admin_options'));
  }

  public function init_form_fields(){
        $this->form_fields = array(
          
      );
  }

  public function process_payment( $order_id ) {
		global $woocommerce;
		$order = new WC_Order( $order_id );
    $payment_status = get_transient( 'payment_status' );
    if (!$payment_status) {
      wc_add_notice(__('Payment cannot be processed.', ''), 'error');
      return array(
          'result' => 'failure',
          'redirect' => wc_get_checkout_url(),
      );
    }
		$order->update_status('pending', __( 'Awaiting payment', 'gateway_paguetodo' ));
    set_transient( 'order_id', $order_id , MINUTE_IN_SECONDS*1 );
		return array(
			'result' => 'success',
			'redirect' => $this->get_return_url( $order )
		);
  }

  public function payment_fields(){
    if ( is_user_logged_in() ) {
      ?>
          <div id="root"></div>
      <?php
    } else {
        echo 'Debe iniciar sesión o registrarse para mostrar el método de pago.';
    }

  }
}
?>