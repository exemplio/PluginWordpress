const MercantilTDD = ({ metodoColeccion,paymentFun }) => {
    let mercantil = php_var.mercantil;
    metodoColeccion= !(metodoColeccion== null || metodoColeccion== undefined) ? metodoColeccion[0] : null;
    const [ojitoCcvValue, setOjitoCcv] = React.useState(eyeSolid);
    const [cardHolderValue, setCardHolder] = React.useState(null);
    const [documentTypeValue, setDocumentType] = React.useState("V");
    const [idDocValue, setIdDoc] = React.useState(null);
    const [nroTarjetaValue, setNroTarjeta] = React.useState(null);
    const [expirationValue, setExpiration] = React.useState(null);
    const [ccvValue, setCcv] = React.useState(null);
    const [tarjetaValue, setTarjeta] = React.useState(null);
    const [tipoCuentaValue, setTipoCuenta] = React.useState("CORRIENTE");
    const [numeroOriginalValue, setNumeroOriginal] = React.useState(null);
    const [modalValue, setModalValue] = React.useState("PRUEBA");
    const [verifyDisabled, setVerifyDisabled] = React.useState(false);
    const [tokenBank, setTokenBank] = React.useState("");
    const [bankImage, setBankImage] = React.useState(mercantil);
    const [bankCode, setBankCode] = React.useState("");
    const [amountToShow, setAmountToShow] = React.useState("");
    React.useEffect(() => {
        if (modalValue=="PRUEBA") {
            jQuery(document).ready(function() {
                jQuery(`#expiration${metodoColeccion?.credential_service}`).mask("00/00", {reverse: true});
            });                                    
        }
    }, []);
    const verifyExpiration = (expiration) => {
        let month=0;
        let year=0;
        if (expiration==null || expiration==undefined || expiration=="" || expiration=="null") {
            sendModalValue("msgWarning","Debe ingresar la fecha de expiración de la tarjeta");
            openModal('msgWarning');
            return;
        }else{
            if(expiration.length<4){
                setExpiration("");
                sendModalValue("msgWarning","La fecha de expiración tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
            month=parseInt(expiration.split("/")[0]);
            if(month<1 || month>12){
                setExpiration("");
                sendModalValue("msgWarning","El mes de expiración de la tarjeta tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
            year=parseInt(expiration.split("/")[1]);
            if(!Boolean(year)){
                setExpiration("");
                sendModalValue("msgWarning","El año de expiración de la tarjeta tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
        }
    }
    //Pedir token al banco
    const getOTP = () => {		
        let result={};
        if (idDocValue==null || idDocValue==undefined || idDocValue=="" || idDocValue=="null") {   
            sendModalValue("msgWarning","Debe ingresar el número de documento");         
            openModal('msgWarning');
            return;
        }
        if (nroTarjetaValue==null || nroTarjetaValue==undefined || nroTarjetaValue=="") {
            sendModalValue("msgWarning","Debe ingresar el número de tarjeta");         
            openModal('msgWarning');
            return;
        }
		let querys = "?product_name="+metodoColeccion?.product_name+"&collect_method_id="+metodoColeccion?.id+"&channel_id="+getChannelId();
        let mensajeAll = _("message_err_1");
        let parametros={};
        parametros.card_number=nroTarjetaValue;
        parametros.payer_id_doc=`${documentTypeValue}${addZeros(idDocValue, 9)}`;
        callServicesHttp("mercantil-send-otp", querys, parametros).then((data) => {
            if (data == null || data == undefined || data == "") {
                sendModalValue("msgWarning","Error al solicitar clave dinámica de Mercantil");         
                openModal('msgWarning');
                return;
            } else {
                if (data.status_http == 200) {
                    delete data['status_http'];
                    openModal("msgShow");                    
                    return;
                } else {
                    sendModalValue("msgWarning","Error al solicitar clave dinámica de Mercantil");         
                    openModal('msgWarning');
                    return;
                }
            }
        }).catch((err) => {
            sendModalValue("msgWarning","Error al solicitar clave dinámica de Mercantil");         
            openModal('msgWarning');
            return;
        });        
	}
    const verifyData = () => {
        setModalValue("Está seguro de realizar la transacción?");
        let pinToSend;
        if (documentTypeValue==null || documentTypeValue==undefined || documentTypeValue=="" || documentTypeValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el tipo de documento");
            openModal('msgWarning');
            return;
        }
        if (idDocValue==null || idDocValue==undefined || idDocValue=="" || idDocValue=="null") {   
            sendModalValue("msgWarning","Debe ingresar el número de documento");         
            openModal('msgWarning');
            return;
        }else{
            setIdDoc(idDocValue+"".trim().toUpperCase());
            if(documentTypeValue!="P"){
                if(!utils_keyNumber(idDocValue)){
                    sendModalValue("msgWarning","El formato del número de documento es incorrecto");         
                    openModal('msgWarning');
                    return;
                }
            }
        }
        if (nroTarjetaValue==null || nroTarjetaValue==undefined || nroTarjetaValue=="") {
            sendModalValue("msgWarning","Debe ingresar el número de tarjeta");         
            openModal('msgWarning');
            return;
        }
        if (expirationValue==null || expirationValue==undefined || expirationValue=="" || expirationValue=="null") {
            sendModalValue("msgWarning","Debe ingresar la fecha de expiración de la tarjeta");         
            openModal('msgWarning');
            return;
        }else{
            if(expirationValue.length<4){
                sendModalValue("msgWarning","La fecha de expiración tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
            month=parseInt(expirationValue.split("/")[0]);
            if(month<1 || month>12){
                sendModalValue("msgWarning","El mes de expiración de la tarjeta tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
            year=parseInt("20"+expirationValue.split("/")[1]);
            if(!Boolean(year)){
                sendModalValue("msgWarning","El año de expiración de la tarjeta tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
        }
        if (ccvValue==null || ccvValue==undefined || ccvValue=="") {
            sendModalValue("msgWarning","Debe ingresar el ccv");
            openModal('msgWarning');
            return;
        }else{
            setCcv(ccvValue+"".trim());
            if(!utils_keyNumber(ccvValue)){
                sendModalValue("msgWarning","El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres");
                openModal('msgWarning');
                return;
            }
            if(ccvValue.length<3 || ccvValue.length>4){
                sendModalValue("msgWarning","El formato del cvv es incorrecto, se aceptan sólo números y debe ser 3 o 4 caracteres");
                openModal('msgWarning');
                return;
            }
        }
        let typeAccount;
        if (tipoCuentaValue==null || tipoCuentaValue==undefined || tipoCuentaValue=="") {
            sendModalValue("msgWarning","Debe ingresar el tipo de cuenta");
            openModal('msgWarning');
            return;
        }else{
            if(tipoCuentaValue=="CORRIENTE"){
                typeAccount= "CC";
            }else{
                typeAccount="CA";
            }
        }
        jsonTosend= {
            collect_method_id: metodoColeccion.id,
            amount: php_var.cart_total,
            payment:{
                amount: php_var.cart_total,
                card_number: nroTarjetaValue,
                expiration_month: month,
                expiration_year: year,
                payer_id_doc: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                cvv: ccvValue,
                account_type: typeAccount,
                otp: tokenBank
            }
        };        
        setAmountToShow(`Bs. ${parseAmount(php_var.cart_total)}`);
        openModal(`msgConfirmMercantil${metodoColeccion?.credential_service}`);
    }
    //Funcion para cambiar un input de type password a text de la tarjeta
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
        setExpiration("");
        setCcv("");
        setTipoCuenta("CORRIENTE");
        setDocumentType("V");
        setVerifyDisabled(false);
        setTokenBank("");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
            React.createElement("img", { src: bankImage, className:'mini-size-img max-width-important', style: { objectFit: 'contain' } }),
            React.createElement("h5", { className: "font-bold" }, "MERCANTIL"),
        ),
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group", style: { marginBottom: '0px' } },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: `documentType${metodoColeccion?.credential_service}`,
                        name: `documentType${metodoColeccion?.credential_service}`,
                        required: true,
                        value: documentTypeValue,
                        onChange: (e) => {
                            setDocumentType(e.currentTarget.value);                            
                        }
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
                                id: `id_doc${metodoColeccion?.credential_service}`,
                                name: `id_doc${metodoColeccion?.credential_service}`,
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDocValue,
                                onChange: (e) => setIdDoc(e.currentTarget.value),
                                onKeyPress: (e) => {
                                    keypressNumeros(e);
                                },
                                // onPaste: (e) => e.preventDefault(),
                                // onDrag: (e) => e.preventDefault()
                        }),
                        React.createElement("label", { htmlFor: `id_doc${metodoColeccion?.credential_service}`,className: "font-regular" }, "Nro. documento")
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
                            id: `nroTarjeta${metodoColeccion?.credential_service}`,
                            name: `nroTarjeta${metodoColeccion?.credential_service}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            disabled: verifyDisabled,
                            value: nroTarjetaValue,
                            onChange: (e) => setNroTarjeta(e.currentTarget.value),
                        }),
                        React.createElement("label", { htmlFor: `nroTarjeta${metodoColeccion?.credential_service}`, className: "font-regular" }, "Nro. Tarjeta")
                    ),
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
                            id: `expiration${metodoColeccion?.credential_service}`,
                            name: `expiration${metodoColeccion?.credential_service}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            onKeyUp: (e) => setExpiration(e.currentTarget.value),
                            value: expirationValue,
                            onChange: (e) => {
                                setExpiration(e.currentTarget.value);
                            },
                            onBlur: (e) => verifyExpiration(e.target.value),
                            style: { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }
                        }),
                        React.createElement("label", { htmlFor: `expiration${metodoColeccion?.credential_service}`, className: "font-regular" }, "Expiración")
                    ),
                    React.createElement("div", { className: "form-floating" },
                        React.createElement("input", {
                            type: "password",
                            maxLength: "4",
                            className: "form-control font-regular",
                            inputMode: "numeric",
                            id: `ccv${metodoColeccion?.credential_service}`,
                            name: `ccv${metodoColeccion?.credential_service}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            value: ccvValue,
                            onChange: (e) => setCcv(e.currentTarget.value),
                        }),
                        React.createElement("label", { htmlFor: `ccv${metodoColeccion?.credential_service}`, className: "font-regular"}, "CCV")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow(`ccv${metodoColeccion?.credential_service}`, ojitoCcvValue, setOjitoCcv)
                    },
                        React.createElement("img", { src: ojitoCcvValue, height: "18px", width: "18px", alt: "Toggle CCV visibility", style:{ margin: '0px' } })
                    ),
                ),
            ),
            React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "form-floating" },
                    React.createElement("select", {
                        className: "form-select browser-default font-regular",
                        id: `tipoCuenta${metodoColeccion?.credential_service}`,
                        name: `tipoCuenta${metodoColeccion?.credential_service}`,
                        required: true,
                        value: tipoCuentaValue,
                        onChange: (e) => setTipoCuenta(e.currentTarget.value)
                    },
                        getTypesAccountMercantil().map((item6, index) => (
                            React.createElement("option", { key: index, value: item6 }, item6)
                        ))
                    ),
                    React.createElement("label", { htmlFor: `tipoCuenta${metodoColeccion?.credential_service}`, className: "font-regular", style: { marginBottom: '0px' } }, "Tipo cuenta")
                )
            ),
        ),
        React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
            React.createElement("div", { className: "form-floating" },
                React.createElement("input", {
                    type: "text",
                    maxLength: 10,
                    className: "form-control",
                    id: `token${metodoColeccion?.credential_service}`,
                    name: `token${metodoColeccion?.credential_service}`,
                    style: { textTransform: 'uppercase' },
                    value: tokenBank,
                    onChange: (e) => setTokenBank(e.target.value),
                    inputMode: "numeric",
                    onKeyPress: (e) => keypressNumeros(e)
                }),
                React.createElement("label", { htmlFor: `token${metodoColeccion?.credential_service}`, className:'font-regular' }, "Clave dinámica")
            )
        ),
        React.createElement("div", { className: "row col-lg-12 offset-md-12 col-md-12 col-sm-12 col-12 mt-2 reportButtons", style: { justifyContent: 'right', display: 'flex', marginTop: '15px' } },
            React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-danger btn-lg",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => getOTP()
                }, "Solicitar token")
            ),
            React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-lg button-clean font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => clean(),
                }, "Limpiar")
            ),
            React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => verifyData(),
                }, "Pagar")
            ),
        ),
        React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Procesado por: "),
            React.createElement("img", { src: mercantil, className: 'mini-size-img max-width-important', height: "40px", style: { objectFit: 'contain' } }),
        ),
        React.createElement('div', { id:`msgConfirmMercantil${metodoColeccion?.credential_service}`, 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal(`msgConfirmMercantil${metodoColeccion?.product_name}`)}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, `¿Estás seguro que deseas procesar la transacción por un monto de: Bs. ${parseAmount(php_var.cart_total)}?`)
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {closeModal(`msgConfirmMercantil${metodoColeccion?.product_name}`)},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun(`msgConfirmMercantil${metodoColeccion?.credential_service}`, metodoColeccion),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
};