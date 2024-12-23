const settings = window.wc.wcSettings.getSetting("my_custom_gateway_data", {});
const label = window.wp.htmlEntities.decodeEntities(settings.title) || window.wp.i18n.__("", "my-custom-gateway");

//Crear, confirmar y/o obtener orden
const createOrder = (response) => {
    let shippingMethods = this.getShippingMethods();
    var query = `?app-id=${getClient()}&user_email=${shippingMethods?.validatedEmailValue}&country=VE`;
    const regex = /^0+/;
    var mensajeAll = translate("message_err_1");
    var data;
    var documento_id = `${'V'}${addZeros(getIdDocument(), 9)}`;
    if (Boolean(getIdDocument())) {
        documento_id = `${'V'}${addZeros(getIdDocument(), 9)}`
    }else{
        waitDocumentId('agreementsCheckout', 5000)
        .then((elemento) => {
            elemento.style.display= "block";
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
        var response = getResponseStorage()
        this.getOrder(response)
        return;  
    }
    
    waitDocumentId('agreementsCheckout', 5000)
    .then((elemento) => {
        elemento.style.display= "block";
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

    var type_product = getProductInfo()?.product_name.toUpperCase();
    var tipo_producto;
    if (type_product.includes('PREPAGO')) {
        tipo_producto = "ECOMMERCE_B2C";
    }else if(type_product.includes('POSPAGO')){
        tipo_producto = "ECOMMERCE_B2C_POSTPAID";
    }else if(type_product.includes('REPOSICION')){
        tipo_producto = "ECOMMERCE_B2C";
    }else{
        return;
    }
    var sku_id = getProductInfo()?.product_sku;
    if (Boolean(shippingMethods?.newCustomerBillingAddress)) {
        if(regex.test(shippingMethods?.newCustomerBillingAddress?.telephone)){
            var client_phone_new_billing = shippingMethods?.newCustomerBillingAddress?.telephone;                        
            client_phone_new_billing = client_phone_new_billing.replace(/^0+/, '');
        }else{
            client_phone_new_billing = shippingMethods?.newCustomerBillingAddress?.telephone;
        }
        data ={client_name:shippingMethods?.newCustomerBillingAddress?.firstname.toUpperCase() + " " + shippingMethods?.newCustomerBillingAddress?.lastname.toUpperCase(),client_id_doc:documento_id,client_email:shippingMethods?.validatedEmailValue,
        client_phone:client_phone_new_billing,client_address:shippingMethods?.newCustomerBillingAddress?.street[0],client_type:tipo_producto, publications:[{id:sku_id}]}
    }else{
        if(regex.test(shippingMethods?.shippingAddressFromData?.telephone)){
            var client_phone_shipping = shippingMethods?.shippingAddressFromData?.telephone;                        
            client_phone_shipping = client_phone_shipping.replace(/^0+/, '');
        }else{
            client_phone_shipping = shippingMethods?.shippingAddressFromData?.telephone;
        }
        data ={client_name:shippingMethods?.shippingAddressFromData?.firstname.toUpperCase() + " " + shippingMethods?.shippingAddressFromData?.lastname.toUpperCase(),client_id_doc:documento_id,client_email:shippingMethods?.validatedEmailValue,
        client_phone:client_phone_shipping,client_address:shippingMethods?.shippingAddressFromData?.street[0],client_type:tipo_producto, publications:[{id:sku_id}]}                    
    }
    if (Boolean(localStorage.getItem("id-input"))) {
        localStorage.removeItem("id-input");
    }
    if (Boolean(localStorage.getItem("rif-input"))) {
        localStorage.removeItem("rif-input");
    }
    callServicesHttp('create-order',query,data).then((response) => {
        if (Boolean(response.code)) {
            showModal('msgWarning');
            this.warningMessage(processMessageError(response,mensajeAll));
            return;                    
        }else{
            waitDocumentId('agreementsCheckout', 5000)
            .then((elemento) => {
                elemento.style.display= "block";
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
            localStorage.setItem('response-sequence', JSON.stringify(response));
            this.confirmOrder(response);                       
        }
    })
};
const confirmOrder = (response) => {
    var mensajeAll = translate("message_err_1");
    setTimeout(() => {              
        var sequence = response.sequence;
        var query = `/${sequence}`;
        callServicesHttp('confirm-order',query).then((response) => {
            if (Boolean(response.code)) {
                showModal('msgWarning');
                this.warningMessage(processMessageError(response,mensajeAll));
                return;                             
            }else{
                this.getOrder(response)                        
            }
        });
    }, "1000");
};
//Vista de la pasarela de pago
const Accordion = () => {
    return React.createElement("div", { className: "accordion", id: "accordionExample" },
        React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header font-regular", id: "headingTwo" },
                React.createElement("button", {
                    className: "accordion-button collapsed",
                    type: "button",
                    "data-bs-toggle": "collapse",
                    "data-bs-target": "#collapseOne",
                    "aria-expanded": "false",
                    "aria-controls": "collapseOne"
                }, "CREDICARDPAGOS DÉBITO")
            ),
            React.createElement("div", {
                id: "collapseOne",
                className: "accordion-collapse collapse",
                "aria-labelledby": "headingTwo",
                "data-bs-parent": "#accordionExample"
            },
                React.createElement("div", { className: "accordion-body" },
                    React.createElement("h5", { className: "font-bold", }, 'Tarjeta de Débito'),
                    React.createElement(CredicardPay, { id: "my_custom_gateway_card_number_2", label: "Card Number" })
                )
            )
        ),
        React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header font-regular", id: "headingTwo" },
                React.createElement("button", {
                    className: "accordion-button collapsed",
                    type: "button",
                    "data-bs-toggle": "collapse",
                    "data-bs-target": "#collapseTwo",
                    "aria-expanded": "false",
                    "aria-controls": "collapseTwo"
                }, "PAGO MÓVIL")
            ),
            React.createElement("div", {
                id: "collapseTwo",
                className: "accordion-collapse collapse",
                "aria-labelledby": "headingTwo",
                "data-bs-parent": "#accordionExample"
            },
                React.createElement("div", { className: "accordion-body" },
                    React.createElement("h5", { className: "font-bold", }, "Pago Móvil Bancaribe"),
                    React.createElement(MobilePayment, { id: "my_custom_gateway_card_number_2", label: "Card Number" })
                )
            )
        ),
        React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header font-regular", id: "headingThree" },
                React.createElement("button", {
                    className: "accordion-button collapsed",
                    type: "button",
                    "data-bs-toggle": "collapse",
                    "data-bs-target": "#collapseThree",
                    "aria-expanded": "false",
                    "aria-controls": "collapseThree"
                }, "PAGO C2P BANCARIBE")
            ),
            React.createElement("div", {
                id: "collapseThree",
                className: "accordion-collapse collapse",
                "aria-labelledby": "headingThree",
                "data-bs-parent": "#accordionExample"
            },
                React.createElement("div", { className: "accordion-body" },
                    React.createElement("h5", { className: "font-bold", }, "Pago C2P"),
                    React.createElement(C2pPayment, { id: "my_custom_gateway_card_number_2", label: "Card Number" })
                )
            )
        ),
        React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header font-regular", id: "headingFour" },
                React.createElement("button", {
                    className: "accordion-button collapsed",
                    type: "button",
                    "data-bs-toggle": "collapse",
                    "data-bs-target": "#collapseFour",
                    "aria-expanded": "false",
                    "aria-controls": "collapseFour"
                }, "TRANSFERENCIA INMEDIATA")
            ),
            React.createElement("div", {
                id: "collapseFour",
                className: "accordion-collapse collapse",
                "aria-labelledby": "headingFour",
                "data-bs-parent": "#accordionExample"
            },
                React.createElement("div", { className: "accordion-body" },
                    React.createElement("h5", { className: "font-bold", }, "Transferencia inmediata"),
                    React.createElement(InmediateTransfer, { id: "my_custom_gateway_card_number_2", label: "Card Number" })
                )
            )
        ),
    );
};
const Content = () => {
    return React.createElement("div",{style:{ padding: '20px', paddingTop:0 }},null,
        React.createElement("p", null, window.wp.htmlEntities.decodeEntities(settings.description || "")),
        React.createElement(Accordion, {id: "my_custom_gateway_accordion", label: "Accordion"}),
        React.createElement(WarningModal, {label: "Modal"}),
        React.createElement(InfoModal, {label: "Modal"}),
        React.createElement(ErrorModal, {label: "Modal"}),
    );
};
const Block_Gateway = {
    name: "my_custom_gateway",
    label: label,
    content: Object(window.wp.element.createElement)(Content, null),
    edit: Object(window.wp.element.createElement)(Content, null),
    canMakePayment: () => true,
    ariaLabel: label,
    supports: {
        features: settings.supports,
    },
};
window.wc.wcBlocksRegistry.registerPaymentMethod(Block_Gateway);