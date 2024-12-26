const InmediateTransfer = () => { 
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [payerIdDocValue, setPayerIdDoc] = React.useState(null);
    const [bankValue, setBank] = React.useState(null);
    const [referenceValue, setReference] = React.useState(null);
    const verifyDataP2P = () => {
        if(idDocTypeValue==null || idDocTypeValue==undefined || idDocTypeValue=="" || idDocTypeValue=="null"){
            msgWarningBody.innerText="Debe ingresar el tipo de documento";
            $("#msgWarning").modal("show");
            return;
        }
        if(payerIdDocValue==null || payerIdDocValue==undefined || payerIdDocValue=="" || payerIdDocValue=="null"){
            msgWarningBody.innerText="Debe ingresar el número de documento";
            $("#msgWarning").modal("show");
            return;
        }
        if(bankValue==null || bankValue==undefined || bankValue=="" || bankValue=="null"){
            msgWarningBody.innerText="Debe seleccionar el banco de origen";
            $("#msgWarning").modal("show");
            return;
        }
        if(referenceValue==null || referenceValue==undefined || referenceValue=="" || referenceValue=="null"){
            msgWarningBody.innerText="Debe ingresar el número de referencia";
            $("#msgWarning").modal("show");
            return;
        }
        $("#msgConfirmIT").modal("show");
    }
    const clean = () => { 
        setIdDocType("V");
        setPayerIdDoc("");
        setBank("");
        setReference("");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
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
                            id: "id_doc",
                            name: "id_doc",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: payerIdDocValue,
                            onChange: (e) => setPayerIdDoc(e.currentTarget.value)
                        }),
                        React.createElement("label", { htmlFor: "id_doc",className: "font-regular" }, "Nro. documento")
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        name: "bank",
                        style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
                        value: bankValue,
                        onChange: (e) => setBank(e.currentTarget.value)
                    },
                        allBanks().map((item, index) => (
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.name)
                        ))
                    ),
                    React.createElement("label", { htmlFor: "bank", className: "d-none d-sm-inline-block font-regular" }, "Banco pagador"),
                    React.createElement("label", { htmlFor: "bank", className: "d-sm-none font-regular" }, "Banco pagador")
                )
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
                        maxLength: "15",
                        value: referenceValue,
                        onChange: (e) => setReference(e.currentTarget.value)
                    }),
                    React.createElement("label", { htmlFor: "reference",className: "font-regular" }, "Referencia")
                )
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
                    onClick: () => verifyDataP2P('PAY')
                }, "Pagar")
            )
        ),
        React.createElement('div', { id:"msgConfirmIT", className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document' },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgConfirmIT").modal("hide")}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, '¿ Estás seguro que deseas procesar la transacción IT por un monto de:>Bs.'+ parseAmount('amount'))
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {$("#msgConfirmIT").modal("hide")},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => sendPayment('msgConfirmIT'),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    ),
                ),
            ),
        ),
    );
}