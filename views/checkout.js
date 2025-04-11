var jsonTosend = {};
const eyeSolid= php_var.eye_solid;
const eyeSlash= php_var.eye_slash;

//Vista de la pasarela de pago
const Accordion = () => {
    const [TDCValidation, setTDCValidation] = React.useState(false);
    const [TDDValidation, setTDDValidation] = React.useState(false);
    const [MercantilTDDValidation, setMercantilTDDValidation] = React.useState(false);
    const [P2PValidation, setP2PValidation] = React.useState(false);
    const [C2PValidation, setC2PValidation] = React.useState(false);
    const [OTValidation, setOTValidation] = React.useState(false);
    const [ReceiptValidation, setReceiptValidation] = React.useState(false);
    const [CollectMethod, setCollectMethod] = React.useState("");
    const [displayingEmail, setDisplayingEmail] = React.useState("");
    const [ShowTotalPayment, setShowTotalPayment] = React.useState(false);
    const [TotalAmount, setTotalAmount] = React.useState("");
    let { collect_methods, credentials } = CollectMethod;
    // Obtener tasa del dia
    const getCurrency = () => {
        let query = `?realm=cuyawa&from_currency_code=USD&to_currency_code=VED`;
        callServicesHttp('get-currency', query, "").then((response) => {
            if ((Boolean(response?.code))) {
                sendModalValue("msgError",processMessageError(response,"Error al obtener la tasa de cambio"));
                openModal('msgError');
                return;
            }else{
                if(!(response?.code==200)){
                    getMethods();
                    setTotalAmount(parseFloat((php_var.cart_total * response?.rounded_rate).toFixed(2)));
                    return;
                }else{
                    sendModalValue("msgError",processMessageError(response,"Error al obtener la tasa de cambio"));
                    openModal('msgError');
                    return;
                }
            }
        }).catch((e)=>console.log(e))        
    }
    // Obtener credenciales
    const getCredentials = () => {
        let query = "";
        var mensajeAll = "Error al obtener los métodos de colección";
        callServicesHttp('get-credentials',query,"").then((response) => {
            if (response == null || response == undefined || response == "") {
                sendModalValue("msgError",processMessageError(response, mensajeAll));
                openModal('msgError');
                return;
            } else {
                if (!(response.code==null || response.code==undefined || response.code=="")) {
                    sendModalValue("msgError",processMessageError(response, mensajeAll));
                    openModal('msgError');
                    return;
                }else{
                    localStorage.setItem('authorize-credentials', JSON.stringify(response));
                    getCurrency();                    
                    return;
                }
            }
        }).catch((e)=>{
            console.error(e);            
        });
    }
    // Obtener metodos de pago
    const getMethods = async () => {
        let query = "";
        var mensajeAll = "Error al obtener los métodos de colección";
        callServicesHttp('get-collect-channel',query,null).then((response) => {
            if (response == null || response == undefined || response == "") {
                sendModalValue("msgError",processMessageError(response, mensajeAll));
                openModal('msgError');
                return;
            } else {
                if (!(response.code==null || response.code==undefined || response.code=="")) {
                    sendModalValue("msgError",processMessageError(response, mensajeAll));
                    openModal('msgError');
                    return;                
                }else{
                    setCollectMethod(response);
                    if(Boolean(response)){                        
                        if(response.hasOwnProperty('collect_methods')){
                            setDisplayingEmail(response?.business_email);
                            setShowTotalPayment(true);
                            let { collect_methods, credentials } = response;
                                collect_methods.length!=0 ? collect_methods.map((item) => { 
                                    switch (item?.product_name) {
                                        case "TDC_API":
                                            setTDCValidation(true);
                                            break;
                                        case "TDD_API":
                                            switch (item?.credential_service) {
                                                case "CREDICARD_PAGOS_TDD":
                                                    setTDDValidation(true);                                            
                                                    break;
                                                case "MERCANTIL_TDD":
                                                    setMercantilTDDValidation(true);
                                                    break;                                            
                                                default:
                                                    break;
                                            }
                                            break;
                                        case "MOBILE_PAYMENT_SEARCH":
                                            setP2PValidation(true);
                                            break;
                                        case "MOBILE_PAYMENT_SEARCH_API":
                                            setP2PValidation(true);
                                            break;
                                        case "MOBILE_PAYMENT":
                                            setC2PValidation(true);
                                            break;
                                        case "TRANSFER_PAYMENT_SEARCH":
                                            setOTValidation(true);
                                            break;
                                        default:
                                            break
                                    }
                                }) : credentials.map((item) => { 
                                    switch (item?.payment_method) {
                                        case "TDC":
                                            setTDCValidation(true);
                                            break;
                                        case "TDD":
                                            switch (item?.service) {
                                                case "CREDICARD_PAGOS_TDD":
                                                    setTDDValidation(true);                                            
                                                    break;
                                                case "MERCANTIL_TDD":
                                                    setMercantilTDDValidation(true);
                                                    break;                                            
                                                default:
                                                    break;
                                            }
                                            break;
                                        case "MOBILE_PAYMENT_SEARCH":
                                            setP2PValidation(true);
                                            break;
                                        case "MOBILE_PAYMENT_SEARCH_API":
                                            setP2PValidation(true);
                                            break;
                                        case "C2P":
                                            setC2PValidation(true);
                                            break;
                                        case "TRANSFER_PAYMENT_SEARCH":
                                            setOTValidation(true);
                                            break;
                                        default:
                                            break
                                    }
                                });                                           
                        }
                    }
                    return;
                }                         
            }
        }).catch((e)=>{
            console.error(e);            
        });
    }
    const sendPayment = (id,metodoColeccion) => {
        closeModal(id);
        let billing_first_name = document.getElementById("billing_first_name").value;
        let billing_last_name = document.getElementById("billing_last_name").value;
        let billing_cedularif = document.getElementById("billing_cedularif").value;
        let billing_address_1 = document.getElementById("billing_address_1").value;
        let billing_city = document.getElementById("billing_city").value;
        let billing_postcode = document.getElementById("billing_postcode").value;
        let billing_phone = document.getElementById("billing_phone").value;
        let billing_email = document.getElementById("billing_email").value;
        let billing_country = document.getElementById("select2-billing_country-container").value;
        let billing_state = document.getElementById("select2-billing_state-container").value;
        if(!(billing_first_name)){
            sendModalValue("msgWarning","Debe ingresar el nombre de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_last_name)){
            sendModalValue("msgWarning","Debe ingresar el apellido de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_cedularif)){
            sendModalValue("msgWarning","Debe ingresar la cédula de identidad o RIF de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_address_1)){
            sendModalValue("msgWarning","Debe ingresar la dirección de la calle de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_city)){
            sendModalValue("msgWarning","Debe ingresar la Localidad o Ciudad de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_postcode)){
            sendModalValue("msgWarning","Debe ingresar el código postal de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_phone)){
            sendModalValue("msgWarning","Debe ingresar el teléfono de la facturación");
            openModal('msgWarning');
            return;
        }
        if(!(billing_email)){
            sendModalValue("msgWarning","Debe ingresar el correo electrónico de la facturación");
            openModal('msgWarning');
            return;
        }
        if (document.getElementById("account_username") && document.getElementById("account_password")) {
            let account_username = document.getElementById("account_username").value;
            let account_password = document.getElementById("account_password").value;
            if(!(account_username)){
                sendModalValue("msgWarning","Debe ingresar el nombre de usuario");
                openModal('msgWarning');
                return;
            }        
            if(account_password==null || account_password==undefined || account_password==""){
                sendModalValue("msgWarning","Debe ingresar la contraseña");
                openModal('msgWarning');
                return;
            }
        }
        let mensajeAll = "Error al realizar el pago";        
        let query = `?product_name=${metodoColeccion?.product_name==undefined ? metodoColeccion?.typeToSend : metodoColeccion?.product_name}&payment_method_id=${metodoColeccion?.id}`;
        let data = jsonTosend;
        ActiveLoading();
        callServicesHttp('place-order', php_var.empty_cart, 'set_payment_status_true').then((responseChecking) => {
            if (responseChecking?.success) {
                jQuery.ajax({
                    url: '../wp-json/wc/store/v1/cart/update-customer',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({            
                        "billing_address": {
                            "first_name": billing_first_name,
                            "last_name": billing_last_name,
                            "address_1": billing_address_1,
                            "city": billing_city,
                            "state": billing_state,
                            "postcode": billing_postcode,
                            "country": billing_country,
                            "email": billing_email,
                            "phone": billing_phone
                        },
                        "shipping_address": {
                            "first_name": billing_first_name,
                            "last_name": billing_last_name,
                            "address_1": billing_address_1,
                            "city": billing_city,
                            "state": billing_state,
                            "postcode": billing_postcode,
                            "country": billing_country,
                            "email": billing_email,
                            "phone": billing_phone
                        },
                        "payment_method": "gateway_paguetodo",
                        "payment_data": [
                            {
                            "key": "wc-gateway_paguetodo-new-payment-method",
                            "value": false
                            }
                        ],
                    }),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Nonce', php_var.nonce);
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(dataUpdate) {
                        callServicesHttp('customer-info', php_var.customer_info, 'get_customer_orders').then((responseCustomer) => {
                            jQuery.ajax({
                                url: '../wp-json/wc/store/v1/checkout?_locale=site',
                                method: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({            
                                    "billing_address": {
                                        "first_name": responseCustomer?.data?.billing_first_name,
                                        "last_name": responseCustomer?.data?.billing_last_name,
                                        "company": responseCustomer?.data?.billing_company,
                                        "address_1": responseCustomer?.data?.billing_address_1,
                                        "city": responseCustomer?.data?.billing_city,
                                        "state": responseCustomer?.data?.billing_state,
                                        "postcode": responseCustomer?.data?.billing_postcode,
                                        "country": responseCustomer?.data?.billing_country,
                                        "email": responseCustomer?.data?.billing_email,
                                        "phone": responseCustomer?.data?.billing_phone
                                    },
                                    "shipping_address": {
                                        "first_name": responseCustomer?.data?.shipping_first_name,
                                        "last_name": responseCustomer?.data?.shipping_last_name,
                                        "company": responseCustomer?.data?.shipping_company,
                                        "address_1": responseCustomer?.data?.shipping_address_1,
                                        "city": responseCustomer?.data?.shipping_city,
                                        "state": responseCustomer?.data?.shipping_state,
                                        "postcode": responseCustomer?.data?.shipping_postcode,
                                        "country": responseCustomer?.data?.shipping_country,
                                        "phone": responseCustomer?.data?.shipping_phone
                                    },
                                    "payment_method": "gateway_paguetodo",
                                    "payment_data": [
                                        {
                                        "key": "wc-gateway_paguetodo-new-payment-method",
                                        "value": false
                                        }
                                    ],
                                }),
                                beforeSend: function(xhr) {
                                    xhr.setRequestHeader('Nonce', php_var.nonce);
                                },
                                xhrFields: {
                                    withCredentials: true
                                },
                                success: function(dataResponse) {
                                    callServicesHttp('payment', query, data).then((responsePayment) => {
                                        if ((Boolean(responsePayment?.code))) {
                                            callServicesHttp('place-order', php_var.empty_cart, 'set_payment_status_false').then((response) => {
                                                HideLoading();
                                                sendModalValue("msgError",processMessageError(responsePayment,mensajeAll));
                                                openModal('msgError');
                                                return;
                                            })
                                        }else{
                                            if(!(responsePayment?.status==200)){
                                                let reference_name;
                                                let {collect_method, credentials} = responsePayment;
                                                if (!(responsePayment?.collector_reference==null || responsePayment?.collector_reference==undefined || responsePayment?.collector_reference=="")) {
                                                    reference_name = `${collect_method != undefined ? translate(collect_method?.product_name.toLowerCase()) : translate(credentials?.payment_method.toLowerCase())} #${responsePayment?.collector_reference}`;
                                                }else{
                                                    reference_name = collect_method != undefined ? translate(collect_method?.product_name.toLowerCase()) : translate(credentials?.payment_method.toLowerCase());
                                                }
                                                callServicesHttp('place-order', php_var.empty_cart, 'place_order_woo', reference_name).then((response) => {
                                                    window.location.href = dataResponse?.payment_result?.redirect_url;
                                                }).catch((e)=>console.log(e))
                                            }else{
                                                callServicesHttp('place-order', php_var.empty_cart, 'set_payment_status_false').then((response) => {
                                                    HideLoading();
                                                    sendModalValue("msgError",processMessageError(responsePayment,mensajeAll));
                                                    openModal('msgError');
                                                    return;
                                                })
                                            } 
                                        }
                                    }).catch((e)=>console.log(e))                   
                                }
                            }).catch((e)=>{
                                HideLoading();
                                document.getElementById('msgErrorBody').innerHTML="No se pudo realizar el pago";
                                openModal('msgError');
                                return;
                            });            
                        }).catch((e)=>{
                            console.error(e);            
                        });     
                    }
                }).catch((e)=>{
                    HideLoading();
                    sendModalValue("msgError",e?.responseJSON?.message);
                    openModal('msgError');
                    return;
                });                 
            }
        }).catch((e)=>console.log(e))

        return;
    };
    // Abrir modal de los acordiones
    const OpenAccordionModal = () => {
        openModal("msgWarningP2P");
        return;
    }
    // Abrir modal de los acordiones
    const RedirectClick = () => {
        window.open('','_blank').location.href = 'https://www.paguetodo.com/';
        return;
    }
    // Esconder todos los acordiones
    const HideAccordions = () => {
        setTDCValidation(false),
        setTDDValidation(false),
        setP2PValidation(false),
        setC2PValidation(false),
        setOTValidation(false)
        return;
    }
    // Mostrar recibo
    const ShowReceipt = () => {
        setReceiptValidation(true)
        return;
    }
    React.useEffect(() => {
        if (!(php_var.cart_total==undefined || php_var.cart_total==null)) {
            php_var.cart_total = parseFloat(php_var.cart_total);
        }
        setTimeout(() => {
            getCredentials();            
        }, 300);
    }, []); 
        return React.createElement("div", { className: "accordion", id: "accordion" },
            TDCValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingTDC", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseTDC",
                        "aria-expanded": "false",
                        "aria-controls": "collapseTDC"
                    }, "CREDICARDPAGOS CRÉDITO")
                ),
                React.createElement("div", {
                    id: "collapseTDC",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingTDC",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, 'Tarjeta de Crédito'),
                        React.createElement(CredicardPay, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "TDC_API") : credentials.filter((item) => item?.payment_method === "TDC"), totalAmount: TotalAmount, paymentFun: sendPayment })
                    )
                )
            ),
            TDDValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingTDD", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseTDD",
                        "aria-expanded": "false",
                        "aria-controls": "collapseTDD"
                    }, "CREDICARDPAGOS DÉBITO MAESTRO")
                ),
                React.createElement("div", {
                    id: "collapseTDD",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingTDD",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, 'Tarjeta de Débito'),
                        React.createElement(CredicardPay, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "TDD_API" && item?.credential_service=="CREDICARD_PAGOS_TDD") : credentials.filter((item) => item?.payment_method === "TDD" && item?.service=="CREDICARD_PAGOS_TDD"), totalAmount: TotalAmount, paymentFun: sendPayment })
                    )
                )
            ),
            MercantilTDDValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingMercantilTDD", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseMercantilTDD",
                        "aria-expanded": "false",
                        "aria-controls": "collapseMercantilTDD"
                    }, "MERCANTIL TDD")
                ),
                React.createElement("div", {
                    id: "collapseMercantilTDD",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingMercantilTDD",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, 'Tarjeta de Débito'),
                        React.createElement(MercantilTDD, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "TDD_API" && item?.credential_service=="MERCANTIL_TDD") : credentials.filter((item) => item?.payment_method === "TDD" && item?.service=="MERCANTIL_TDD"), totalAmount: TotalAmount, paymentFun: sendPayment })
                    )
                )
            ),
            P2PValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingP2P", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseP2P",
                        "aria-expanded": "false",
                        "aria-controls": "collapseP2P",
                        onClick: () => OpenAccordionModal()
                    }, "PAGO P2P")
                ),
                React.createElement("div", {
                    id: "collapseP2P",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingP2P",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement(MobilePayment, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "MOBILE_PAYMENT_SEARCH" || item?.product_name === "MOBILE_PAYMENT_SEARCH_API") : credentials.filter((item) => item?.payment_method === "MOBILE_PAYMENT_SEARCH" || item?.payment_method === "MOBILE_PAYMENT_SEARCH_API"), totalAmount: TotalAmount, paymentFun: sendPayment, displayingEmail })
                    )
                )
            ),
            C2PValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingC2P", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseC2P",
                        "aria-expanded": "false",
                        "aria-controls": "collapseC2P"
                    }, "PAGO C2P")
                ),
                React.createElement("div", {
                    id: "collapseC2P",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingC2P",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement(C2pPayment, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "MOBILE_PAYMENT") : credentials.filter((item) => item?.payment_method === "C2P"), totalAmount: TotalAmount, paymentFun: sendPayment })
                    )
                )
            ),
            OTValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingIT", style: { margin: '0' } },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseIT",
                        "aria-expanded": "false",
                        "aria-controls": "collapseIT"
                    }, "TRANSFERENCIA ONLINE")
                ),
                React.createElement("div", {
                    id: "collapseIT",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingIT",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, "Transferencia Online"),
                        React.createElement(OnlineTransfer, { metodoColeccion: collect_methods.length!=0 ? collect_methods.filter((item) => item?.product_name === "TRANSFER_PAYMENT_SEARCH") : credentials.filter((item) => item?.payment_method === "TRANSFER_PAYMENT_SEARCH"), totalAmount: TotalAmount, paymentFun: sendPayment })
                    )
                )
            ),
            ShowTotalPayment && React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between'} },
                React.createElement("h3", { className: "font-bold", style:{ textAlign : 'right', marginTop:'30px' } }, `Monto a pagar:`),
                React.createElement("h3", { className: "font-bold custom-font-size", style:{ textAlign : 'right', marginTop:'30px' } }, `Bs. ${parseAmount(TotalAmount)}`),
            ),
            ShowTotalPayment && React.createElement("div", { className: "text-muted text-center text-small", style:{ textAlign:'center' } },
                React.createElement("p", { className: "mt-3", style:{ cursor:'pointer' }, onClick: () => RedirectClick()}, `© 2025 Servicios Paguetodo C.A`),
            ),
        );
};
const Content = () => {
    return React.createElement("div",{style:{ padding: '0', paddingTop:0 }},null,
        React.createElement(WarningModal, {label: "Modal"}),
        React.createElement(InfoModal, {label: "Modal"}),
        React.createElement(ErrorModal, {label: "Modal"}),
        React.createElement(MsgModal, {label: "Modal"}),
        React.createElement(WarningP2P, {label: "Modal"}),
        React.createElement(Loading, {label: "Modal"}),
        React.createElement(Accordion, {id: "my_custom_gateway_accordion", label: "Accordion"}),
    );
};
jQuery('body').on( 'updated_checkout', function() {
    ReactDOM.render(Object(window.wp.element.createElement)(Content, null), document.getElementById("root"));    
  });
