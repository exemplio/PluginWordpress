const InmediateTransfer = (idDocType,idDoc,referencia,bank,handleBankChange,commerceIdDoc,collectorName,clean) => { 
    const [idDocInmediate, setIdDocC2p] = React.useState(null); 
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", { className: "row", style: { marginTop: '20px' } },
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
                            id: "idDocInmediate",
                            name: "idDocInmediate",
                            onKeyPress: (e) => keypressNumbersInteger(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: idDocInmediate,
                            onChange: (e) => setIdDoc(e.target.value)
                        }),
                        React.createElement("label", { htmlFor: "idDocInmediate",className: "font-regular" }, "Nro. documento")
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        value: bank,
                        onChange: handleBankChange,
                        name: "bank",
                        style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }
                    },
                        // listBanks.map((item, index) => (
                        //     React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.to_show)
                        // ))
                    ),
                    React.createElement("label", { htmlFor: "bank", className: "d-none d-sm-inline-block font-regular" }, "Banco a pagar"),
                    React.createElement("label", { htmlFor: "bank", className: "d-sm-none font-regular" }, "Banco a pagar")
                )
            ),
            React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("input", {
                        type: "text",
                        className: "form-control phone",
                        onKeyPress: (e) => keypressNumbersInteger(e),
                        inputMode: "numeric",
                        id: "referencia",
                        name: "referencia",
                        maxLength: "7",
                        value: referencia,
                        onChange: (e) => setReferencia(e.target.value)
                    }),
                    React.createElement("label", { htmlFor: "referencia",className: "font-regular" }, "Referencia")
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