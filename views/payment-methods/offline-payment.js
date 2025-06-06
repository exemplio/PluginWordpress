const OfflineTransfer = ({ metodoColeccion, banco, totalAmount, paymentFun, isCollectMethod }) => {
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [payerIdDocValue, setPayerIdDoc] = React.useState(null);
    const [bankValue, setBank] = React.useState(null);
    const [referenceValue, setReference] = React.useState(null);
    const [receptorBankValue, setReceptorBank] = React.useState(null);
    const [bankImage, setBankImage] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [bankCode, setBankCode] = React.useState("");
    const [rifValue, setRifValue] = React.useState("");
    const [commerceValue, setCommerceValue] = React.useState("");
    const [accountNValue, setAccountNValue] = React.useState("");
    const [sendCollectMethod, setSendCollectMethod] = React.useState("");
    let getReceptorBank = [];
    if (!(metodoColeccion == null || metodoColeccion == undefined || metodoColeccion == "")) {
        metodoColeccion.map((item) => {
            getReceptorBank.push(item);            
        })
        React.useEffect(() => {
            changeBank(getReceptorBank[0]?.bank_name!=undefined ? getReceptorBank[0]?.bank_name : getReceptorBank[0]?.bank_info?.name);
        }, []);
    }
    const changeBank = (value) => {
        getReceptorBank.map((item) => {
            if (Boolean(item?.bank_info?.name)) {
                if (item?.bank_info?.name == value) {
                    setBankImage(php_var?.get_static+item?.bank_info?.thumbnail);
                    setBankName(item?.bank_info?.name);
                    setBankCode(item?.bank_info?.code);
                    setRifValue(item?.credential_json?.collector_id_doc);
                    setCommerceValue(item?.credential_json?.collector_name);
                    setAccountNValue(item?.credential_json?.collector_bank_account);
                    setReceptorBank(item?.bank_info?.name);
                    item.typeToSend = item?.product_name;
                    setSendCollectMethod(item);
                }                
            }else if(item?.bank_name == value){
                setBankImage(php_var?.get_static+item?.bank_thumbnail);
                setBankName(item?.bank_info?.name);
                setBankCode(item?.bank_info?.code);
                setReceptorBank(item?.bank_info?.name);
                setRifValue(item?.credential_json?.collector_id_doc);
                setCommerceValue(item?.credential_json?.collector_name);
                setAccountNValue(item?.credential_json?.collector_bank_account);
                item.typeToSend = "MOBILE_PAYMENT";
                setSendCollectMethod(item);
            }
        });        
    } 
    const verifyDataP2P = () => {
        jsonTosend.payment={};
        if(idDocTypeValue==null || idDocTypeValue==undefined || idDocTypeValue=="" || idDocTypeValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            openModal('msgWarning');
            return;
        }else{
            if(payerIdDocValue==null || payerIdDocValue==undefined || payerIdDocValue=="" || payerIdDocValue=="null"){
                sendModalValue("msgWarning","Debe ingresar el número de documento");
                openModal('msgWarning');
                return;
            }else{
                jsonTosend.payment.payer_id_doc = `${idDocTypeValue}${addZeros(payerIdDocValue, 9)}`;
            }        
        }
        if(bankValue==null || bankValue==undefined || bankValue=="" || bankValue=="null"){
            sendModalValue("msgWarning","Debe seleccionar el banco de origen");
            openModal('msgWarning');
            return;
        }else{
            jsonTosend.payment.payer_bank_code = bankCode;
        }
        if(referenceValue==null || referenceValue==undefined || referenceValue=="" || referenceValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número de referencia");
            openModal('msgWarning');
            return;
        }else{
            jsonTosend.payment.reference = referenceValue;
        }
        if (isCollectMethod) {            
            jsonTosend.collect_method_id=sendCollectMethod?.id;
        }else{
            jsonTosend.credential_id=sendCollectMethod?.id;
        }
        jsonTosend.product_name = sendCollectMethod?.product_name;
        jsonTosend.amount = totalAmount;
        jsonTosend.payment.bank_account_id = sendCollectMethod?.bank_account_id;
        jsonTosend.payment.amount = totalAmount;
        openModal("msgConfirmOfflinePay");
    }
    const clean = () => { 
        setIdDocType("V");
        setPayerIdDoc("");
        setBank("");
        setReference("");
        changeBank(getReceptorBank[0]?.bank_name!=undefined ? getReceptorBank[0]?.bank_name : getReceptorBank[0]?.bank_info?.name);
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
                React.createElement("img", { src: bankImage, style: { objectFit: 'contain', height: "40px" } }),
                React.createElement("h5", { className: "font-bold", style: { textTransform: 'uppercase' } }, bankName)
            ),
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
                        React.createElement("label", { htmlFor: "id_doc",className: "font-regular" }, "Documento")
                    )
                )
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        name: "receptor_bank",
                        style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
                        value: receptorBankValue,
                        onChange: (e) => {
                            changeBank(e.currentTarget.value),
                            setReceptorBank(e.currentTarget.value)}
                    },
                    React.createElement("option", { value: "", disabled: true, selected: true }, ""),
                        getReceptorBank.map((item, index) => (
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item?.bank_info?.name!=undefined ? item?.bank_info?.name : item?.bank_name)
                        ))
                    ),
                    React.createElement("label", { htmlFor: "receptor_bank", className: "d-none d-sm-inline-block font-regular" }, "Banco receptor"),
                    React.createElement("label", { htmlFor: "receptor_bank", className: "d-sm-none font-regular" }, "Banco receptor")
                ),
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
                ),
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12", style: { marginBottom: '15px' } },
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
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("b", { className: "font-regular", style: { margin: 0 } }, "Rif: "),
            React.createElement("span", { className: "font-regular", style: { margin: 0 } }, rifValue),
            React.createElement("br"),
            React.createElement("b", { className: "font-regular", style: { margin: 0 } }, "Comercio: "),
            React.createElement("span", { className: "font-regular", style: { margin: 0 } }, commerceValue),
            React.createElement("br"),
            React.createElement("b", { className: "font-regular", style: { margin: 0 } }, "Nro. cuenta: "),
            React.createElement("span", { className: "font-regular", style: { margin: 0 } }, accountNValue),
        ),
        React.createElement("div", { className: "row col-lg-12 offset-md-12 col-md-12 col-sm-12 col-12 mt-2 reportButtons", style: { justifyContent: 'right', display: 'flex', marginTop: '15px' } },
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-lg button-clean font-regular",
                    style: { margin: '10px', fontSize: '13px !important', width: '100%' },
                    onClick: () => clean()
                }, "Limpiar")
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '13px !important', width: '100%' },
                    onClick: () => verifyDataP2P('PAY')
                }, "Pagar")
            )
        ),
        React.createElement('div', { id:"msgConfirmOfflinePay", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgConfirmOfflinePay')}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, `¿Estás seguro que deseas procesar la transacción por un monto de: Bs. ${parseAmount(totalAmount)}?`)
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {closeModal('msgConfirmOfflinePay')},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun('msgConfirmOfflinePay',sendCollectMethod),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    ),
                ),
            ),
        ),
    );
}