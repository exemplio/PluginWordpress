<?php

// Get amount from the cart
add_action('woocommerce_payment_gateways', 'get_amount');
function get_amount(){
    $response = [];
    if ( ! WC()->cart->is_empty() ) {
        $cart_items = WC()->cart->get_cart();    
        foreach ( $cart_items as $cart_item_key => $cart_item ) {
            $product_id = $cart_item['product_id'];
            $quantity = $cart_item['quantity'];    
            $product = wc_get_product( $product_id );
            if ( $product ) {
                $response[] = [
                    'product_id' => $product_id,
                    'product_name' => $product->get_name(),
                    'quantity' => $quantity,
                    'price' => $product->get_price(),
                ];
            }
        }
    } else {
        $response = ['message' => 'Your cart is empty.'];
    }
    // echo wp_json_encode($response);
    // $string_version = implode(',', $response)
    
    // echo json_decode($response);
    wp_send_json($response);
    
    // End the AJAX request
    // wp_die();
}

?>