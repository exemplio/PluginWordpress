const C2pPayment = (indice ) => {  
    const ojitoOperacion = myPluginImage.eye_solid;
    const [idDocTypeValue, setIdDocType] = React.useState(null);
    const [idDocC2pValue, setIdDocC2p] = React.useState(null);
    const [prefixPhoneValue, setPrefixPhone] = React.useState(null);
    const [phoneC2PValue, setPhoneC2P] = React.useState(null);
    const [bancoSelectedValue, setBancoSelected] = React.useState(null);
    const [otpValue, setOtp] = React.useState(null);
    const idDocType = React.useRef(null);
    const idDocC2p = React.useRef(null);
    const prefixPhone = React.useRef(null);
    const phoneC2P = React.useRef(null);
    const bancoSelected = React.useRef(null);
    const otp = React.useRef(null);
    const changeTypeInputShow = () => {
        window.alert("Testing button");
    };
    const verifyDataC2P = () => {
        if (phoneP2PValue==null || phoneP2PValue==undefined || phoneP2PValue=="") {
            msgWarningBody.innerText="Debe ingresar el número de documento";
            $("#msgWarning").modal("show");
            return;
        }
    }
    const clean = () => { 
        setIdDocType("");
        setIdDocC2p("");
        setPrefixPhone("");
        setPhoneC2P("");
        setBancoSelected("");
        setOtp("");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{marginTop:'15px'}},
            // React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
            //     React.createElement("img", { src: `assets/images/png/${banco}.png`, height: "40px", style: { objectFit: 'contain' } }),
            //     React.createElement("h5", { className: "font-bold", style: { textTransform: 'uppercase' } }, banco)
            // ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "id_doc_type",
                        name: "id_doc_type",
                        required: true,
                        value: idDocC2pValue,
                        onChange: (e) => setIdDocType(e.currentTarget.value)
                    },
                        getTypesIdDoc().map((item, index) => (
                            React.createElement("option", { key: index, value: item }, item)
                        ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "9",
                            className: "form-control",
                            inputMode: "numeric",
                            id: "idDocC2p",
                            name: "idDocC2p",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: idDocC2pValue,
                            onChange: (e) => setIdDocC2p(e.currentTarget.value),
                            // onBlur: () => verifyDoc(idDoc)
                        }),
                        React.createElement("label", { htmlFor: "idDocC2p",className: "font-regular" }, "Nro. documento")
                    ),
                ),
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: `prefijo_c2p`,
                        name: `prefijo_c2p`,
                        required: true,
                        value: prefixPhoneValue,
                        onChange: (e) => setPrefixPhone(e.currentTarget.value)
                    },
                        getPrefixArea().map((item3, index) => (
                            React.createElement("option", { key: index, value: item3.value }, item3.to_show)
                        ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "7",
                            className: "form-control",
                            inputMode: "numeric",
                            id: "phone_c2p",
                            name: "phone_c2p",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: phoneC2PValue,
                            onChange: (e) => setPhoneC2P(e.currentTarget.value)
                        }),
                        React.createElement("label", { htmlFor: "phone_c2p",className: "font-regular" }, "Nro. Teléfono")
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select",
                        id: `banco_selected_c2p`,
                        name: `banco_selected_c2p`,
                        required: true,
                        value: bancoSelectedValue,
                        onChange: (e) => {
                            setBancoSelected(e.currentTarget.value);
                            setTooltip(e.currentTarget.value);
                        }
                    },
                        allBanks().map((item, index) => (
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.name)
                        ))
                    ),
                    React.createElement("label", { htmlFor: `banco_selected`,className: "font-regular" }, "Banco emisor")
                ),
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating", style: { width: 'calc(100% - 50px)' } },
                        React.createElement("input", {
                            type: "text",
                            className: "form-control",
                            inputMode: "numeric",
                            id: `otp`,
                            name: `otp`,
                            maxLength: "10",
                            style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
                            autoComplete: "off",
                            value: otpValue,
                            onChange: (e) => setOtp(e.currentTarget.value),
                            onKeyPress: (e) => keypressNumeros(e)
                        }),
                        React.createElement("label", { htmlFor: `otp`, className: "d-none d-sm-inline-block font-regular" }, "Clave de operaciones especiales"),
                        React.createElement("label", { htmlFor: `otp`, className: "d-sm-none font-regular" }, "Clave")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary",
                        style: { width: '50px' },
                        onClick: () => changeTypeInputShow(`clave_c2p`, 'ojito_operacion')
                    },
                        React.createElement("img", { src: ojitoOperacion, height: "18px", width: "18px", alt: "Toggle visibility" })
                    ),
                ),
            ),
        ),
        React.createElement("div", { className: "row col-lg-12 offset-md-12 col-md-12 col-sm-12 col-12 mt-2 reportButtons", style: { justifyContent: 'right', display: 'flex', marginTop: '15px' } },
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-lg button-clean font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => clean()
                }, "Limpiar")
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => verifyDataC2P('PAY')
                }, "Pagar")
            )
        ),
    );
}