const CredicardPay = ({ imagen,bankName,etiqueta ,
    verifyDisabled }) => {
    const ojito = myPluginImage.eye_solid;
    const ojitoTarjeta = myPluginImage.eye_solid;
    const ojitoPin = myPluginImage.eye_solid;
    const [cardHolderValue, setCardHolder] = React.useState(null);
    const [documentTypeValue, setDocumentType] = React.useState("V");
    const [idDocValue, setIdDoc] = React.useState(null);
    const [nroTarjetaValue, setNroTarjeta] = React.useState(null);
    const [errorTarjetaValue, setErrorTarjeta] = React.useState(null);
    const [expirationValue, setExpiration] = React.useState(null);
    const [ccvValue, setCcv] = React.useState(null);
    const [tarjetaValue, setTarjeta] = React.useState(null);
    const [tipoCuentaValue, setTipoCuenta] = React.useState(null);
    const [pinValue, setPin] = React.useState(null);
    const [typePValue, setTypeP] = React.useState(null);
    const [numeroOriginalValue, setNumeroOriginal] = React.useState(null);
    const cardHolder = React.useRef(null);
    const documentType = React.useRef("V");
    const idDoc = React.useRef(null);
    const nroTarjeta = React.useRef(null);
    const errorTarjeta = React.useRef(null);
    const expiration = React.useRef(null);
    const ccv = React.useRef(null);
    const tipoCuenta = React.useRef(null);
    const pin = React.useRef(null);
    const typeP = React.useRef(null);
    const numeroOriginal = React.useRef(null);
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
        // if(!(tarjetaValue==null || tarjetaValue==undefined || tarjetaValue=="" || tarjetaValue=="null")){
        //     setTarjeta(tarjetaValue.replace(/\s+/g, ''));
        //     this.nro_tarjeta=tarjetaValue;
        // }
        // let result={};
        // showOtpCcr=false;
        // showOtpBank=false;
        // showButtonSend=false;
        // tokenCcr=null;
        // token=null; 
        // phone=null;
		// if(Boolean(tarjeta)){
		// 	tarjeta=tarjeta+"".trim();
		// 	if(tarjeta.length<13){
        //         setErrorTarjeta("La tarjeta debe poseer al menos 13 dígitos");
        //         $("#msgWarning").modal("show");
		// 		return;
		// 	}
        //     if(!(tarjeta.indexOf("X")>-1)){
        //         setNumeroOriginal=tarjeta;                
        //         setNroTarjeta=this.enmascararTarjeta(tarjeta);
        //         this.verifyDisabled=true;
        //     }
		// 	if(!utils_keyNumber(tarjeta)){
        //         setErrorTarjeta("El formato del número de tarjeta es incorrecto");
        //         $("#msgWarning").modal("show");
		// 		return;
		// 	}
		// 	if(Boolean(this.collect_method)){
		// 		this.collect_method.map((element)=>{
		// 			if(element.hasOwnProperty("id")){
		// 				if(Boolean(element.id)){
		// 					this.imagen=null;
		// 					this.bank_name=null;
		// 					this.bank_code=null;
		// 					setErrorTarjeta("");
		// 					this.bank_type=null;
		// 					let querys = "&product_name="+element?.product_name+"&collect_method_id="+element?.id;
		// 					let mensajeAll = _("message_err_1");
		// 					let request = this.service.callServicesHttp("get-card-info-v1", querys, {"card_number":tarjeta});
		// 					request.subscribe(data => {
		// 						if (data == null || data == undefined || data == "") {
        //                             msgWarningBody.innerText=mensajeAll;
        //                             $("#msgWarning").modal("show");
		// 							return;
		// 						} else {
		// 							if (data.status_http == 200) {
		// 								delete data['status_http'];
		// 								this.formattedCardInfo(data);
		// 								return;
		// 							} else {
		// 								if(data.message=="NO_BIN_FOUND_ASSOCIATED_WITH_THAT_CARD_NUMBER" && this.type=="TDC"){
		// 									this.bank_type="INTERNATIONAL";
		// 									showOtpCcr=true;
		// 									showOtpBank=false;
		// 								}else{
        //                                     msgWarningBody.innerText=this.service.processMessageError(data, mensajeAll);
        //                                     $("#msgWarning").modal("show");
		// 									return;
		// 								}
		// 							}
		// 						}
		// 					}, err => {
        //                         msgWarningBody.innerText=this.service.processError(err, mensajeAll);
        //                         $("#msgWarning").modal("show");
		// 						return;
		// 					});
		// 				}else{
        //                     msgWarningBody.innerText="No se pueden realizar pagos con el método seleccionado";
        //                     $("#msgWarning").modal("show");
        //                     return;
		// 				}
		// 			}else{
        //                 msgWarningBody.innerText="No se pueden realizar pagos con el método seleccionado";
        //                 $("#msgWarning").modal("show");
        //                 return;
		// 			}
		// 		})
		// 	}else{
        //         msgWarningBody.innerText="No se pueden realizar pagos con el método seleccionado";
        //         $("#msgWarning").modal("show");
        //         return;
        //     }
		// }
	}
    const verifyData = () => {
        let msgWarningBody = document.getElementById("msgWarningBody");
        if (cardHolderValue==null || cardHolderValue==undefined || cardHolderValue=="") {
            msgWarningBody.innerText="Debe ingresar el nombre del tarjetahabiente";
            $("#msgWarning").modal("show");
            return;
        }
        if (documentTypeValue==null || documentTypeValue==undefined || documentTypeValue=="") {
            msgWarningBody.innerText="Debe ingresar el tipo de documento";
            $("#msgWarning").modal("show");
            return;
        }
        if (idDocValue==null || idDocValue==undefined || idDocValue=="") {   
            msgWarningBody.innerText="Debe ingresar el número de documento";         
            $("#msgWarning").modal("show");
            return;
        }else{
            setIdDoc(idDocValue+"".trim().toUpperCase());
            if(documentType!="P"){
                if(!utils_keyNumber(idDocValue)){
                    msgWarningBody.innerText="El formato del número de documento es incorrecto";         
                    $("#msgWarning").modal("show");
                    return;
                }
            }
        }
        if (nroTarjetaValue==null || nroTarjetaValue==undefined || nroTarjetaValue=="") {
            msgWarningBody.innerText="Debe ingresar el número de tarjeta";         
            $("#msgWarning").modal("show");
            return;
        }else{
            if (errorTarjetaValue==null || errorTarjetaValue==undefined || errorTarjetaValue=="") {
                msgWarningBody.innerText="La verificación de tarjeta dio el siguiente error: "+errorTarjetaValue;         
                $("#msgWarning").modal("show");
                return;
            }
        }
        if (expirationValue==null || expirationValue==undefined || expirationValue=="") {
            msgWarningBody.innerText="Debe ingresar la fecha de expiración de la tarjeta";         
            $("#msgWarning").modal("show");
            return;
        }else{
            if(expirationValue.length<4){
                msgWarningBody.innerText="La fecha de expiración tiene formato incorrecto";         
                $("#msgWarning").modal("show");
                return;
            }
            month=parseInt(expirationValue.split("/")[0]);
            if(month<1 || month>12){
                msgWarningBody.innerText="El mes de expiración de la tarjeta tiene formato incorrecto";         
                $("#msgWarning").modal("show");
                return;
            }
            year=parseInt(expirationValue.split("/")[1]);
            if(!Boolean(year)){
                msgWarningBody.innerText="El año de expiración de la tarjeta tiene formato incorrecto";         
                $("#msgWarning").modal("show");
                return;
            }
        }
        if (ccvValue==null || ccvValue==undefined || ccvValue=="") {
            msgWarningBody.innerText="Debe ingresar el ccv";
            $("#msgWarning").modal("show");
            return;
        }else{
            setCcv(ccvValue+"".trim());
            if(!utils_keyNumber(ccvValue)){
                msgWarningBody.innerText="El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres";
                $("#msgWarning").modal("show");
                return;
            }
            if(ccvValue.length<3 || ccvValue.length>4){
                msgWarningBody.innerText="El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres";
                $("#msgWarning").modal("show");
                return;
            }
        }
    }
    const changeTypeInputShowCard = () => {
        window.alert("Testing button");
    };
    const changeTypeInputShow = () => {
        window.alert("Testing button");
    };
    const clean = () => { 
        setCardHolder("");
        setIdDoc("");
        setNroTarjeta("");
        setErrorTarjeta("");
        setExpiration("");
        setCcv("");
        setPin("");
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
                        !typeP 
                            ? React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: "id_doc",
                                name: "id_doc",
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                // value: idDoc,
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
                                    // keypressLetrasNumeros(e);
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
                            onBlur: () => getCardInfo(nroTarjetaValue)
                        }),
                        React.createElement("label", { htmlFor: "nroTarjeta", className: "font-regular" }, "Nro. Tarjeta")
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
                            id: "expiration",
                            name: "expiration",
                            onKeyPress: (e) => keypressNumeros(e),
                            value: expirationValue,
                            onChange: (e) => setExpiration(e.currentTarget.value),
                            style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }
                        }),
                        React.createElement("label", { htmlFor: "expiration", className: "font-regular" }, "Expiración")
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "password",
                            maxLength: "4",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: "ccv",
                            name: "ccv",
                            onKeyPress: (e) => keypressNumeros(e),
                            value: ccvValue,
                            onChange: (e) => setCcv(e.currentTarget.value),
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
                        id: "tipoCuenta",
                        name: "tipoCuenta",
                        required: true,
                        value: tipoCuenta,
                        onChange: (e) => setTipoCuenta(e.target.value)
                    },
                        getTypesAccount().map((item6, index) => (
                            React.createElement("option", { key: index, value: item6 }, item6)
                        ))
                    ),
                    React.createElement("label", { htmlFor: "tipoCuenta", className: "font-regular", style: { marginBottom: '0px' } }, "Tipo cuenta")
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
    );
};