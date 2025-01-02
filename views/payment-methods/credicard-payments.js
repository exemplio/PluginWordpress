const CredicardPay = ({ metodoColeccion }) => {
    let credicard = myPluginImage.credicard;
    let visa = myPluginImage.visa;
    let maestro = myPluginImage.maestro;
    let venezuela = myPluginImage.venezuela;
    let bancaribe = myPluginImage.bancaribe;
    let mibanco = myPluginImage.mibanco;
    let bancrecer = myPluginImage.bancrecer;
    let bancamiga = myPluginImage.bancamiga;
    let banfanb = myPluginImage.banfanb;
    let tesoro = myPluginImage.tesoro;
    let bicentenario = myPluginImage.bicentenario;
    let bfc = myPluginImage.bfc;
    const [ojitoCcvValue, setOjitoCcv] = React.useState(eyeSolid);
    const [ojitoTarjetaValue, setOjitoTarjeta] = React.useState(eyeSolid);
    const [ojitoPinValue, setPinTarjeta] = React.useState(eyeSolid);
    const [cardHolderValue, setCardHolder] = React.useState(null);
    const [documentTypeValue, setDocumentType] = React.useState("V");
    const [idDocValue, setIdDoc] = React.useState(null);
    const [nroTarjetaValue, setNroTarjeta] = React.useState(null);
    const [errorTarjetaValue, setErrorTarjeta] = React.useState(null);
    const [expirationValue, setExpiration] = React.useState(null);
    const [ccvValue, setCcv] = React.useState(null);
    const [tarjetaValue, setTarjeta] = React.useState(null);
    const [tipoCuentaValue, setTipoCuenta] = React.useState("PRINCIPAL");
    const [pinValue, setPin] = React.useState(null);
    const [typePValue, setTypeP] = React.useState(null);
    const [numeroOriginalValue, setNumeroOriginal] = React.useState(null);
    const [modalValue, setModalValue] = React.useState("PRUEBA");
    const [verifyDisabled, setVerifyDisabled] = React.useState(false);
    const [showOtpCcr, setShowOtpCcr] = React.useState(false);
    const [showOtpBank, setShowOtpBank] = React.useState(false);
    const [showButtonSend, setShowButtonSend] = React.useState(false);
    const [tokenCcr, setTokenCcr] = React.useState(false);
    const [imagen, setImagen] = React.useState(false);
    const [bankName, setBankName] = React.useState(false);
    const [etiqueta, setEtiqueta] = React.useState(false);
    const expiracion = React.useRef(null);
    metodoColeccion= metodoColeccion!= null || undefined ? metodoColeccion[0] : null;
    React.useEffect(() => {
        if (modalValue=="PRUEBA") {
            $(document).ready(function() {
                $(`#expiration${metodoColeccion?.product_name}`).mask("00/00", {reverse: true});
            });                                    
        }
    }, []);

    const changeDoc = () => {
		let typeDoc = document.getElementById("documentType").value;
		if(typeDoc == "V" || typeDoc == "E" || typeDoc == "J" || typeDoc == "G"){
			setTypeP(false);
			// this.clean2();
		} else {
			setTypeP(true);
			// this.clean2();
		}
	}
    const getCardInfo = (tarjeta) => {
        if(!(tarjetaValue==null || tarjetaValue==undefined || tarjetaValue=="" || tarjetaValue=="null")){
            setTarjeta(tarjetaValue.replace(/\s+/g, ''));
            setTarjeta(tarjetaValue);
        }
        let result={};
        setShowOtpCcr(false);
        setShowOtpBank(false);
        setShowButtonSend(false);
        setTokenCcr(null);
        token=null; 
        phone=null;
		if(Boolean(tarjeta)){
			tarjeta=tarjeta+"".trim();
			if(tarjeta.length<13){
                sendModalValue("msgError","La tarjeta debe poseer al menos 13 dígitos");
                $("#msgError").modal("show");
				return;
			}
            if(!(tarjeta.indexOf("X")>-1)){
                setNumeroOriginal(tarjeta);                
                setNroTarjeta(enmascararTarjeta(tarjeta));
                setVerifyDisabled(true);
            }
			if(!utils_keyNumber(tarjeta)){
                sendModalValue("msgError","El formato del número de tarjeta es incorrecto");
                $("#msgError").modal("show");
				return;
			}
			// if(Boolean(metodoColeccion)){
                let element={};
                setImagen(null);
                this.bank_name=null;
                this.bank_code=null;
                this.bank_type=null;
                let mensajeAll = translate("message_err_1");
                let query = `?product_name=${metodoColeccion?.product_name}&collect_method_id=${metodoColeccion?.id}&channel_id=${getChannelId()}`;
                let body= {"card_number":tarjeta};
                callServicesHttp('verify-card',query,body).then((data) => {
                    if (data == null || data == undefined || data == "") {
                        sendModalValue("msgError",mensajeAll);
                        $("#msgError").modal("show");
                        return;
                    } else {
                        if (data.status_http == 200) {
                            delete data['status_http'];
                            this.formattedCardInfo(data);
                            return;
                        } else {
                            if(data.message=="NO_BIN_FOUND_ASSOCIATED_WITH_THAT_CARD_NUMBER" && this.type=="TDC"){
                                this.bank_type="INTERNATIONAL";
                                setShowOtpCcr(true);
                                setShowOtpBank(false);
                            }else{
                                sendModalValue("msgError",processMessageError(data, mensajeAll));
                                $("#msgError").modal("show");
                                return;
                            }
                        }
                    }
                }, err => {
                    sendModalValue("msgError",processError(err, mensajeAll));
                    $("#msgError").modal("show");
                    return;
                });
            // }
		}
	}
    const verifyData = () => {
        setModalValue("Está seguro de realizar la transacción?");
        let pinToSend;
        if (cardHolderValue==null || cardHolderValue==undefined || cardHolderValue=="" || cardHolderValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el nombre del tarjetahabiente");
            $("#msgWarning").modal("show");
            return;
        }
        if (documentTypeValue==null || documentTypeValue==undefined || documentTypeValue=="" || documentTypeValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            $("#msgWarning").modal("show");
            return;
        }
        if (idDocValue==null || idDocValue==undefined || idDocValue=="" || idDocValue=="null") {   
            sendModalValue("msgWarning","Debe ingresar el número de documento");         
            $("#msgWarning").modal("show");
            return;
        }else{
            setIdDoc(idDocValue+"".trim().toUpperCase());
            if(documentTypeValue!="P"){
                if(!utils_keyNumber(idDocValue)){
                    sendModalValue("msgWarning","El formato del número de documento es incorrecto");         
                    $("#msgWarning").modal("show");
                    return;
                }
            }
        }
        if (nroTarjetaValue==null || nroTarjetaValue==undefined || nroTarjetaValue=="") {
            sendModalValue("msgWarning","Debe ingresar el número de tarjeta");         
            $("#msgWarning").modal("show");
            return;
        }else{
            if (errorTarjetaValue==null || errorTarjetaValue==undefined || errorTarjetaValue=="") {
                sendModalValue("msgWarning","La verificación de tarjeta dio el siguiente error: ")+errorTarjetaValue;         
                $("#msgWarning").modal("show");
                return;
            }
        }
        if (expirationValue==null || expirationValue==undefined || expirationValue=="" || expirationValue=="null") {
            sendModalValue("msgWarning","Debe ingresar la fecha de expiración de la tarjeta");         
            $("#msgWarning").modal("show");
            return;
        }else{
            if(expirationValue.length<4){
                sendModalValue("msgWarning","La fecha de expiración tiene formato incorrecto");         
                $("#msgWarning").modal("show");
                return;
            }
            month=parseInt(expirationValue.split("/")[0]);
            if(month<1 || month>12){
                sendModalValue("msgWarning","El mes de expiración de la tarjeta tiene formato incorrecto");         
                $("#msgWarning").modal("show");
                return;
            }
            year=parseInt(expirationValue.split("/")[1]);
            if(!Boolean(year)){
                sendModalValue("msgWarning","El año de expiración de la tarjeta tiene formato incorrecto");         
                $("#msgWarning").modal("show");
                return;
            }
        }
        if (metodoColeccion?.product_name=='TDD_API') {
            if (pinValue==null || pinValue==undefined || pinValue=="") {
                sendModalValue("msgWarning","Debe ingresar el PIN");
                $("#msgWarning").modal("show");
                return;
            }else{
                setPin((pinValue+"").trim());
                if(pinValue.length==4 || pinValue.length==6){
                    if(utils_keyNumber(pinValue)){
                        var $key = RSA.getPublicKey(publicKeyPay());
                        pinToSend=RSA.encrypt(pinValue, $key);
                    }else{
                        sendModalValue("msgWarning","Formato del pin incorrecto deben ser de 4-6 números");
                        $("#msgWarning").modal("show");
                        return;
                    }
                }else{
                    sendModalValue("msgWarning","La longitud del PIN es incorrecta debe ser 4-6 números");
                    $("#msgWarning").modal("show");
                    return;
                }  
            }
        }
        if (ccvValue==null || ccvValue==undefined || ccvValue=="") {
            sendModalValue("msgWarning","Debe ingresar el ccv");
            $("#msgWarning").modal("show");
            return;
        }else{
            setCcv(ccvValue+"".trim());
            if(!utils_keyNumber(ccvValue)){
                sendModalValue("msgWarning","El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres");
                $("#msgWarning").modal("show");
                return;
            }
            if(ccvValue.length<3 || ccvValue.length>4){
                sendModalValue("msgWarning","El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres");
                $("#msgWarning").modal("show");
                return;
            }
        }
        switch (metodoColeccion?.product_name) {
            case 'TDC_API':
                jsonTosend= {
                    product_name: metodoColeccion?.product_name,
                    collect_method_id: metodoColeccion.id,
                    amount: cartTotal,
                    payment: {
                        reason:	'Pago de servicios CREDICARD PAGOS',
                        currency: "VES",
                        payer_name: cardHolderValue,
                        // card_bank_code: data.code,
                        debit_card:{
                            card_number: numeroOriginalValue,
                            expiration_month: month,
                            expiration_year: year,
                            holder_name: cardHolderValue,
                            holder_id_doc: idDocValue,
                            holder_id: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                            card_type: "TDD",
                            cvc: ccvValue,
                            account_type: tipoCuentaValue.toUpperCase(),
                            pin: pinToSend,
                            currency: "VES",
                            // bank_card_validation:{
                            //     bank_code: data.bank_card_validation.bank_code,
                            //     phone: data.bank_card_validation.phone,
                            //     // rif: data.bank_card_validation.rif,
                            //     token: data.bank_card_validation.token,
                            // }
                        }
                    }
                }   
            case 'TDC_API':
                jsonTosend= {
                    payment: {
                        reason: "Pago de servicios CREDICARD PAGOS",
                        currency: "VED",
                        payer_name: cardHolderValue,
                        product_name: metodoColeccion?.product_name,
                        card_bank_code: "0102",
                        credit_card: {
                            card_number: numeroOriginalValue,
                            expiration_month: month,
                            expiration_year: year,
                            holder_name: cardHolderValue,
                            holder_id_doc: "RIF",
                            holder_id: idDocValue,
                            cvc: ccvValue
                        }
                    },
                    collect_method_id: metodoColeccion.id,
                    product_name: metodoColeccion?.product_name,
                    payment_method: metodoColeccion.payment_method,
                    amount: cartTotal                      
                }     
            default:
                break;
        }
            
        checkCommision(data,"TDD",json)
        $(`#msgConfirmTDD${metodoColeccion?.product_name}`).modal("show");
    }
    const checkCommision = (parametros,type,json) =>{
		var parametros_send;
		let request=null;
		let data={
			card_number:parametros.card_number,
			amount:cartTotal,
			currency:"VED",
			card_type:type,
			bank_type:bankName,
		};
		this.parametros_check_commision=null;
		this.parametros_check_commision=parametros;
		this.data_pagar=null;
		let querys = "&product_name="+parametros?.collect_method?.product_name+"&collect_method_id="+parametros?.collect_method?.id;
		let mensajeAll = "Error al obtener comisión a cobrar";
        callServicesHttp('get-commision', query, data).then((response) => {
			if (data == null || data == undefined || data == "") {
				sendModalValue("msgError",mensajeAll);
				$("#msgError").modal("show");
				return;
			}
			if (data.status_http != 200) {
				sendModalValue("msgError",processMessageError(data, mensajeAll));
				$("#msgError").modal("show");
				return;
			} else{
				this.amount_to_pay = cartTotal;
				this.pay(json)
			}
		}, err => {
			sendModalValue("msgError",processError(err, mensajeAll));
			$("#msgError").modal("show");
			return;
		});
	}
    const changeTypeInputShowCard = (data,id,variable,setParam) => {
        if(!(nroTarjetaValue==null || nroTarjetaValue==undefined || nroTarjetaValue=="" || 
             nroTarjetaValue=="undefined" || nroTarjetaValue=="{}" || nroTarjetaValue=={} || nroTarjetaValue=="null")){
            try{
				if(variable!=null){
					if(variable.includes("images/eye-solid.svg")){
						setParam(eyeSlash);
						document.getElementById(id).type="text";
					}else{
						setParam(eyeSolid);
						// document.getElementById(id).type="password";
					}
				}
            }catch(er){
            }
            if(data.indexOf("X")>-1){
                setVerifyDisabled(false);
                setNroTarjeta(numeroOriginalValue);
            }else{
                setVerifyDisabled(true);
                setNroTarjeta(enmascararTarjeta(data));
                
            }
        }
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
    const clean = () => { 
        setCardHolder("");
        setIdDoc("");
        setNroTarjeta("");
        setErrorTarjeta("");
        setExpiration("");
        setCcv("");
        setPin("");
        setTipoCuenta("PRINCIPAL");
        setDocumentType("V");
        setVerifyDisabled(false);
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'center' } },
                imagen && React.createElement("img", { src: imagen, height: "40px", style: { objectFit: 'contain' } }),
                bankName && React.createElement("h5", { className: "font-bold" }, bankName),
                React.createElement("div", { className: "form-floating", style: { marginBottom: '0px' } },
                    React.createElement("input", {
                        type: "text",
                        id: "cardHolder",
                        name: "cardHolder",
                        className: "form-control font-regular",
                        style: { textTransform: 'uppercase' },
                        maxLength: "50",
                        value: cardHolderValue,
                        onChange: (e) => setCardHolder(e.currentTarget.value),
                        onKeyPress: (e) => keypressLetras(e)
                    }),
                    React.createElement("label", { htmlFor: "cardHolder", className: `font-regular ${etiqueta}` }, "Nombres y apellidos")
                ),                
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group", style: { marginBottom: '0px' } },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: "documentType",
                        name: "documentType",
                        required: true,
                        value: documentTypeValue,
                        onChange: (e) => {
                            setDocumentType(e.currentTarget.value);                            
                            changeDoc();
                        }
                    },
                    getTypesIdDoc().map((item, index) => (
                        React.createElement("option", { key: index, value: item }, item)
                    ))
                    ),
                    React.createElement("div", { className: "form-floating" },
                        !typePValue 
                            ? React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: "id_doc",
                                name: "id_doc",
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDocValue,
                                onChange: (e) => setIdDoc(e.currentTarget.value),
                                onKeyPress: (e) => {
                                    keypressNumeros(e);
                                },
                                onPaste: (e) => e.preventDefault(),
                                onDrag: (e) => e.preventDefault()
                            })
                            : React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: "id_doc",
                                name: "id_doc",
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDocValue,
                                onChange: (e) => setIdDoc(e.currentTarget.value),
                                onKeyPress: (e) => {
                                    keypressNumeros(e);
                                },
                                onPaste: (e) => e.preventDefault(),
                                onDrag: (e) => e.preventDefault()
                            }),
                        React.createElement("label", { htmlFor: "id_doc",className: "font-regular" }, "Nro. documento")
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
                            id: "nroTarjeta",
                            name: "nroTarjeta",
                            onKeyPress: (e) => keypressNumeros(e),
                            disabled: verifyDisabled,
                            value: nroTarjetaValue,
                            onChange: (e) => setNroTarjeta(e.currentTarget.value),
                            onBlur: (e) => getCardInfo(nroTarjetaValue)
                        }),
                        React.createElement("label", { htmlFor: "nroTarjeta", className: "font-regular" }, "Nro. Tarjeta")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShowCard(nroTarjetaValue,'nroTarjeta', ojitoTarjetaValue, setOjitoTarjeta)
                    },
                        React.createElement("img", { src: ojitoTarjetaValue, height: "18px", width: "18px", alt: "Toggle card visibility" })
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
                            id: `expiration${metodoColeccion?.product_name}`,
                            name: `expiration${metodoColeccion?.product_name}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            onKeyUp: (e) => setExpiration(e.currentTarget.value),
                            value: expirationValue,
                            onChange: (e) => {
                                setExpiration(e.currentTarget.value);
                            },
                            style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }
                        }),
                        React.createElement("label", { htmlFor: `expiration${metodoColeccion?.product_name}`, className: "font-regular" }, "Expiración")
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "password",
                            maxLength: "4",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: `ccv${metodoColeccion?.product_name}`,
                            name: `ccv${metodoColeccion?.product_name}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            value: ccvValue,
                            onChange: (e) => setCcv(e.currentTarget.value),
                        }),
                        React.createElement("label", { htmlFor: `ccv${metodoColeccion?.product_name}`}, "CCV")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow(`ccv${metodoColeccion?.product_name}`, ojitoCcvValue, setOjitoCcv)
                    },
                        React.createElement("img", { src: ojitoCcvValue, height: "18px", width: "18px", alt: "Toggle CCV visibility" })
                    ),
                ),
            ),
            metodoColeccion?.product_name=='TDD_API' && React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        id: "tipoCuenta",
                        name: "tipoCuenta",
                        required: true,
                        value: tipoCuentaValue,
                        onChange: (e) => setTipoCuenta(e.currentTarget.value)
                    },
                        getTypesAccount().map((item6, index) => (
                            React.createElement("option", { key: index, value: item6 }, item6)
                        ))
                    ),
                    React.createElement("label", { htmlFor: "tipoCuenta", className: "font-regular", style: { marginBottom: '0px' } }, "Tipo cuenta")
                )
            ),
            metodoColeccion?.product_name=='TDD_API' && React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 d-flex", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group" },
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "password",
                            maxLength: "6",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "pin",
                            name: "pin",
                            autoComplete: "off",
                            onKeyPress: (e) => keypressNumeros(e),
                            value: pinValue,
                            onChange: (e) => setPin(e.currentTarget.value),
                        }),
                        React.createElement("label", { htmlFor: "pin",className: "font-regular" }, "PIN")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow('pin', ojitoPinValue, setPinTarjeta)
                    },
                        React.createElement("img", { src: ojitoPinValue, height: "18px", width: "18px", alt: "Toggle PIN visibility" })
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
                    onClick: () => clean()
                }, "Limpiar")
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => verifyData('PAY')
                }, "Pagar")
            ),
        ),
        React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Procesado por: "),
            React.createElement("img", { src: credicard, className: 'mini-size-img', height: "40px", style: { objectFit: 'contain' } }),
        ),
        metodoColeccion?.product_name=='TDD_API' && React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Bancos aliados: "),
            React.createElement("img", { src: maestro, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: venezuela, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancaribe, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: mibanco, height: "40px" , className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancrecer, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancamiga, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: banfanb, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: tesoro, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bicentenario, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bfc, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
        ),
        metodoColeccion?.product_name=='TDC_API' && React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Marcas aliados: "),
            React.createElement("img", { src: visa, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: maestro, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
        ),
        React.createElement('div', { id:`msgConfirmTDD${metodoColeccion?.product_name}`, className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document' },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$(`#msgConfirmTDD${metodoColeccion?.product_name}`).modal("hide")}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, '¿ Estás seguro que deseas procesar la transacción por un monto de: Bs.'+ parseAmount(cartTotal))
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {$(`#msgConfirmTDD${metodoColeccion?.product_name}`).modal("hide")},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => sendPayment(`msgConfirmTDD${metodoColeccion?.product_name}`, metodoColeccion),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
};