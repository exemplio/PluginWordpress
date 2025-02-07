<?php
class My_Custom_Gateway extends WC_Payment_Gateway {
  
  private $order_status;
  private $text_box_required;


  public function __construct(){
    $this->id = 'gateway_paguetodo';
    $this->method_title = __('Paguetodo Gateway', 'gateway_paguetodo');
    $this->method_description = __('Realizar pagos personalizados', 'gateway_paguetodo');
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
          'title' 		=> __( 'Enable/Disable', 'gateway_paguetodo' ),
          'type' 			=> 'checkbox',
          'label' 		=> __( 'Enable Paguetodo Gateway', 'gateway_paguetodo' ),
          'default' 		=> 'yes'
          ),

                'title' => array(
            'title' 		=> __( 'Method Title', 'gateway_paguetodo' ),
            'type' 			=> 'text',
            'description' 	=> __( 'This controls the title', 'gateway_paguetodo' ),
            'default'		=> __( 'Paguetodo Gateway', 'gateway_paguetodo' ),
            'desc_tip'		=> true,
          ),
          'description' => array(
            'title' => __( 'Customer Message', 'gateway_paguetodo' ),
            'type' => 'textarea',
            'css' => 'width:500px;',
            'default' => 'None of the other payment options are suitable for you? please drop us a note about your favourable payment option and we will contact you as soon as possible.',
            'description' 	=> __( 'The message which you want it to appear to the customer in the checkout page.', 'gateway_paguetodo' ),
          ),
          'text_box_required' => array(
            'title' 		=> __( 'Make the text field required', 'gateway_paguetodo' ),
            'type' 			=> 'checkbox',
            'label' 		=> __( 'Make the text field required', 'gateway_paguetodo' ),
            'default' 		=> 'no'
          ),

          'order_status' => array(
            'title' => __( 'Order Status After The Checkout', 'gateway_paguetodo' ),
            'type' => 'select',
            'options' => wc_get_order_statuses(),
            'default' => 'wc-completed',
            'description' 	=> __( 'The default order status if this gateway used in payment.', 'gateway_paguetodo' ),
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
    <h3><?php _e( 'Paguetodo Gateway Settings', 'gateway_paguetodo' ); ?></h3>
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
		global $woocommerce;
		$order = new WC_Order( $order_id );
		$order->update_status('pending', __( 'Awaiting payment', 'gateway_paguetodo' ));
    set_transient( 'order_id', $order_id , MINUTE_IN_SECONDS*1 );
		return array(
			'result' => 'success',
			'redirect' => $this->get_return_url( $order )
		);
  }

  public function payment_fields(){
      ?>
          <div id="root"></div>
    <?php
  }
}
?>