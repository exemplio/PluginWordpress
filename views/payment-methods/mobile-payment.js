const MobilePayment = ({ metodoColeccion,banco,paymentFun  }) => {
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [payerIdDocValue, setPayerIdDoc] = React.useState(null);
    const [prefixPhoneValue, setPrefixPhone] = React.useState("414");
    const [phoneP2PValue, setPhoneP2P] = React.useState(null);
    const [bankValue, setBank] = React.useState(null);
    const [referenceP2PValue, setP2PReference] = React.useState(null);
    let bank_image = php_var.bancaribe;
    metodoColeccion= !(metodoColeccion== null || metodoColeccion== undefined) ? metodoColeccion[0] : null;    
    const verifyDataP2P = () => {
        if(idDocTypeValue==null || idDocTypeValue==undefined || idDocTypeValue=="" || idDocTypeValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            $("#msgWarning").modal("show");
            return;
        }
        if(payerIdDocValue==null || payerIdDocValue==undefined || payerIdDocValue=="" || payerIdDocValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número de documento");
            $("#msgWarning").modal("show");
            return;
        }
        if(prefixPhoneValue==null || prefixPhoneValue==undefined || prefixPhoneValue=="" || prefixPhoneValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el código de area del teléfono");
            $("#msgWarning").modal("show");
            return;
        }
        if(phoneP2PValue==null || phoneP2PValue==undefined || phoneP2PValue=="" || phoneP2PValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número del teléfono");
            $("#msgWarning").modal("show");
            return;
        }else{
            var phone_p2p= phoneP2PValue.replaceAll('-','');             
            if(phone_p2p.length!=7){
                sendModalValue("msgWarning","El número del teléfono esta incompleto");
                $("#msgWarning").modal("show");
                return;
            }else{
                if(!utils_keyNumber(phone_p2p)){
                    sendModalValue("msgWarning","El número del teléfono sólo acepta números");
                    $("#msgWarning").modal("show");
                    return;
                }
            }
        }
        if(bankValue==null || bankValue==undefined || bankValue=="" || bankValue=="null"){
            sendModalValue("msgWarning","Debe seleccionar el banco de origen");
            $("#msgWarning").modal("show");
            return;
        }
        if(referenceP2PValue==null || referenceP2PValue==undefined || referenceP2PValue=="" || referenceP2PValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número de referencia");
            $("#msgWarning").modal("show");
            return;
        }
        jsonTosend= {            
            collect_method_id: metodoColeccion?.id,
            amount: php_var.cart_total,
            payment: {
                collect_method_id: metodoColeccion?.id,
                amount: php_var.cart_total,
                payer_id_doc: `${idDocTypeValue}${addZeros(payerIdDocValue, 9)}`,
                payer_phone: `${prefixPhoneValue}${phoneP2PValue}`,
                reference: referenceP2PValue,
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
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
            React.createElement("img", { src: bank_image, style: { objectFit: 'contain', height: "40px" } }),
            React.createElement("h5", { className: "font-bold", style: { textTransform: 'uppercase' } }, banco),
            React.createElement("h4", { className: "font-bold", style: { textTransform: 'uppercase' } }, "REALIZAR PAGO MÓVIL A:"),
            React.createElement("h6", { className: "font-bold", style: { textTransform: 'uppercase' } }, "Número de teléfono:" + "(414) 319-6228"),
            React.createElement("h6", { className: "font-bold", style: { textTransform: 'uppercase' } }, "RIF: J403399646"),
            React.createElement("label", { className: "font-regular" }, "Si tiene problemas para validar su pago, pase el capture con su RIF al siguiente correo: operaciones@paguetodo.com"),
        ),
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center', marginTop: '40px' } },
            React.createElement("h4", { className: "font-bold", style: { textTransform: 'uppercase' } }, "COLOQUE LOS DATOS DEL PAGO MÓVIL:"),
        ),
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "doc_type_p2p",
                        name: "doc_type_p2p",
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
            React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
                React.createElement("label", { className: 'font-bold', style: {marginRight:'10px'} }, "Procesado por: "),
                React.createElement("img", { src: bank_image, className: 'mini-size-img', height: "40px", style: { objectFit: 'contain' } }),
            ),
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
        React.createElement('div', { id:"msgConfirmP2P", className: 'modal fade bd-example-modal-sm', 'data-bs-backdrop':'static', 'data-keyboard':'false', style: { overflow: 'hidden', marginTop: '60px' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document' },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgConfirmP2P").modal("hide")}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, '¿ Estás seguro que deseas procesar la transacción por un monto de: Bs.'+ parseAmount(php_var.cart_total))
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {$("#msgConfirmP2P").modal("hide")},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun('msgConfirmP2P',metodoColeccion),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
}