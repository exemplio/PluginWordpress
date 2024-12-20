const settings = window.wc.wcSettings.getSetting("my_custom_gateway_data", {});
const label = window.wp.htmlEntities.decodeEntities(settings.title) || window.wp.i18n.__("", "my-custom-gateway");
const sendData = () => {
    $("#msgInfo").modal("show");
    // callServicesHttp('get-commision',null,null);
};
const Accordion = () => {
    const [ bodyModal, setBodyModal] = React.useContext(null);
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
        React.createElement(WarningModal, {label: "Modal",bodyText:bodyModal}),
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