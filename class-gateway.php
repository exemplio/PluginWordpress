<?php
class My_Custom_Gateway extends WC_Payment_Gateway {
  
  // Constructor method
  public function __construct() {
    $this->id                 = 'gateway_paguetodo';
    $this->method_title       = __('Pago custom', 'my-custom-gateway');
    $this->method_description = __('Realizar pagos personalizados', 'my-custom-gateway');
    
    // Other initialization code goes here
    
    $this->init_form_fields();
    $this->init_settings();
    
    add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
  }
  

  // Process the payment
  public function process_payment($order_id) {
    $order = wc_get_order($order_id);
    
    // Implement your payment processing logic here
    
    // Mark the order as processed
    $order->payment_complete();
    
    // Redirect to the thank you page
    return array(
      'result'   => 'success',
      'redirect' => $this->get_return_url($order),
    );
  }
  
}
?>