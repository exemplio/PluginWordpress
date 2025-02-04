<?php
class My_Custom_Gateway extends WC_Payment_Gateway {
  
  private $order_status;
  private $text_box_required;


  public function __construct(){
    $this->id = 'gateway_paguetodo';
    $this->method_title = __('Pago custom', 'my-custom-gateway');
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
      <div id="poststuff">
        <div id="post-body" class="metabox-holder columns-2">
          <div id="post-body-content">
            <table class="form-table">
              <?php $this->generate_settings_html();?>
            </table><!--/.form-table-->
          </div>
          <div id="postbox-container-1" class="postbox-container">
                          <div id="side-sortables" class="meta-box-sortables ui-sortable">

                  <div class="postbox ">
                                  <h3 class="hndle"><span><i class="dashicons dashicons-update"></i>&nbsp;&nbsp;Upgrade to Pro</span></h3>
                                    <hr>
                                  <div class="inside">
                                      <div class="support-widget">
                                          <ul>
                                              <li>» Full Form Builder</li>
                                              <li>» Create Unlimited Custom Gateways</li>
                                              <li>» Custom Gateway Icon</li>
                                              <li>» Order Status After Checkout</li>
                                              <li>» Custom API Requests</li>
                                              <li>» Payment Information in Order’s Email</li>
                                              <li>» Debugging Mode</li>
                                              <li>» Auto Hassle-Free Updates</li>
                                              <li>» High Priority Customer Support</li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                              <div class="postbox ">
                                  <h3 class="hndle"><span><i class="dashicons dashicons-editor-help"></i>&nbsp;&nbsp;Plugin Support</span></h3>
                                    <hr>
                                  <div class="inside">
                                      <div class="support-widget">
                                          <p>
                                          <img style="width: 70%;margin: 0 auto;position: relative;display: inherit;" src="https://wpruby.com/wp-content/uploads/2016/03/wpruby_logo_with_ruby_color-300x88.png">
                                          <br/>
                                          Got a Question, Idea, Problem or Praise?</p>
                                          <ul>
                        <li>» Please leave us a <a target="_blank" href="https://wordpress.org/support/view/plugin-reviews/woocommerce-other-payment-gateway?filter=5#postform">★★★★★</a> rating.</li>
                                              <li>» <a href="https://wpruby.com/submit-ticket/" target="_blank">Support Request</a></li>
                                              <li>» <a href="https://wpruby.com/knowledgebase_category/woocommerce-custom-payment-gateway-pro/" target="_blank">Documentation and Common issues.</a></li>
                                              <li>» <a href="https://wpruby.com/plugins/" target="_blank">Our Plugins Shop</a></li>
                                          </ul>

                                      </div>
                                  </div>
                              </div>

                              <div class="postbox rss-postbox">
                      <h3 class="hndle"><span><i class="fa fa-wordpress"></i>&nbsp;&nbsp;WPRuby Blog</span></h3>
                                        <hr>
                      <div class="inside">
                      <div class="rss-widget">
                        <?php
                            wp_widget_rss_output(array(
                                'url' => 'https://wpruby.com/feed/',
                                'title' => 'WPRuby Blog',
                                'items' => 3,
                                'show_summary' => 0,
                                'show_author' => 0,
                                'show_date' => 1,
                            ));
                          ?>
                        </div>
                      </div>
                  </div>

                          </div>
                      </div>
                    </div>
        </div>
        <div class="clear"></div>
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