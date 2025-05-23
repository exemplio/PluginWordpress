const C2pPayment = ({ metodoColeccion,banco, totalAmount, paymentFun, isCollectMethod }) => {  
    let bank_image = php_var.bancaribe;
    const [ojitoOperacion, setOjitoOperacion] = React.useState(eyeSolid);
    const [idDocTypeValue, setIdDocType] = React.useState("V");
    const [idDocC2pValue, setIdDocC2p] = React.useState(null);
    const [prefixPhoneValue, setPrefixPhone] = React.useState("414");
    const [phoneC2PValue, setPhoneC2P] = React.useState(null);
    const [bancoSelectedValue, setBancoSelected] = React.useState(null);
    const [otpValue, setOtp] = React.useState(null);
    const [receptorBankValue, setReceptorBank] = React.useState(null);
    const [bankImage, setBankImage] = React.useState("");
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
                    setReceptorBank(item?.bank_info?.name);
                    item.typeToSend = item?.product_name;
                    setSendCollectMethod(item);
                }                
            }else if(item?.bank_name == value){
                setBankImage(php_var?.get_static+item?.bank_thumbnail);
                item.typeToSend = "MOBILE_PAYMENT";
                setSendCollectMethod(item);
                setReceptorBank(item?.bank_name);
            }
        });        
    } 
    //Funcion para cambiar un input de type password a text
    const changeTypeInputShow = (data,variable,setParam) => {
		if(!(data==null || data==undefined || data=="")){
			try{
				if(variable!=null){
					if(variable.includes("images/eye-solid.svg")){
						setParam(eyeSlash);
						document.getElementById(data).type="text";
					}else{
						setParam(eyeSolid);
						document.getElementById(data).type="password";
					}
				}
			}catch(er){
			}
		}
    };
    const verifyDataC2P = () => {
        jsonTosend.payment={};
        if (idDocTypeValue==null || idDocTypeValue==undefined || idDocTypeValue=="" || idDocTypeValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            openModal('msgWarning');
            return;
        }else{
            if (idDocC2pValue==null || idDocC2pValue==undefined || idDocC2pValue=="" || idDocC2pValue=="null") {
                sendModalValue("msgWarning","Debe ingresar el número de documento");
                openModal('msgWarning');
                return;
            }else{
                setIdDocC2p(idDocC2pValue+"".trim().toUpperCase());
                if(idDocTypeValue!="P"){
                    if(!utils_keyNumber(idDocC2pValue)){
                        sendModalValue("msgWarning","El formato del número de documento es incorrecto");
                        openModal('msgWarning');
                        return;
                    }
                }
                jsonTosend.payment.payer_id_doc=`${idDocTypeValue}${addZeros(idDocC2pValue, 9)}`;
            }            
        }
        if (prefixPhoneValue==null || prefixPhoneValue==undefined || prefixPhoneValue=="" || prefixPhoneValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el prefijo del teléfono");
            openModal('msgWarning');
            return;
        }else{
            if (phoneC2PValue==null || phoneC2PValue==undefined || phoneC2PValue=="" || phoneC2PValue=="null") {
                sendModalValue("msgWarning","Debe ingresar el número del teléfono");
                openModal('msgWarning');
                return;
            }else{
                var phone=(phoneC2PValue+"").trim().replace("-","");
                if(phone.length!=7){
                    sendModalValue("msgWarning","El número del teléfono esta incompleto");
                    openModal('msgWarning');
                    return;
                }else{
                    if(!utils_keyNumber(phone)){
                        sendModalValue("msgWarning","El número del teléfono sólo acepta números");
                        openModal('msgWarning');
                        return;
                    }else{
                        jsonTosend.payment.payer_phone=`${prefixPhoneValue}${phone}`;
                    }
                }
            }
        }
        if (bancoSelectedValue==null || bancoSelectedValue==undefined || bancoSelectedValue=="" || bancoSelectedValue=="null") {
            sendModalValue("msgWarning","Debe seleccionar el banco pagador");
            openModal('msgWarning');
            return;            
        }else{
            jsonTosend.payment.payer_bank_code=bancoSelectedValue;
        }
        if (otpValue==null || otpValue==undefined || otpValue=="" || otpValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el OTP");
            openModal('msgWarning');
            return;
        }else{
            setOtp((otpValue+"").trim());
            if (otpValue.length<4) {
                sendModalValue("msgWarning","El OTP esta incompleto");
                openModal('msgWarning');
                return;
            }else{
                jsonTosend.payment.otp=otpValue;   
            }
        }
        if (isCollectMethod) {            
            jsonTosend.collect_method_id=sendCollectMethod?.id;
        }else{
            jsonTosend.credential_id=sendCollectMethod?.id;
        }
        jsonTosend.amount=totalAmount;
        jsonTosend.payment.amount=totalAmount;
        openModal("msgConfirmC2P");
    };
    const setTooltip= (banco) => {
        let aux=findBankInfo(banco)
        if(Boolean(aux)){
            let texto=aux.tooltip;
            if(Boolean(texto)){
                document.getElementById("tooltip-"+metodoColeccion?.product_name).innerHTML=texto;
            }else{
                document.getElementById("tooltip-"+metodoColeccion?.product_name).innerHTML="";
            }
        }
    }
    const clean = () => { 
        setIdDocType("V");
        setIdDocC2p("");
        setPrefixPhone("414");
        setPhoneC2P("");
        setBancoSelected("");
        setOtp("");
        changeBank(getReceptorBank[0]?.bank_name!=undefined ? getReceptorBank[0]?.bank_name : getReceptorBank[0]?.bank_info?.name);
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{marginTop:'15px'}},
            React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
                React.createElement("img", { src: bankImage, style: { objectFit: 'contain', height: "40px" } }),
                React.createElement("h5", { className: "font-bold", style: { textTransform: 'uppercase' } }, banco)
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "doc_type_c2p",
                        name: "doc_type_c2p",
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
                            id: "idDocC2p",
                            name: "idDocC2p",
                            onKeyPress: (e) => keypressNumeros(e),
                            style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                            value: idDocC2pValue,
                            onChange: (e) => setIdDocC2p(e.currentTarget.value),
                            // onBlur: () => verifyDoc(idDoc)
                        }),
                        React.createElement("label", { htmlFor: "idDocC2p",className: "font-regular" }, "Documento")
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
                        React.createElement("label", { htmlFor: "phone_c2p",className: "font-regular" }, "Teléfono")
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
                        className: "form-select",
                        id: `banco_selected_c2p`,
                        name: `banco_selected_c2p`,
                        required: true,
                        value: bancoSelectedValue,
                        // onClick: () => {setTooltip(bancoSelectedValue)},
                        onChange: (e) => {
                            setBancoSelected(e.currentTarget.value);
                            setTooltip(e.currentTarget.value);
                        }
                    },
                    React.createElement("option", { value: "", disabled: true, selected: true }, ""),
                        allBanks().map((item, index) => (
                            React.createElement("option", { key: index, value: item.code, style: { fontSize: '14px' }, className: "font-regular" }, item.name.toUpperCase())
                        ))
                    ),
                    React.createElement("label", { htmlFor: `banco_selected`,className: "font-regular" }, "Banco emisor")
                ),
            ),
            React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating", style: { width: 'calc(100% - 50px)' } },
                        React.createElement("input", {
                            type: "password",
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
                        React.createElement("label", { htmlFor: `otp`, className: "d-none d-sm-inline-block font-regular" }, "Token"),
                        React.createElement("label", { htmlFor: `otp`, className: "d-sm-none font-regular" }, "Token")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary",
                        style: { width: '50px' },
                        onClick: () => changeTypeInputShow('otp', ojitoOperacion, setOjitoOperacion)
                    },
                        React.createElement("img", { src: ojitoOperacion, height: "18px", width: "18px", alt: "Toggle visibility", style:{ margin: '0px' } })
                    ),
                ),
            ),
        ),
        // React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
        //     React.createElement("label", { className: 'font-bold', style: {marginRight:'10px'} }, "Procesado por: "),
        //     React.createElement("img", { src: bank_image, className: 'mini-size-img', height: "40px", style: { objectFit: 'contain' } }),
        // ),
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
                    onClick: () => verifyDataC2P('PAY')
                }, "Pagar")
            )
        ),
        React.createElement('div',{ className: 'row' },
            React.createElement('div', { className: 'col-xs-12 col-md-12 col-lg-12 mt-12 mt-2' },
                React.createElement('div', { id: `tooltip-${metodoColeccion?.product_name}` })
            )
        ),
        React.createElement('div', { id:"msgConfirmC2P", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgConfirmC2P')}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, `¿Estás seguro que deseas procesar la transacción por un monto de: Bs. ${parseAmount(totalAmount)}?`)
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {closeModal('msgConfirmC2P')},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun('msgConfirmC2P',sendCollectMethod),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
}