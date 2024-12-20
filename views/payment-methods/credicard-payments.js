const CredicardPay = ({ imagen,idDoc,bankName,etiqueta, typeP ,
    verifyDisabled, nroTarjeta, expiracion, ccv, tipoCuenta, pin, clean }) => {
    const ojito = myPluginImage.eye_solid;
    const ojitoTarjeta = myPluginImage.eye_solid;
    const ojitoPin = myPluginImage.eye_solid;
    const [cardHolder, setCardHolder] = React.useState(null);
    const [documentType, setDocumentType] = React.useState(null);
    const verifyData = () => {
        if (!(cardHolder==null || cardHolder==undefined || cardHolder=="")) {
            window.alert("");
        }else{
            setBodyModal("46948949");
            $("#msgWarning").modal("show");
            return;
        }
        if (!(documentType==null || documentType==undefined || documentType=="")) {
            window.alert("");
        }else{
            $("#msgWarning").modal("show");
            return;
        }
    }
    const changeTypeInputShowCard = () => {
        window.alert("Testing button");
    };
    const changeTypeInputShow = () => {
        window.alert("Testing button");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'center' } },
                imagen && React.createElement("img", { src: imagen, height: "40px", style: { objectFit: 'contain' } }),
                bankName && React.createElement("h5", { className: "font-bold" }, bankName),
                React.createElement("div", { className: "form-floating", style: { marginBottom: '0px' } },
                    React.createElement("input", {
                        type: "text",
                        id: "card_holder",
                        name: "card_holder",
                        className: "form-control font-regular",
                        style: { textTransform: 'uppercase' },
                        maxLength: "50",
                        value: cardHolder,
                        onChange: (e) => setCardHolder(e.target.value),
                        onKeyPress: (e) => verifyAlpha2(e)
                    }),
                    React.createElement("label", { htmlFor: "card_holder", className: `font-regular ${etiqueta}` }, "Nombres y apellidos")
                ),                
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group", style: { marginBottom: '0px' } },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "document_type_debito",
                        name: "document_type_debito",
                        required: true,
                        value: documentType,
                        onChange: (e) => {
                            setDocumentType(e.target.value);
                            changeDoc();
                        }
                    },
                        // listTypes.map((item, index) => (
                        //     React.createElement("option", { key: index, value: item }, item)
                        // ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        !typeP 
                            ? React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: "documento_debito",
                                name: "documento_debito",
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDoc,
                                onChange: (e) => setIdDoc(e.target.value),
                                onKeyPress: (e) => {
                                    keypressNumbersInteger(e);
                                    verifyFieldNumber(e);
                                },
                                onPaste: (e) => e.preventDefault(),
                                onDrag: (e) => e.preventDefault()
                            })
                            : React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: "documento_debito",
                                name: "documento_debito",
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDoc,
                                onChange: (e) => setIdDoc(e.target.value),
                                onKeyPress: (e) => {
                                    keypressLetrasNumeros(e);
                                    verifyFieldNumber(e);
                                },
                                onPaste: (e) => e.preventDefault(),
                                onDrag: (e) => e.preventDefault()
                            }),
                        React.createElement("label", { htmlFor: "documento_debito",className: "font-regular" }, "Nro. documento")
                    )
                )
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "19",
                            autoComplete: "off",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "nro_tarjeta",
                            name: "nro_tarjeta",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            disabled: verifyDisabled,
                            value: nroTarjeta,
                            onChange: (e) => setNroTarjeta(e.target.value),
                            onBlur: () => getCardInfo(nroTarjeta)
                        }),
                        React.createElement("label", { htmlFor: "nro_tarjeta", className: "font-regular" }, "Nro. Tarjeta")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShowCard(nroTarjeta, 'ojito_tarjeta')
                    },
                        React.createElement("img", { src: ojitoTarjeta, height: "18px", width: "18px", alt: "Toggle card visibility" })
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            autoComplete: "off",
                            maxLength: "5",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "expiracion",
                            name: "expiracion",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            value: expiracion,
                            onChange: (e) => setExpiracion(e.target.value),
                            style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }
                        }),
                        React.createElement("label", { htmlFor: "expiracion", className: "font-regular" }, "Expiración")
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "password",
                            maxLength: "4",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "ccv",
                            name: "ccv",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            value: ccv,
                            onChange: (e) => setCcv(e.target.value)
                        }),
                        React.createElement("label", { htmlFor: "ccv"}, "CCV")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow('ccv', 'ojito')
                    },
                        React.createElement("img", { src: ojito, height: "18px", width: "18px", alt: "Toggle CCV visibility" })
                    )
                )
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        id: "tipo_cuenta",
                        name: "tipo_cuenta",
                        required: true,
                        value: tipoCuenta,
                        onChange: (e) => setTipoCuenta(e.target.value)
                    },
                        // listTypesAccount.map((item6, index) => (
                        //     React.createElement("option", { key: index, value: item6 }, item6)
                        // ))
                    ),
                    React.createElement("label", { htmlFor: "tipo_cuenta", className: "font-regular", style: { marginBottom: '0px' } }, "Tipo cuenta")
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 d-flex", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "6",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "pin",
                            name: "pin",
                            autoComplete: "off",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            value: pin,
                            onChange: (e) => setPin(e.target.value)
                        }),
                        React.createElement("label", { htmlFor: "pin",className: "font-regular" }, "PIN")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow('pin', 'ojito_pin')
                    },
                        React.createElement("img", { src: ojitoPin, height: "18px", width: "18px", alt: "Toggle PIN visibility" })
                    )
                )
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
                    onClick: () => verifyData('PAY')
                }, "Pagar")
            )
        ),
    );
};