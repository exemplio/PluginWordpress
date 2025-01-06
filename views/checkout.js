const settings = window.wc.wcSettings.getSetting("my_custom_gateway_data", {});
const label = window.wp.htmlEntities.decodeEntities(settings.title) || window.wp.i18n.__("", "my-custom-gateway");
const collectMethod = JSON.parse(localStorage.getItem("collect-methods"));
var jsonTosend = {};
const eyeSolid= myPluginImage.eye_solid;
const eyeSlash= myPluginImage.eye_slash;

// Obtener credenciales
const getCredentials = async () => {
    let query = "";
    var mensajeAll = "Error al obtener los métodos de colección";
    callServicesHttp('get-credentials',query,"").then((response) => {        
        if (response == null || response == undefined || response == "") {
            sendModalValue("msgError",processMessageError(response, mensajeAll));
            $("#msgError").modal("show");
            return;
        } else {
            if (!(response.code==null || response.code==undefined || response.code=="")) {
                sendModalValue("msgError",processMessageError(response, mensajeAll));
                $("#msgError").modal("show");
                return;
            }else{
                localStorage.setItem('authorize-credentials', JSON.stringify(response));
                getMethods();
                return;
            }
        }
    }, err => {
        sendModalValue("msgError",processError(err, mensajeAll));
        $("#msgError").modal("show");
        return;
    });
}
// Obtener metodos de pago
const getMethods = async () => {
    let query = "";
    var mensajeAll = "Error al obtener los métodos de colección";
    callServicesHttp('get-collect-channel',query,null).then((response) => {        
        if (response == null || response == undefined || response == "") {
            sendModalValue("msgError",processMessageError(response, mensajeAll));
            $("#msgError").modal("show");
            return;
        } else {
            if (!(response.code==null || response.code==undefined || response.code=="")) {
                sendModalValue("msgError",processMessageError(response, mensajeAll));
                $("#msgError").modal("show");
                return;                
            }else{
                localStorage.setItem('collect-methods', JSON.stringify(response));
                return;
            }                         
        }
    }, err => {
        sendModalValue("msgError",processError(err, mensajeAll));
        $("#msgError").modal("show");
        return;
    });
}
//Vista de la pasarela de pago
const Accordion = () => {
    const [TDCValidation, setTDCValidation] = React.useState(false);
    const [TDDValidation, setTDDValidation] = React.useState(false);
    const [P2PValidation, setP2PValidation] = React.useState(false);
    const [C2PValidation, setC2PValidation] = React.useState(false);
    const [OTValidation, setITValidation] = React.useState(false);
    const hideAllPayments = () => {
        setTDCValidation(false);
        setTDDValidation(false);
        setP2PValidation(false);
        setC2PValidation(false);
        setITValidation(false);
    };
    React.useEffect(() => {
        collectMethod?.collect_methods.map((item) => {
            switch (item.product_name) {
                case "TDC_API":
                    setTDCValidation(true);
                    break;
                case "TDD_API":
                    setTDDValidation(true);
                    break;
                case "MOBILE_PAYMENT_SEARCH":
                    setP2PValidation(true);
                    break;
                case "MOBILE_PAYMENT":
                    setC2PValidation(true);
                    break;
                case "TRANSFER_PAYMENT_SEARCH":
                    setITValidation(true);
                    break;
                default:
                    break
            }
        });
    }, []); 
        return React.createElement("div", { className: "accordion", id: "accordion" },
            TDCValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingTDC" },
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
                        React.createElement(CredicardPay, { id: "my_custom_gateway_card_number_2", label: "Card Number", metodoColeccion: collectMethod?.collect_methods.filter((item) => item.product_name === "TDC_API") })
                    )
                )
            ),
            TDDValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingTDD" },
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
                        React.createElement(CredicardPay, { id: "my_custom_gateway_card_number_2", label: "Card Number", metodoColeccion: collectMethod?.collect_methods.filter((item) => item.product_name === "TDD_API") } )
                    )
                )
            ),
            P2PValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingP2P" },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseP2P",
                        "aria-expanded": "false",
                        "aria-controls": "collapseP2P"
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
                        React.createElement(MobilePayment, { id: "my_custom_gateway_card_number_2", label: "Card Number", metodoColeccion: collectMethod?.collect_methods.filter((item) => item.product_name === "MOBILE_PAYMENT_SEARCH") })
                    )
                )
            ),
            C2PValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingC2P" },
                    React.createElement("button", {
                        className: "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": "#collapseC2P",
                        "aria-expanded": "false",
                        "aria-controls": "collapseC2P"
                    }, "PAGO C2P BANCARIBE")
                ),
                React.createElement("div", {
                    id: "collapseC2P",
                    className: "accordion-collapse collapse",
                    "aria-labelledby": "headingC2P",
                    "data-bs-parent": "#accordion"
                },
                    React.createElement("div", { className: "accordion-body" },
                        React.createElement("h5", { className: "font-bold", }, "Pago C2P"),
                        React.createElement(C2pPayment, { id: "my_custom_gateway_card_number_2", label: "Card Number", metodoColeccion: collectMethod?.collect_methods.filter((item) => item.product_name === "MOBILE_PAYMENT") })
                    )
                )
            ),
            OTValidation && React.createElement("div", { className: "accordion-item" },
                React.createElement("h2", { className: "accordion-header font-regular", id: "headingIT" },
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
                        React.createElement(OnlineTransfer, { id: "my_custom_gateway_card_number_2", label: "Card Number", metodoColeccion: collectMethod?.collect_methods.filter((item) => item.product_name === "TRANSFER_PAYMENT_SEARCH") })
                    )
                )
            ),
        );
};
const Content = () => {
    React.useEffect(() => {
        setTimeout(() => {
            getCredentials();
        }, 300);
    }, []); 
    return React.createElement("div",{style:{ padding: '20px', paddingTop:0 }},null,
        React.createElement("p", null, window.wp.htmlEntities.decodeEntities(settings.description || "")),
        React.createElement(WarningModal, {label: "Modal"}),
        React.createElement(InfoModal, {label: "Modal"}),
        React.createElement(ErrorModal, {label: "Modal"}),
        React.createElement(Accordion, {id: "my_custom_gateway_accordion", label: "Accordion"}),
        React.createElement(Loading, {label: "Modal"}),
    );
};
const sendPayment = (id,metodoColeccion) => {
    $(`#${id}`).modal("hide");
    let mensajeAll = "Error al realizar el pago";
    let query = `?product_name=${metodoColeccion?.product_name}&payment_method_id=${metodoColeccion?.id}`;
    let data = jsonTosend;
    callServicesHttp('payment', query, data).then((response) => {            
        if (Boolean(response.code)) {
            sendModalValue("msgError",processMessageError(response,mensajeAll));
            $("#msgError").modal("show");
            return;                             
        }else{
            // this.cleanP2P();
            // closeAll();
            // this.showReciboPartial(response);
        }
    });        
}
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