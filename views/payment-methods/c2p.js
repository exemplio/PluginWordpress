const C2pPayment = (idDocType ,banco,prefixPhone,phone,bancoSelected,indice,otp,clean ) => {  
    const [idDocC2p, setIdDocC2p] = React.useState(null);
    const ojitoOperacion = myPluginImage.eye_solid;
    const changeTypeInputShow = () => {
        window.alert("Testing button");
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
                        value: idDocType,
                        onChange: (e) => setIdDocType(e.target.value)
                    },
                        // listTypes.map((item, index) => (
                        //     React.createElement("option", { key: index, value: item }, item)
                        // ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "9",
                            className: "form-control",
                            inputMode: "numeric",
                            id: "idDocC2p",
                            name: "idDocC2p",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: idDocC2p,
                            onChange: (e) => setIdDoc(e.target.value),
                            onBlur: () => verifyDoc(idDoc)
                        }),
                        React.createElement("label", { htmlFor: "idDocC2p",className: "font-regular" }, "Nro. documento")
                    ),
                ),
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: `prefijo_c2p-${indice}-${banco}`,
                        name: `prefijo_c2p-${indice}-${banco}`,
                        required: true,
                        value: prefixPhone,
                        onChange: (e) => setPrefixPhone(e.target.value)
                    },
                        // listPrefixPhone.map((item3, index) => (
                        //     React.createElement("option", { key: index, value: item3.value }, item3.to_show)
                        // ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "7",
                            className: "form-control",
                            inputMode: "numeric",
                            id: "phone_c2p",
                            name: "phone_c2p",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: phone,
                            onChange: (e) => setPhone(e.target.value)
                        }),
                        React.createElement("label", { htmlFor: "phone_c2p",className: "font-regular" }, "Nro. Teléfono")
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select",
                        id: `banco_selected_c2p-${indice}-${banco}`,
                        name: `banco_selected_c2p-${indice}-${banco}`,
                        required: true,
                        value: bancoSelected,
                        onChange: (e) => {
                            setBancoSelected(e.target.value);
                            setTooltip(e.target.value);
                        }
                    },
                        // bancos.map((banco, index) => (
                        //     React.createElement("option", { key: index, value: banco.value }, `${banco.value} - ${banco?.to_show}`)
                        // ))
                    ),
                    React.createElement("label", { htmlFor: `banco_selected-${indice}-${banco}`,className: "font-regular" }, "Banco emisor")
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
                            value: otp,
                            onChange: (e) => setOtp(e.target.value),
                            onKeyPress: (e) => keypressNumbersInteger(e)
                        }),
                        React.createElement("label", { htmlFor: `otp`, className: "d-none d-sm-inline-block font-regular" }, "Clave de operaciones especiales"),
                        React.createElement("label", { htmlFor: `otp`, className: "d-sm-none font-regular" }, "Clave")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary",
                        style: { width: '50px' },
                        onClick: () => changeTypeInputShow(`clave_c2p-${indice}-${banco}`, 'ojito_operacion')
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
                    onClick: () => sendData('PAY')
                }, "Limpiar")
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => sendData('PAY')
                }, "Pagar")
            )
        ),
    );
}