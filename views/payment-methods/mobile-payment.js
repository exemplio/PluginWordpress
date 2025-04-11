const MobilePayment = ({ metodoColeccion, totalAmount, paymentFun, displayingEmail }) => {
    let actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = String(actualDate.getMonth() + 1).padStart(2, '0');
    let day = String(actualDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [payerIdDocValue, setPayerIdDoc] = React.useState(null);
    const [prefixPhoneValue, setPrefixPhone] = React.useState("414");
    const [phoneP2PValue, setPhoneP2P] = React.useState(null);
    const [receptorBankValue, setReceptorBank] = React.useState(null);
    const [bankValue, setBank] = React.useState(null);
    const [referenceP2PValue, setP2PReference] = React.useState(null);
    const [dateP2PValue, setP2Pdate] = React.useState(formattedDate);
    const [displayingRif, setDisplayingRif] = React.useState("");
    const [displayingPhone, setDisplayingPhone] = React.useState("");
    const [sendCollectMethod, setSendCollectMethod] = React.useState("");
    const [bankImage, setBankImage] = React.useState("");
    const [referenceLength, setReferenceLength] = React.useState("");
    let getReceptorBank = [];
    if (!(metodoColeccion == null || metodoColeccion == undefined || metodoColeccion == "")) {
        metodoColeccion.map((item) => {
            getReceptorBank.push(item);
        });
        React.useEffect(() => {
            changeBank(getReceptorBank[0]?.bank_name!=undefined ? getReceptorBank[0]?.bank_name : getReceptorBank[0]?.bank_info?.name);
        }, []);
    }
    const changeBank = (value) => {
        getReceptorBank.map((item) => {
            if (Boolean(item?.bank_info?.name)) {
                if (item?.bank_info?.name == value) {
                    setDisplayingRif(item?.id_doc);
                    setDisplayingPhone(item?.phone);
                    setBankImage(php_var?.get_static+item?.bank_info?.thumbnail);
                    setReceptorBank(item?.bank_info?.name);
                    item.typeToSend = item?.product_name;
                    setSendCollectMethod(item);
                    switch (item?.credential_service) {
                        case "R4_MOBILE_PAYMENT_SEARCH":
                            setReferenceLength(8);                
                            break;                
                        default:
                            setReferenceLength(4);                
                            break;
                    }
                }                
            }else if(item?.bank_name == value){
                setDisplayingRif(item?.collector_id_doc);
                setDisplayingPhone(item?.collector_phone);
                setBankImage(php_var?.get_static+item?.bank_thumbnail);
                item.typeToSend = item?.payment_method;
                setSendCollectMethod(item);
                setReceptorBank(item?.bank_name);
                switch (item?.service) {
                    case "R4_MOBILE_PAYMENT_SEARCH":
                        setReferenceLength(8);                
                        break;                
                    default:
                        setReferenceLength(4);                
                        break;
                }
            }
        });        
    }
    const verifyDataP2P = () => {
        if(idDocTypeValue==null || idDocTypeValue==undefined || idDocTypeValue=="" || idDocTypeValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            openModal('msgWarning');
            return;
        }
        if(payerIdDocValue==null || payerIdDocValue==undefined || payerIdDocValue=="" || payerIdDocValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número de documento");
            openModal('msgWarning');
            return;
        }else{
            setPayerIdDoc(payerIdDocValue+"".trim().toUpperCase());
            if(idDocTypeValue!="P"){
                if(!utils_keyNumber(payerIdDocValue)){
                    sendModalValue("msgWarning","El formato del número de documento es incorrecto");
                    openModal('msgWarning');
                    return;
                }
            }
        }
        if(prefixPhoneValue==null || prefixPhoneValue==undefined || prefixPhoneValue=="" || prefixPhoneValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el código de area del teléfono");
            openModal('msgWarning');
            return;
        }
        if(phoneP2PValue==null || phoneP2PValue==undefined || phoneP2PValue=="" || phoneP2PValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número del teléfono");
            openModal('msgWarning');
            return;
        }else{
            var phone_p2p= phoneP2PValue.replaceAll('-','');             
            if(phone_p2p.length!=7){
                sendModalValue("msgWarning","El número del teléfono esta incompleto");
                openModal('msgWarning');
                return;
            }else{
                if(!utils_keyNumber(phone_p2p)){
                    sendModalValue("msgWarning","El número del teléfono sólo acepta números");
                    openModal('msgWarning');
                    return;
                }
            }
        }
        if(receptorBankValue==null || receptorBankValue==undefined || receptorBankValue=="" || receptorBankValue=="null"){
            sendModalValue("msgWarning","Debe seleccionar el banco receptor");
            openModal('msgWarning');
            return;
        }
        if(bankValue==null || bankValue==undefined || bankValue=="" || bankValue=="null"){
            sendModalValue("msgWarning","Debe seleccionar el banco emisor");
            openModal('msgWarning');
            return;
        }
        if(dateP2PValue==null || dateP2PValue==undefined || dateP2PValue=="" || dateP2PValue=="null"){
            sendModalValue("msgWarning","Debe ingresar la fecha de emisión");
            openModal('msgWarning');
            return;
        }else{
            if (dateP2PValue > formattedDate) {
                sendModalValue("msgWarning","No puedes ingresar fechas futuras");
                openModal('msgWarning');
                return;
            }
        }
        if(referenceP2PValue==null || referenceP2PValue==undefined || referenceP2PValue=="" || referenceP2PValue=="null"){
            sendModalValue("msgWarning","Debe ingresar el número de referencia");
            openModal('msgWarning');
            return;
        }else{
            if(referenceP2PValue.length<4){
                sendModalValue("msgWarning","El número de referencia debe ser de 4 digitos");
                openModal('msgWarning');
                return;
            }
        }
        jsonTosend= {            
            collect_method_id: sendCollectMethod?.id,
            amount: totalAmount,
            payment: {
                collect_method_id: sendCollectMethod?.id,
                amount: totalAmount,
                payer_id_doc: `${idDocTypeValue}${addZeros(payerIdDocValue, 9)}`,
                payer_phone: `${prefixPhoneValue}${phoneP2PValue}`,
                reference: referenceP2PValue,
                date: dateP2PValue,
            }
        }
        openModal("msgConfirmP2P");
    }
    const clean = () => { 
        setPhoneP2P("");
        setIdDocType("V");
        setPayerIdDoc("");
        setPrefixPhone("414");
        setPhoneP2P("");
        setBank("");
        setP2PReference("");
        if (referenceLength<=4){setP2Pdate("");}        
        setReceptorBank("");
        changeBank(getReceptorBank[0]?.bank_name!=undefined ? getReceptorBank[0]?.bank_name : getReceptorBank[0]?.bank_info?.name);
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
            React.createElement("h4", { className: "font-bold", style: { textTransform: 'uppercase' } }, "REALIZAR PAGO MÓVIL A:"),
            React.createElement("img", { src: bankImage, style: { objectFit: 'contain', height: "40px" } }),
            React.createElement("h6", { className: "font-bold", style: { textTransform: 'uppercase' } }, "Nro. Teléfono: " + `0${displayingPhone}`),
            React.createElement("h6", { className: "font-bold", style: { textTransform: 'uppercase' } }, "RIF:"+displayingRif),
            React.createElement("label", { className: "font-regular" }, "Si tiene inconvenientes para validar su pago, por favor envíe una captura de pantalla junto con su RIF al siguiente correo electrónico: "+ displayingEmail),
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
                        React.createElement("label", { htmlFor: "id_doc",className: "font-regular" }, "Documento")
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
                        React.createElement("label", { htmlFor: "phoneP2P",className: "font-regular" }, "Teléfono")
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
                            React.createElement("option", { key: index, value: item.value, style: { fontSize: '14px' }, className: "font-regular" }, item.name.toUpperCase())
                        ))
                    ),
                    React.createElement("label", { htmlFor: "bank", className: "d-none d-sm-inline-block font-regular" }, "Banco pagador"),
                    React.createElement("label", { htmlFor: "bank", className: "d-sm-none font-regular" }, "Banco pagador")
                )
            ),
            referenceLength!=8 && React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("input", {
                        type: "date",
                        className: "form-control phone",
                        onKeyPress: (e) => keypressNumeros(e),
                        id: "date",
                        name: "date",
                        maxLength: "4",
                        value: dateP2PValue,
                        onChange: (e) => setP2Pdate(e.currentTarget.value)
                    }),
                    React.createElement("label", { htmlFor: "date",className: "font-regular" }, "Fecha de emisión")
                )
            ),
            React.createElement("div", { className: referenceLength>4 ? "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" : "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("input", {
                        type: "text",
                        className: "form-control phone",
                        onKeyPress: (e) => keypressNumeros(e),
                        inputMode: "numeric",
                        id: "reference",
                        name: "reference",
                        maxLength: referenceLength,
                        value: referenceP2PValue,
                        onChange: (e) => setP2PReference(e.currentTarget.value)
                    }),
                    React.createElement("label", { htmlFor: "reference",className: "font-regular" }, referenceLength>4 ? "Referencia" : "Ref. (Últ. 4 dígitos)")
                )
            ),
        ),
        React.createElement("div", { className: "row col-lg-12 offset-md-12 col-md-12 col-sm-12 col-12 mt-2 reportButtons", style: { justifyContent: 'right', display: 'flex', marginTop: '15px' } },
            // React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            //     React.createElement("label", { className: 'font-bold', style: {marginRight:'10px'} }, "Procesado por: "),
            //     React.createElement("img", { src: bankImage, className: 'mini-size-img', height: "40px", style: { objectFit: 'contain' } }),
            // ),
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
        React.createElement('div', { id:"msgConfirmP2P", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgConfirmP2P')}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, `¿Estás seguro que deseas procesar la transacción por un monto de: Bs. ${parseAmount(totalAmount)}?`)
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {closeModal('msgConfirmP2P')},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun('msgConfirmP2P',sendCollectMethod),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
}