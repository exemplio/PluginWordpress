const InmediateTransfer = (bankValue,referenceValue,commerceIdDoc,collectorName) => { 
    const [idDocTypeValue, setIdDocType] = React.useState(null);
    const [idDocValue, setIdDoc] = React.useState(null);
    // const [bankValue, setBank] = React.useState(null);
    // const [referenceValue, setReference] = React.useState(null);
    const idDocType = React.useRef(null);
    const idDoc = React.useRef(null);
    const bank = React.useRef(null);
    const reference = React.useRef(null);
    const verifyDataInmediate = () => {
        if(idDocType==null || idDocType==undefined || idDocType=="" || idDocType=="null"){
            msgWarningBody.innerText="Debe ingresar el tipo de documento";
            $("#msgWarning").modal("show");
            return;
        }
        if (idDoc==null || idDoc==undefined || idDoc=="") {
            msgWarningBody.innerText="Debe ingresar el número de documento";
            $("#msgWarning").modal("show");
            return;
        }
        if(bank==null || bank==undefined || bank=="" || bank=="null"){
            msgWarningBody.innerText="Debe seleccionar el banco de origen";
            $("#msgWarning").modal("show");
            return;
        }
        if(reference==null || reference==undefined || reference=="" || reference=="null"){
            msgWarningBody.innerText="Debe ingresar el número de referencia";
            $("#msgWarning").modal("show");
            return;
        }
    }
    const clean = () => { 
        setIdDoc("");
        setIdDocType("");
        setPayerIdDoc("");
        setPrefixPhone("");
        setPayerPhone("");
        setBank("");
        setReference("");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", { className: "row", style: { marginTop: '20px' } },
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "id_doc_type",
                        name: "id_doc_type",
                        required: true,
                        value: idDocTypeValue,
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
                            id: "idDocInmediate",
                            name: "idDocInmediate",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: idDocValue,
                            onChange: (e) => setIdDoc(e.currentTarget.value)
                        }),
                        React.createElement("label", { htmlFor: "idDocInmediate",className: "font-regular" }, "Nro. documento")
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
                        value: bankValue,
                        onChange: (e) => {
                            setBank(e.currentTarget.value);
                            // setTooltip(e.currentTarget.value);
                        }
                    },
                        allBanks().map((item, index) => (
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.name)
                        ))
                    ),
                    React.createElement("label", { htmlFor: `banco_selected`,className: "font-regular" }, "Banco a pagar")
                ),
            ),
            React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("input", {
                        type: "text",
                        className: "form-control phone",
                        onKeyPress: (e) => keypressNumeros(e),
                        inputMode: "numeric",
                        id: "reference",
                        name: "reference",
                        maxLength: "7",
                        value: referenceValue,
                        onChange: (e) => setReference(e.currentTarget.value)
                    }),
                    React.createElement("label", { htmlFor: "reference",className: "font-regular" }, "Referencia")
                )
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'left' } },
                commerceIdDoc && React.createElement("label", { className: "font-bold" },
                    `Rif: `, 
                    React.createElement("span", { className: "font-regular" }, commerceIdDoc)
                ),
                collectorName && React.createElement("label", { className: "font-bold" },
                    `Comercio: `, 
                    React.createElement("span", { className: "font-regular" }, collectorName)
                )
            )
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
                    onClick: () => verifyDataInmediate('PAY')
                }, "Pagar")
            )
        ),
    );
}