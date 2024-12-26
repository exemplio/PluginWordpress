const settings = window.wc.wcSettings.getSetting("my_custom_gateway_data", {});
const label = window.wp.htmlEntities.decodeEntities(settings.title) || window.wp.i18n.__("", "my-custom-gateway");
var collectMethod = JSON.parse(localStorage.getItem("collect-methods"));

// Obtener credenciales
const getCredentials = async () => {
    let query = "";
    var mensajeAll = "Error al obtener los métodos de colección";
    callServicesHttp('get-credentials',query,null).then((data) => {        
        if (data == null || data == undefined || data == "") {
            msgErrorBody.innerText=mensajeAll;
            $("#msgError").modal("show");
            return;
        } else {
            if (!(data.code==null || data.code==undefined || data.code=="")) {
                msgErrorBody.innerText=mensajeAll;
                $("#msgError").modal("show");
                return;                
            }else{
                localStorage.setItem('authorize-credentials', JSON.stringify(data));
                return;
            }                         
        }
    }, err => {
        msgErrorBody.innerText=processError(err, mensajeAll);
        $("#msgError").modal("show");
        return;
    });
}
// Obtener metodos de pago
const getMethods = async () => {
    let query = "";
    var mensajeAll = "Error al obtener los métodos de colección";
    callServicesHttp('get-collect-channel',query,null).then((data) => {        
        if (data == null || data == undefined || data == "") {
            msgErrorBody.innerText=mensajeAll;
            $("#msgError").modal("show");
            return;
        } else {
            if (!(data.code==null || data.code==undefined || data.code=="")) {
                msgErrorBody.innerText=mensajeAll;
                $("#msgError").modal("show");
                return;                
            }else{
                localStorage.setItem('collect-methods', JSON.stringify(data));
                return;
            }                         
        }
    }, err => {
        msgErrorBody.innerText=processError(err, mensajeAll);
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
    const [ITValidation, setITValidation] = React.useState(false);
    React.useEffect(() => {
        collectMethod.collect_methods.map((item) => {
            switch (item.product_name) {
                case "TDC_API":
                    setTDCValidation(true);
                    break;
                case "TDD_API":
                    setTDDValidation(true);
                    break;
                case "MOBILE_PAYMENT":
                    setP2PValidation(true);
                    break;
                case "C2P":
                    setC2PValidation(true);
                    break;
                case "IT":
                    setITValidation(true);
                    break;
                default:
                    break
            }
        });
    }, []); 
        return React.createElement("div", { className: "accordion", id: "accordionExample" },
            TDDValidation && React.createElement("div", { className: "accordion-item" },
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
            P2PValidation && React.createElement("div", { className: "accordion-item" },
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
            C2PValidation && React.createElement("div", { className: "accordion-item" },
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
            ITValidation && React.createElement("div", { className: "accordion-item" },
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
    React.useEffect(() => {
        getCredentials();
        setTimeout(() => {
            getMethods();
        }, 300);
    }, []); 
    return React.createElement("div",{style:{ padding: '20px', paddingTop:0 }},null,
        React.createElement("p", null, window.wp.htmlEntities.decodeEntities(settings.description || "")),
        React.createElement(Accordion, {id: "my_custom_gateway_accordion", label: "Accordion"}),
        React.createElement(WarningModal, {label: "Modal"}),
        React.createElement(InfoModal, {label: "Modal"}),
        React.createElement(ErrorModal, {label: "Modal"}),
    );
};
const sendPayment = () => {
    $("#msgConfirm").modal("hide");
    let mensajeAll = translate("message_err_1");
    let query = `?product_name=${collectMethod?.collect_methods[1].product_name}&payment_method_id=${collectMethod?.collect_methods[1].id}`;
    let data = jsonTosend;
    callServicesHttp('payment', query, data).then((response) => {            
        if (Boolean(response.code)) {
            msgErrorBody.innerText=processMessageError(response,mensajeAll);
            $("#msgError").modal("show");
            return;                             
        }else{
            this.cleanP2P();
            closeAll();
            this.showReciboPartial(response);
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