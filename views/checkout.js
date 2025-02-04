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
    const [displayingRif, setDisplayingRif] = React.useState("");
    const [displayingPhone, setDisplayingPhone] = React.useState("");
    const [displayingEmail, setDisplayingEmail] = React.useState("");
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
                    getMethods();
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
                            response?.collect_methods.map((item) => {
                                switch (item?.product_name) {
                                    case "TDC_API":
                                        setTDCValidation(true);
                                        break;
                                    case "TDD_API":
                                        if (item?.credential_service=="CREDICARD_PAGOS_TDD") {
                                            setTDDValidation(true);                                            
                                        }else{
                                            setMercantilTDDValidation(true);
                                        }
                                        break;
                                    case "MOBILE_PAYMENT_SEARCH":
                                        setP2PValidation(true);
                                        setDisplayingRif(item?.id_doc);
                                        setDisplayingPhone(item?.phone);
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
        let mensajeAll = "Error al realizar el pago";
        let query = `?product_name=${metodoColeccion?.product_name}&payment_method_id=${metodoColeccion?.id}`;
        let data = jsonTosend;
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
                        "address_2": responseCustomer?.data?.billing_address_2,
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
                        "address_2": responseCustomer?.data?.shipping_address_1,
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
                            HideLoading();
                            sendModalValue("msgError",processMessageError(responsePayment,mensajeAll));
                            openModal('msgError');
                            return;
                        }else{
                            if(!(responsePayment?.status==200)){
                                callServicesHttp('redirect', php_var.empty_cart).then((response) => {
                                    window.location.href = dataResponse?.payment_result?.redirect_url;                                  
                                }).catch((e)=>console.log(e))
                            }else{
                                HideLoading();
                                sendModalValue("msgError",processMessageError(responsePayment,mensajeAll));
                                openModal('msgError');
                                return;
                            } 
                        }
                    }).catch((e)=>console.log(e))                   
                }
            }).catch((e)=>{
                HideLoading();
                sendModalValue("msgError",processMessageError(e,mensajeAll));
                openModal('msgError');
                return;
            });            
        }).catch((e)=>{
            console.error(e);            
        });      
        return;
    };
    // Abrir modal de los acordiones
    const OpenAccordionModal = () => {
        openModal("msgWarningP2P");
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
                        React.createElement(CredicardPay, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "TDC_API"), paymentFun: sendPayment })
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
                    }, "CREDICARDPAGOS DÉBITO")
                ),
                React.createElement("div", {
                    id: "collapseTDD",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingTDD",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, 'Tarjeta de Débito'),
                        React.createElement(CredicardPay, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "TDD_API" && item?.credential_service=="CREDICARD_PAGOS_TDD"), paymentFun: sendPayment } )
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
                        React.createElement(MercantilTDD, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "TDD_API" && item?.credential_service=="MERCANTIL_TDD"), paymentFun: sendPayment } )
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
                    }, "PAGO MÓVIL")
                ),
                React.createElement("div", {
                    id: "collapseP2P",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingP2P",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, "Pago Móvil Bancaribe"),
                        React.createElement(MobilePayment, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "MOBILE_PAYMENT_SEARCH"), paymentFun: sendPayment, displayingRif, displayingPhone, displayingEmail })
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
                        React.createElement("h5", { className: "font-bold", }, "Pago C2P Bancaribe"),
                        React.createElement(C2pPayment, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "MOBILE_PAYMENT"), paymentFun: sendPayment })
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
                        React.createElement(OnlineTransfer, { metodoColeccion: CollectMethod?.collect_methods.filter((item) => item?.product_name === "TRANSFER_PAYMENT_SEARCH"), paymentFun: sendPayment })
                    )
                )
            ),
            ReceiptValidation && React.createElement(Receipt, { metodoColeccion: "", paymentFun: sendPayment }),
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
