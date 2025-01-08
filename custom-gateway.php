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

function order_pay( $order_id ) {

    do_action( 'before_woocommerce_pay' );

    $order_id = absint( $order_id );

    // Pay for existing order.
    if ( isset( $_GET['pay_for_order'], $_GET['key'] ) && $order_id ) { // WPCS: input var ok, CSRF ok.
        try {
            $order_key = isset( $_GET['key'] ) ? wc_clean( wp_unslash( $_GET['key'] ) ) : ''; // WPCS: input var ok, CSRF ok.
            $order     = wc_get_order( $order_id );

            // Order or payment link is invalid.
            if ( ! $order || $order->get_id() !== $order_id || ! hash_equals( $order->get_order_key(), $order_key ) ) {
                throw new Exception( __( 'Sorry, this order is invalid and cannot be paid for.', 'woocommerce' ) );
            }

            // Logged out customer does not have permission to pay for this order.
            if ( ! current_user_can( 'pay_for_order', $order_id ) && ! is_user_logged_in() ) {
                wc_print_notice( esc_html__( 'Please log in to your account below to continue to the payment form.', 'woocommerce' ), 'notice' );
                woocommerce_login_form(
                    array(
                        'redirect' => $order->get_checkout_payment_url(),
                    )
                );
                return;
            }

            // Add notice if logged in customer is trying to pay for guest order.
            if ( ! $order->get_user_id() && is_user_logged_in() ) {
                // If order has does not have same billing email then current logged in user then show warning.
                if ( $order->get_billing_email() !== wp_get_current_user()->user_email ) {
                    wc_print_notice( __( 'You are paying for a guest order. Please continue with payment only if you recognize this order.', 'woocommerce' ), 'error' );
                }
            }

            // Logged in customer trying to pay for someone else's order.
            if ( ! current_user_can( 'pay_for_order', $order_id ) ) {
                throw new Exception( __( 'This order cannot be paid for. Please contact us if you need assistance.', 'woocommerce' ) );
            }

            // Does not need payment.
            if ( ! $order->needs_payment() ) {
                /* translators: %s: order status */
                throw new Exception( sprintf( __( 'This order&rsquo;s status is &ldquo;%s&rdquo;&mdash;it cannot be paid for. Please contact us if you need assistance.', 'woocommerce' ), wc_get_order_status_name( $order->get_status() ) ) );
            }

            // Ensure order items are still stocked if paying for a failed order. Pending orders do not need this check because stock is held.
            if ( ! $order->has_status( wc_get_is_pending_statuses() ) ) {
                $quantities = array();

                foreach ( $order->get_items() as $item_key => $item ) {
                    if ( $item && is_callable( array( $item, 'get_product' ) ) ) {
                        $product = $item->get_product();

                        if ( ! $product ) {
                            continue;
                        }

                        $quantities[ $product->get_stock_managed_by_id() ] = isset( $quantities[ $product->get_stock_managed_by_id() ] ) ? $quantities[ $product->get_stock_managed_by_id() ] + $item->get_quantity() : $item->get_quantity();
                    }
                }

                // Stock levels may already have been adjusted for this order (in which case we don't need to worry about checking for low stock).
                if ( ! $order->get_data_store()->get_stock_reduced( $order->get_id() ) ) {
                    foreach ( $order->get_items() as $item_key => $item ) {
                        if ( $item && is_callable( array( $item, 'get_product' ) ) ) {
                            $product = $item->get_product();

                            if ( ! $product ) {
                                continue;
                            }

                            if ( ! apply_filters( 'woocommerce_pay_order_product_in_stock', $product->is_in_stock(), $product, $order ) ) {
                                /* translators: %s: product name */
                                throw new Exception( sprintf( __( 'Sorry, "%s" is no longer in stock so this order cannot be paid for. We apologize for any inconvenience caused.', 'woocommerce' ), $product->get_name() ) );
                            }

                            // We only need to check products managing stock, with a limited stock qty.
                            if ( ! $product->managing_stock() || $product->backorders_allowed()  ) {
                                continue;
                            }

                            // Check stock based on all items in the cart and consider any held stock within pending orders.
                            $held_stock     = wc_get_held_stock_quantity( $product, $order->get_id() );
                            $required_stock = $quantities[ $product->get_stock_managed_by_id() ];

                            if ( ! apply_filters( 'woocommerce_pay_order_product_has_enough_stock', ( $product->get_stock_quantity() >= ( $held_stock + $required_stock ) ), $product, $order ) ) {
                                /* translators: 1: product name 2: quantity in stock */
                                throw new Exception( sprintf( __( 'Sorry, we do not have enough "%1$s" in stock to fulfill your order (%2$s available). We apologize for any inconvenience caused.', 'woocommerce' ), $product->get_name(), wc_format_stock_quantity_for_display( $product->get_stock_quantity() - $held_stock, $product ) ) );
                            }
                        }
                    }
                }
            }

            WC()->customer->set_props(
                array(
                    'billing_country'  => $order->get_billing_country() ? $order->get_billing_country() : null,
                    'billing_state'    => $order->get_billing_state() ? $order->get_billing_state() : null,
                    'billing_postcode' => $order->get_billing_postcode() ? $order->get_billing_postcode() : null,
                )
            );
            WC()->customer->save();

            $available_gateways = WC()->payment_gateways->get_available_payment_gateways();

            if ( count( $available_gateways ) ) {
                current( $available_gateways )->set_current();
            }

            /**
             * Allows the text of the submit button on the Pay for Order page to be changed.
             *
             * @param string $text The text of the button.
             *
             * @since 3.0.2
             */
            $order_button_text = apply_filters( 'woocommerce_pay_order_button_text', __( 'Pay for order', 'woocommerce' ) );

            /**
             * Triggered right before the Pay for Order form, after validation of the order and customer.
             *
             * @param WC_Order $order              The order that is being paid for.
             * @param string   $order_button_text  The text for the submit button.
             * @param array    $available_gateways All available gateways.
             *
             * @since 6.6
             */
            do_action( 'before_woocommerce_pay_form', $order, $order_button_text, $available_gateways );

            wc_get_template(
                'checkout/form-pay.php',
                array(
                    'order'              => $order,
                    'available_gateways' => $available_gateways,
                    'order_button_text'  => $order_button_text,
                )
            );

        } catch ( Exception $e ) {
            wc_print_notice( $e->getMessage(), 'error' );
        }
    } elseif ( $order_id ) {

        // Pay for order after checkout step.
        $order_key = isset( $_GET['key'] ) ? wc_clean( wp_unslash( $_GET['key'] ) ) : ''; // WPCS: input var ok, CSRF ok.
        $order     = wc_get_order( $order_id );

        if ( $order && $order->get_id() === $order_id && hash_equals( $order->get_order_key(), $order_key ) ) {

            if ( $order->needs_payment() ) {

                wc_get_template( 'checkout/order-receipt.php', array( 'order' => $order ) );

            } else {
                /* translators: %s: order status */
                wc_print_notice( sprintf( __( 'This order&rsquo;s status is &ldquo;%s&rdquo;&mdash;it cannot be paid for. Please contact us if you need assistance.', 'woocommerce' ), wc_get_order_status_name( $order->get_status() ) ), 'error' );
            }
        } else {
            wc_print_notice( __( 'Sorry, this order is invalid and cannot be paid for.', 'woocommerce' ), 'error' );
        }
    } else {
        wc_print_notice( __( 'Invalid order.', 'woocommerce' ), 'error' );
    }

    do_action( 'after_woocommerce_pay' );
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
            echo "<script>const cartItems= ". json_encode($response) .";</script>";
            echo "<script>const cartTotal= ". WC()->cart->total .";</script>";
            if ( ! is_checkout() && ! is_cart() ) {
                // echo "<script>function getHello(){ return ". wp_safe_redirect( site_url( 'finalizar-compra/order-received' ) ) ." };</script>";                
                echo "<script>function getHello(){ return ". order_pay(1) ." };</script>";                
            }
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