<?php
class My_Custom_Gateway extends WC_Payment_Gateway {
  
  private $order_status;
  private $text_box_required;


  public function __construct(){
    $this->id = 'gateway_paguetodo';
    $this->method_title = __('Paguetodo Gateway', 'my-custom-gateway');
    $this->method_description = __('Realizar pagos personalizados', 'my-custom-gateway');
    // $this->has_fields = true;
    $this->init_form_fields();
    // $this->init_settings();
    $this->enabled = $this->get_option('enabled');
    $this->title = $this->get_option('title');
    $this->description = $this->get_option('description');
    // $this->text_box_required = $this->get_option('text_box_required');
    // $this->order_status = $this->get_option('order_status');


    add_action('woocommerce_update_options_payment_gateways_'.$this->id, array($this, 'process_admin_options'));
  }

  public function init_form_fields(){
        $this->form_fields = array(
          'enabled' => array(
          'title' 		=> __( 'Enable/Disable', 'woocommerce-other-payment-gateway' ),
          'type' 			=> 'checkbox',
          'label' 		=> __( 'Enable Paguetodo Gateway', 'woocommerce-other-payment-gateway' ),
          'default' 		=> 'yes'
          ),

                'title' => array(
            'title' 		=> __( 'Method Title', 'woocommerce-other-payment-gateway' ),
            'type' 			=> 'text',
            'description' 	=> __( 'This controls the title', 'woocommerce-other-payment-gateway' ),
            'default'		=> __( 'Paguetodo Gateway', 'woocommerce-other-payment-gateway' ),
            'desc_tip'		=> true,
          ),
          'description' => array(
            'title' => __( 'Customer Message', 'woocommerce-other-payment-gateway' ),
            'type' => 'textarea',
            'css' => 'width:500px;',
            'default' => 'None of the other payment options are suitable for you? please drop us a note about your favourable payment option and we will contact you as soon as possible.',
            'description' 	=> __( 'The message which you want it to appear to the customer in the checkout page.', 'woocommerce-other-payment-gateway' ),
          ),
          'text_box_required' => array(
            'title' 		=> __( 'Make the text field required', 'woocommerce-other-payment-gateway' ),
            'type' 			=> 'checkbox',
            'label' 		=> __( 'Make the text field required', 'woocommerce-other-payment-gateway' ),
            'default' 		=> 'no'
          ),

          'order_status' => array(
            'title' => __( 'Order Status After The Checkout', 'woocommerce-other-payment-gateway' ),
            'type' => 'select',
            'options' => wc_get_order_statuses(),
            'default' => 'wc-completed',
            'description' 	=> __( 'The default order status if this gateway used in payment.', 'woocommerce-other-payment-gateway' ),
          ),
      );
  }
  /**
   * Admin Panel Options
   * - Options for bits like 'title' and availability on a country-by-country basis
   *
   * @since 1.0.0
   * @return void
   */
  public function admin_options() {
    ?>
    <h3><?php _e( 'Paguetodo Gateway Settings', 'woocommerce-other-payment-gateway' ); ?></h3>
        <!-- <table>
          <tr>
            <td>Client Id: </td>
            <td>
              <input type="text" name="section">
            </td>
          </tr>
          <tr>
            <td>Client Secret: </td>
            <td>
              <input type="text" name="section">
            </td>
          </tr>
        </table> -->
    <?php
  }

  public function process_payment( $order_id ) {
    $order = wc_get_order($order_id);

    if (!$order) {
        return array(
            'result' => 'failure',
            'message' => 'Order not found.'
        );
    }
    $status = 'pending';
    $order->update_status($status, 'Esperando el pa...');

    // Return success
    return array(
        'result' => 'success',
        'redirect' => $this->get_return_url($order)
    );
  }

  public function payment_fields(){
      ?>
          <div id="root"></div>
    <?php
  }
}
?>