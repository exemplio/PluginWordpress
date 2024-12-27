const MobilePayment = ({ metodoColeccion }) => {
    let msgErrorBody = document.getElementById("msgErrorBody");
    let msgWarningBody = document.getElementById("msgWarningBody");
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [payerIdDocValue, setPayerIdDoc] = React.useState(null);
    const [prefixPhoneValue, setPrefixPhone] = React.useState("414");
    const [phoneP2PValue, setPhoneP2P] = React.useState(null);
    const [bankValue, setBank] = React.useState(null);
    const [referenceP2PValue, setP2PReference] = React.useState(null);
    metodoColeccion=metodoColeccion[0];
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
        if(prefixPhoneValue==null || prefixPhoneValue==undefined || prefixPhoneValue=="" || prefixPhoneValue=="null"){
            msgWarningBody.innerText="Debe ingresar el código de area del teléfono";
            $("#msgWarning").modal("show");
            return;
        }
        if(phoneP2PValue==null || phoneP2PValue==undefined || phoneP2PValue=="" || phoneP2PValue=="null"){
            msgWarningBody.innerText="Debe ingresar el número del teléfono";
            $("#msgWarning").modal("show");
            return;
        }else{
            var phone_p2p= phoneP2PValue.replaceAll('-','');             
            if(phone_p2p.length!=7){
                msgWarningBody.innerText="El número del teléfono esta incompleto";
                $("#msgWarning").modal("show");
                return;
            }else{
                if(!utils_keyNumber(phone_p2p)){
                    msgWarningBody.innerText="El número del teléfono sólo acepta números";
                    $("#msgWarning").modal("show");
                    return;
                }
            }
        }
        if(bankValue==null || bankValue==undefined || bankValue=="" || bankValue=="null"){
            msgWarningBody.innerText="Debe seleccionar el banco de origen";
            $("#msgWarning").modal("show");
            return;
        }
        if(referenceP2PValue==null || referenceP2PValue==undefined || referenceP2PValue=="" || referenceP2PValue=="null"){
            msgWarningBody.innerText="Debe ingresar el número de referencia";
            $("#msgWarning").modal("show");
            return;
        }
        jsonTosend= {            
            product_name: metodoColeccion?.product_name,
            collect_method_id: metodoColeccion?.id,
            // amount: 10,
            bank_account_id: metodoColeccion?.bank_account_id,
            payment: {
                payer_id_doc: payerIdDocValue,
                payer_phone: phoneP2PValue,
                reference: referenceP2PValue,
                // amount: 10
            }
        }      
        $("#msgConfirmP2P").modal("show");
    }
    const clean = () => { 
        setPhoneP2P("");
        setIdDocType("V");
        setPayerIdDoc("");
        setPrefixPhone("414");
        setPhoneP2P("");
        setBank("");
        setP2PReference("");
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
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "prefix_phone",
                        name: "prefix_phone",
                        required: true,
                        value: prefixPhoneValue,
                        onChange: (e) => setPrefixPhone(e.currentTarget.value)
                    },
                        getPrefixArea().map((item, index) => (
                            React.createElement("option", { key: index, value: item.value }, item.to_show)
                        ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "text",
                            maxLength: "7",
                            className: "form-control",
                            inputMode: "numeric",
                            id: "phoneP2P",
                            name: "phoneP2P",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: phoneP2PValue,
                            onChange: (e) => setPhoneP2P(e.currentTarget.value)
                        }),
                        React.createElement("label", { htmlFor: "phoneP2P",className: "font-regular" }, "Nro. Teléfono")
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
                    React.createElement("option", { value: "", disabled: true, selected: true }, ""),
                        allBanks().map((item, index) => (
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.name)
                        ))
                    ),
                    React.createElement("label", { htmlFor: "bank", className: "d-none d-sm-inline-block font-regular" }, "Banco pagador"),
                    React.createElement("label", { htmlFor: "bank", className: "d-sm-none font-regular" }, "Banco pagador")
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("input", {
                        type: "text",
                        className: "form-control phone",
                        onKeyPress: (e) => keypressNumeros(e),
                        inputMode: "numeric",
                        id: "reference",
                        name: "reference",
                        maxLength: "15",
                        value: referenceP2PValue,
                        onChange: (e) => setP2PReference(e.currentTarget.value)
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
        React.createElement('div', { id:"msgConfirmP2P", className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document' },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgConfirmP2P").modal("hide")}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, '¿ Estás seguro que deseas procesar la transacción P2P por un monto de:>Bs.'+ parseAmount('amount'))
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {$("#msgConfirmP2P").modal("hide")},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => sendPayment('msgConfirmP2P',metodoColeccion),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
}