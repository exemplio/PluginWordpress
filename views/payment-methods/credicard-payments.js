const CredicardPay = ({ metodoColeccion, totalAmount, paymentFun }) => {
    let credicard = php_var.credicard;
    let visa = php_var.visa;
    let master_card = php_var.master_card;
    let venezuela = php_var.venezuela;
    let bancaribe = php_var.bancaribe;
    let mibanco = php_var.mibanco;
    let bancrecer = php_var.bancrecer;
    let bancamiga = php_var.bancamiga;
    let banfanb = php_var.banfanb;
    let tesoro = php_var.tesoro;
    let bicentenario = php_var.bicentenario;
    let bfc = php_var.bfc;
    let regex = /^\d+$/;
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
    const [tokenCcr, setTokenCcr] = React.useState("");
    const [tokenBank, setTokenBank] = React.useState("");
    const [bankImage, setBankImage] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [bankAcronym, setBankAcronym] = React.useState("");
    const [bankCode, setBankCode] = React.useState("");
    const [bankType, setBankType] = React.useState("");
    const [amountToShow, setAmountToShow] = React.useState("");
    const [rowClass, setRowClass] = React.useState("col-lg-6 col-md-6 col-sm-6 col-12");
    if (!(metodoColeccion==null || metodoColeccion==undefined || metodoColeccion=="")) {
        metodoColeccion= metodoColeccion[0];
        metodoColeccion.type = metodoColeccion?.product_name== "TDC_API" ? "TDC" : "TDD";
    }
    React.useEffect(() => {
        if (modalValue=="PRUEBA") {
            jQuery(document).ready(function() {
                jQuery(`#expiration${metodoColeccion?.product_name}`).mask("00/00", {reverse: true});
            });                                    
        }
    }, []);

    const changeDoc = () => {
		let typeDoc = document.getElementById(`documentType${metodoColeccion?.product_name}`).value;
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
        setTokenCcr("0,00");
        token=null; 
        phone=null;
		if(Boolean(tarjeta)){
			tarjeta=tarjeta+"".trim();
			if(tarjeta.length<13){
                sendModalValue("msgError","La tarjeta debe poseer al menos 13 dígitos");
                openModal('msgError');
				return;
			}
            if(!(tarjeta.indexOf("X")>-1)){
                setNumeroOriginal(tarjeta);                
                setNroTarjeta(enmascararTarjeta(tarjeta));
                setVerifyDisabled(true);
            }
			if(!utils_keyNumber(tarjeta)){
                sendModalValue("msgError","El formato del número de tarjeta es incorrecto");
                openModal('msgError');
				return;
			}
            let element={};
            if(Boolean(metodoColeccion)){
				if(metodoColeccion.hasOwnProperty("id")){
                    let mensajeAll = translate("message_err_1");
                    let query = `?product_name=${metodoColeccion?.product_name}&collect_method_id=${metodoColeccion?.id}&channel_id=${getChannelId()}`;
                    let body= {"card_number":tarjeta};
                    callServicesHttp('verify-card',query,body).then((response) => {
                        if (Boolean(response.code)) { 
                            sendModalValue("msgError",processMessageError(response,mensajeAll));
                            openModal('msgError');
                            return;
                        }else{
                            formattedCardInfo(response);
                        }
                    }).catch((e)=>{
                        console.error(e);                        
                    });
                }
            }
		}
	}
    const verifyExpiration = (expiration) => {
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
    //Formateo de data de la funcion verifyCardData()
    const formattedCardInfo = (data) => {
        let result=null;
        setErrorTarjeta("");
		if(Boolean(data)){
			if(data.hasOwnProperty("bank_info")){
				if(Boolean(data.bank_info)){
                    if(Boolean(data?.bank_info?.thumbnail)){
                        setBankImage(php_var?.get_static+data?.bank_info?.thumbnail);
                    }
                    if(Boolean(data?.bank_info?.name)){
                        setBankName(data?.bank_info?.name);
                    }
					if(data.bank_info.hasOwnProperty("bank_type")){
						setBankType(data.bank_info.bank_type);
					}
                    if(data.bank_info.hasOwnProperty("acronym")){
                        setBankAcronym(data?.bank_info?.acronym);
                    }
                    if(data.bank_info.hasOwnProperty("code")){
                        setBankCode(data?.bank_info?.code);
                    }
                    if(Boolean(data?.bank_info?.card_validation_config)){
                        if(data?.bank_info?.card_validation_config.hasOwnProperty(metodoColeccion?.type)){
                           if(Boolean(data?.bank_info?.card_validation_config[metodoColeccion?.type])){
                                switch(data?.bank_info?.card_validation_config[metodoColeccion?.type]){
                                    case 'OTP_CCR':{
                                        setShowOtpCcr(true);
                                        setShowOtpBank(false);
                                        setRowClass('col-lg-4 col-md-4 col-sm-4 col-12');
                                    }break;
                                    case 'OTP_BANK':{
                                        setShowOtpBank(true);
                                        setShowOtpCcr(false);
                                        setRowClass('col-lg-4 col-md-4 col-sm-4 col-12');
                                        if(Boolean(bankAcronym)){
                                            if(bankAcronym=="BANCAMIGA" || bankAcronym=="TESORO" || bankAcronym=="BANFANB" || bankAcronym=="BDV" || bankAcronym=="BICENTENARIO" || bankAcronym=="BFC"){
                                                this.show_button_send=true;
                                            }
                                        }
                                    }break;
                                    case 'NONE':{
                                        setShowOtpBank(false);
                                        setShowOtpCcr(false);
                                    }
                                }
                           }
                        }else{
                            sendModalValue("msgWarning",translate("message_warning_1"));
                            setErrorTarjeta(translate("message_warning_1"));
                            openModal('msgWarning');
                            return;
                        }
                    }
				}else{
                    if (metodoColeccion?.type=="TDD") {
                        sendModalValue("msgWarning",translate("message_warning_1"));
                        setErrorTarjeta(translate("message_warning_1"));
                        openModal('msgWarning');
                        return;
                    }
					setBankType("INTERNATIONAL");
                    setShowOtpCcr(true);
                    setShowOtpBank(false);
                    setRowClass('col-lg-4 col-md-4 col-sm-4 col-12');
				}
			}else{
                if (metodoColeccion?.type=="TDD") {
                    sendModalValue("msgWarning",translate("message_warning_1"));
                    setErrorTarjeta(translate("message_warning_1"));
                    openModal('msgWarning');
                    return;
                }
				setBankType("INTERNATIONAL");
                setShowOtpCcr(true);
                setShowOtpBank(false);
                setRowClass('col-lg-4 col-md-4 col-sm-4 col-12');
				if(data.hasOwnProperty("financial_card_emitter")){
					if(Boolean(data.financial_card_emitter)){
						setBankImage(php_var?.get_static+data?.financial_card_emitter?.thumbnail);
                        setBankName(data?.financial_card_emitter?.name);
					}
				}
                if(data.card_status=="VALIDATED"){
                    setShowOtpCcr(false);
                    setShowOtpBank(false);
                }
			}
		}
	}
    //Pedir token al banco
    const sendBankToken = () => {		
        if (idDocValue==null || idDocValue==undefined || idDocValue=="" || idDocValue=="null") {   
            sendModalValue("msgWarning","Debe ingresar el número de documento");         
            openModal('msgWarning');
            return;
        }
        let body = { bank_code: bankCode, rif: `${documentTypeValue}${addZeros(idDocValue, 9)}`}
        let querys = `?product_name=${metodoColeccion?.product_name}&collect_method_id=${metodoColeccion?.id}&channel_id=${getChannelId()}`;
        let mensajeAll = translate("message_err_4");
        callServicesHttp('send-bank-token',querys,body).then((response) => {
            if ((Boolean(response?.code))) {
                if(!(response?.code==200)){
                    sendModalValue("msgError",processMessageError(response,mensajeAll));
                    openModal('msgError');
                    return;
                }else{
                    openModal('msgToken');
                    return;
                }
            }else{
                sendModalValue("msgError",processMessageError(response,"Error al obtener el token"));
                openModal('msgError');
                return;
            }
        }).catch((e)=>{
            console.error(e);            
        });	
	}
    //Enviar token de CCR
    const sendTokenCcr = (data) => {
        let body = {};   
        body= {
            "credit_card": {
                card_number: data?.card_number,
                expiration_month: data?.expiration_month,
                expiration_year: data?.expiration_year,
                holder_name: data?.holder_name,
                holder_id_doc: "RIF",
                holder_id: data?.holder_id,
                card_type: metodoColeccion?.type,
                cvc: data?.cvc,
                currency: "VES",
                bank_card_validation: {
                  phone: "4264375458",
                  rif: data?.holder_id,
                }
            }         
        };
        let result={};
        let querys = `?product_name=${metodoColeccion?.product_name}&collect_method_id=${metodoColeccion?.id}&channel_id=${getChannelId()}`;
        let mensajeAll = translate("message_err_3");
        callServicesHttp('send-token-with-card',querys,body).then((response) => {
            if (response == null || response == undefined || response == "") {
                sendModalValue("msgError",mensajeAll);
                openModal('msgError');
                return;
            }
            if (response.status_http != 200) {
                sendModalValue("msgError",processMessageError(response, mensajeAll));
                openModal('msgError');
                return;
            } else{
                closeModal('msgToken');
                return;
            }
        }).catch((e)=>{
            console.error(e);            
        });
	}
    const verifyData = (action) => {
        setModalValue("Está seguro de realizar la transacción?");
        let pinToSend;
        if (cardHolderValue==null || cardHolderValue==undefined || cardHolderValue=="" || cardHolderValue=="null") {
            sendModalValue("msgWarning","Debe ingresar el nombre del tarjetahabiente");
            openModal('msgWarning');
            return;
        }
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
        }else{
            if (!(errorTarjetaValue==null || errorTarjetaValue==undefined || errorTarjetaValue=="")) {
                sendModalValue("msgWarning","La verificación de tarjeta dio el siguiente error: "+errorTarjetaValue);         
                openModal('msgWarning');
                return;
            }
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
            year=parseInt(expirationValue.split("/")[1]);
            if(!Boolean(year)){
                sendModalValue("msgWarning","El año de expiración de la tarjeta tiene formato incorrecto");         
                openModal('msgWarning');
                return;
            }
        }
        if (metodoColeccion?.product_name=='TDD_API') {
            if (pinValue==null || pinValue==undefined || pinValue=="") {
                sendModalValue("msgWarning","Debe ingresar el PIN");
                openModal('msgWarning');
                return;
            }else{
                setPin((pinValue+"").trim());
                if(pinValue.length==4 || pinValue.length==6){
                    if(utils_keyNumber(pinValue)){
                        var $key = RSA.getPublicKey(publicKeyPay());
                        pinToSend=RSA.encrypt(pinValue, $key);
                    }else{
                        sendModalValue("msgWarning","Formato del pin incorrecto deben ser de 4-6 números");
                        openModal('msgWarning');
                        return;
                    }
                }else{
                    sendModalValue("msgWarning","La longitud del PIN es incorrecta debe ser 4-6 números");
                    openModal('msgWarning');
                    return;
                }  
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
        switch (metodoColeccion?.product_name) {
            case 'TDD_API':
                if (showOtpCcr) {
                    sendModalValue("msgWarning",translate("message_warning_1"));
                    setErrorTarjeta(translate("message_warning_1"));
                    openModal('msgWarning');
                    return;
                }else if(showOtpBank){
                    jsonTosend= {
                        collect_method_id: metodoColeccion.id,
                        amount: totalAmount,
                        payment:{
                            reason:	'Pago de servicios CREDICARD PAGOS',
                            currency: "VES",
                            payer_name: cardHolderValue,
                            card_bank_code: bankCode,
                            amount: totalAmount,
                            debit_card:{
                                card_number: numeroOriginalValue,
                                expiration_month: month,
                                expiration_year: year,
                                holder_name: cardHolderValue,
                                holder_id_doc: "RIF",
                                holder_id: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                card_type: metodoColeccion?.type,
                                cvc: ccvValue,
                                account_type: tipoCuentaValue.toUpperCase(),
                                pin: pinToSend,
                                currency: "VES",
                                bank_card_validation: {
                                    bank_code: bankCode,
                                    token: "1111111111",
                                    rif: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                }
                            }
                        }
                    };  
                }else{
                    jsonTosend= {
                        collect_method_id: metodoColeccion.id,
                        amount: totalAmount,
                        payment:{
                            product_name: metodoColeccion?.product_name,
                            reason:	'Pago de servicios CREDICARD PAGOS',
                            currency: "VES",
                            payer_name: cardHolderValue,
                            card_bank_code: bankCode,
                            amount: totalAmount,
                            debit_card:{
                                card_number: numeroOriginalValue,
                                expiration_month: month,
                                expiration_year: year,
                                holder_name: cardHolderValue,
                                holder_id_doc: "RIF",
                                holder_id: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                card_type: metodoColeccion?.type,
                                cvc: ccvValue,
                                account_type: tipoCuentaValue.toUpperCase(),
                                pin: pinToSend,
                                currency: "VES",
                            }
                        }
                    };
                }
                // checkCommision(metodoColeccion?.type);
                setAmountToShow(`Bs. ${parseAmount(totalAmount)}`);
                openModal(`msgConfirmCredicard${metodoColeccion?.product_name}`);
                break;
            case 'TDC_API':
                if (showOtpCcr) {
                    jsonTosend= {
                        collect_method_id: metodoColeccion.id,
                        amount: totalAmount,
                        payment:{
                            reason: "Pago de servicios CREDICARD PAGOS",
                            currency: "VED",
                            payer_name: cardHolderValue,
                            // card_bank_code: bankCode,
                            amount: totalAmount,
                            credit_card: {
                                card_number: numeroOriginalValue,
                                expiration_month: month,
                                expiration_year: year,
                                holder_name: cardHolderValue,
                                holder_id_doc: "RIF",
                                holder_id: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                cvc: ccvValue,
                                bank_card_validation: {
                                    // bank_code: bankCode,
                                    phone: "4241209806",
                                    rif: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                    token: ((tokenCcr+"").trim()).replace(/\./g,"").replace(/,/g,"")
                                }                          
                            }
                        }
                    };
                    if (action=='TOKEN') {
                        sendTokenCcr(jsonTosend?.payment?.credit_card);
                        return;                        
                    }
                }else{
                    jsonTosend= {
                        collect_method_id: metodoColeccion.id,
                        amount: totalAmount,
                        payment:{
                            reason: "Pago de servicios CREDICARD PAGOS",
                            currency: "VED",
                            payer_name: cardHolderValue,
                            card_bank_code: bankCode,
                            amount: totalAmount,
                            credit_card: {
                                card_number: numeroOriginalValue,
                                expiration_month: month,
                                expiration_year: year,
                                holder_name: cardHolderValue,
                                holder_id_doc: "RIF",
                                holder_id: `${documentTypeValue}${addZeros(idDocValue, 9)}`,
                                cvc: ccvValue,                        
                            }
                        }
                    };
                }
                // checkCommision(metodoColeccion?.type);
                setAmountToShow(`Bs. ${parseAmount(totalAmount)}`);
                openModal(`msgConfirmCredicard${metodoColeccion?.product_name}`);
                break;
            default:
                break;
        }            
    }
    const checkCommision = (type) =>{
		var parametros_send;
		let request=null;
		let data={
			card_number:numeroOriginalValue,
			amount:totalAmount,
			currency:"VED",
			card_type:type,
			bank_type:bankName,
		};
		let querys = "?product_name="+metodoColeccion?.product_name+"&collect_method_id="+metodoColeccion?.id+"&channel_id="+getChannelId();
		let mensajeAll = "Error al obtener comisión a cobrar";
        callServicesHttp('get-commision', querys, data).then((response) => {   
			if (response == null || response == undefined || response == "") {
				sendModalValue("msgError",mensajeAll);
				openModal('msgError');
				return;
			}else{
                if (!(response.code==null || response.code==undefined || response.code=="")) {
                    sendModalValue("msgError",processMessageError(response, mensajeAll));
                    openModal('msgError');
                    return;
                }else{
                    if (Boolean(response.code)) {
                        sendModalValue("msgError",processMessageError(response, mensajeAll));
                        openModal('msgError');
                        return;
                    }else{
                        setAmountToShow(response?.amount_formatted);
                        openModal(`msgConfirmCredicard${metodoColeccion?.product_name}`);
                        return;
                    }
                }
            }
		}).catch((e)=>{
            console.error(e);            
        });
	}
    const devolverEvent = (event) =>{
        if(!(event==null || event==undefined || event=="")){
            if(event.keyCode==8){
                if(tokenCcr!=null){
                    if(tokenCcr==""){
                        setTokenCcr("0,00");
                    }else{
                        if(tokenCcr.length==3){
                            setTokenBank("0,"+tokenCcr.charAt(0)+tokenCcr.charAt(2));
                        }
                    }
                }else{
                    setTokenBank("0,00");
                }
            }
        }
    }
    const keyDown = (event) =>{
        if(!(event==null || event==undefined || event=="")){
            if(event.keyCode==37 || event.keyCode==38){
                return false;
            }
        }
    }
    const getEventMonto = (event) =>{
        if(!(event==null || event==undefined || event=="")){
            if(regex.test(event.key)){
                if(tokenCcr!=null){
                    if(tokenCcr.length==4){
                        if(tokenCcr=="0,00"){
                            if(event.key==0 || event.key=="0"){
                                return false;
                            }else{
                                setTokenCcr("0,0"+event.key);
                                return false;
                            }
                        }else{
                            if(tokenCcr.substring(0,3)=="0,0"){
                                setTokenCcr("0,"+tokenCcr.charAt(tokenCcr.length-1)+event.key);
                                return false;
                            }else{
                                if(tokenCcr.charAt(0)=="0" || tokenCcr.charAt(0)==0){
                                    setTokenCcr(tokenCcr.charAt(2)+","+tokenCcr.charAt(3)+event.key);
                                    return false;
                                }
                            }
                        }
                    }
                }
            }else{
                return false;
            }
        }
    }
    const moveCursorToEnd = () =>{
        var el=document.getElementById(`token_ccr${metodoColeccion?.product_name}`);
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }
    const changeAmount = () =>{
        if(!(tokenCcr==null || tokenCcr==undefined || tokenCcr=="")){
            if(tokenCcr.length==1){
                setTokenCcr("0,0"+tokenCcr);
            }else{
                if(tokenCcr.length==2){
                    setTokenCcr("0,"+tokenCcr);
                }
            }
        }
    }
    const inputEvent = (event) =>{
        if(!(event==null || event==undefined || event=="")){
            if(!(event.data==null || event.data==undefined || event.data=="")){
                if(regex.test(event.data)){
                    if(tokenCcr!=null){
                        if(tokenCcr.length==4){
                            if(tokenCcr=="0,00"){
                                if(event.data==0 || event.data=="0"){
                                    document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,00";
                                    return false;
                                }else{
                                    document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,0"+event.data;
                                    return false;
                                }
                            }else{
                                if(tokenCcr.substring(0,3)=="0,0"){
                                    document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,"+tokenCcr.charAt(tokenCcr.length-1)+event.data;
                                    return false;
                                }else{
                                    if(tokenCcr.charAt(0)=="0" || tokenCcr.charAt(0)==0){
                                        document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value=tokenCcr.charAt(2)+","+tokenCcr.charAt(3)+event.data;
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }else{
                    return false;
                }
            }else{
                if(event.inputType=="deleteContentBackward"){
                        if(tokenCcr!=null){
                        if(tokenCcr==""){
                            document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,00";
                        }else{
                            if(tokenCcr.length==3){
                                document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,"+tokenCcr.charAt(0)+tokenCcr.charAt(2);
                            }
                        }
                    }else{
                        document.getElementById(`token_ccr${metodoColeccion?.product_name}`).value="0,00";
                    }
                }
            }
        }
    }
    const setMaskMonto = () =>{
		jQuery(`#token_ccr${metodoColeccion?.product_name}`).mask("#.##0,00", {reverse: true});	
		var el=document.getElementById(`token_ccr${metodoColeccion?.product_name}`);
		if (typeof el.selectionStart == "number") {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange != "undefined") {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
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
        setErrorTarjeta("");
        setExpiration("");
        setCcv("");
        setPin("");
        setTipoCuenta("PRINCIPAL");
        setDocumentType("V");
        setVerifyDisabled(false);
        setBankImage("");
        setBankName("");
        setShowOtpBank(false);
        setShowOtpCcr(false);
        setErrorTarjeta("");
        setRowClass("col-lg-6 col-md-6 col-sm-6 col-12");
    };
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement("div", { className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'center' } },
            bankImage && React.createElement("img", { src: bankImage, className:'mini-size-img', style: { objectFit: 'contain' } }),
            bankName && React.createElement("h5", { className: "font-bold" }, bankName),
        ),
        React.createElement("div", {className:"row", style:{ marginTop:'15px' }},
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { textAlign: 'center' } },
                React.createElement("div", { className: "form-floating", style: { marginBottom: '0px' } },
                    React.createElement("input", {
                        type: "text",
                        id: `cardHolder${metodoColeccion?.product_name}`,
                        name: `cardHolder${metodoColeccion?.product_name}`,
                        className: "form-control font-regular",
                        style: { textTransform: 'uppercase' },
                        maxLength: "50",
                        value: cardHolderValue,
                        onChange: (e) => setCardHolder(e.currentTarget.value),
                        onKeyPress: (e) => keypressLetras(e)
                    }),
                    React.createElement("label", { htmlFor: `cardHolder${metodoColeccion?.product_name}`, className: `font-regular` }, "Nombres y apellidos")
                ),                
            ),
            React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
                React.createElement("div", { className: "input-group", style: { marginBottom: '0px' } },
                    React.createElement("select", {
                        className: "input-group-text",
                        id: `documentType${metodoColeccion?.product_name}`,
                        name: `documentType${metodoColeccion?.product_name}`,
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
                                id: `id_doc${metodoColeccion?.product_name}`,
                                name: `id_doc${metodoColeccion?.product_name}`,
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDocValue,
                                onChange: (e) => setIdDoc(e.currentTarget.value),
                                onKeyPress: (e) => {
                                    keypressNumeros(e);
                                },
                                // onPaste: (e) => e.preventDefault(),
                                // onDrag: (e) => e.preventDefault()
                            })
                            : React.createElement("input", {
                                type: "text",
                                maxLength: "9",
                                className: "form-control",
                                inputMode: "numeric",
                                id: `id_doc${metodoColeccion?.product_name}`,
                                name: `id_doc${metodoColeccion?.product_name}`,
                                style: { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
                                value: idDocValue,
                                onChange: (e) => setIdDoc(e.currentTarget.value),
                                onKeyPress: (e) => {
                                    keypressNumeros(e);
                                },
                                // onPaste: (e) => e.preventDefault(),
                                // onDrag: (e) => e.preventDefault()
                            }),
                        React.createElement("label", { htmlFor: `id_doc${metodoColeccion?.product_name}`,className: "font-regular" }, "Nro. documento")
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
                            id: `nroTarjeta${metodoColeccion?.product_name}`,
                            name: `nroTarjeta${metodoColeccion?.product_name}`,
                            onKeyPress: (e) => keypressNumeros(e),
                            disabled: verifyDisabled,
                            value: nroTarjetaValue,
                            onChange: (e) => setNroTarjeta(e.currentTarget.value),
                            onBlur: (e) => getCardInfo(nroTarjetaValue)
                        }),
                        React.createElement("label", { htmlFor: `nroTarjeta${metodoColeccion?.product_name}`, className: "font-regular" }, "Nro. Tarjeta")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShowCard(nroTarjetaValue,`nroTarjeta${metodoColeccion?.product_name}`, ojitoTarjetaValue, setOjitoTarjeta)
                    },
                        React.createElement("img", { src: ojitoTarjetaValue, height: "18px", width: "18px", alt: "Toggle card visibility", style:{ margin: '0px' } })
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
                            onBlur: (e) => verifyExpiration(e.target.value),
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
                        React.createElement("label", { htmlFor: `ccv${metodoColeccion?.product_name}`, className: "font-regular"}, "CCV")
                    ),
                    React.createElement("button", {
                        type: "button",
                        className: "btn btn-outline-primary font-regular",
                        style: { width: '20%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
                        onClick: () => changeTypeInputShow(`ccv${metodoColeccion?.product_name}`, ojitoCcvValue, setOjitoCcv)
                    },
                        React.createElement("img", { src: ojitoCcvValue, height: "18px", width: "18px", alt: "Toggle CCV visibility", style:{ margin: '0px' }})
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
                        React.createElement("img", { src: ojitoPinValue, height: "18px", width: "18px", alt: "Toggle PIN visibility", style:{ margin: '0px' } })
                    )
                )
            ),
        ),
        showOtpCcr && React.createElement( "div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
            React.createElement("div", { className: "form-floating" },
                React.createElement("input", {
                    type: "text",
                    onKeyUp: (e) => devolverEvent(e),
                    onKeyPress: (e) => getEventMonto(e),
                    onClick: () => moveCursorToEnd(),
                    onKeyDown: (e) => keyDown(e),
                    onFocus: () => setMaskMonto(),
                    onChange: () => changeAmount(),
                    onInput: (e) => inputEvent(e),
                    // onPaste: (e) => e.preventDefault(),
                    inputMode: "numeric",
                    maxLength: 20,
                    className: "form-control",
                    id: `token_ccr${metodoColeccion?.product_name}`,
                    name: `token_ccr${metodoColeccion?.product_name}`,
                    style: { textTransform: 'uppercase' },
                    value: tokenCcr,
                    onChange: (e) => setTokenCcr(e.target.value)
                }),
                React.createElement("label", { htmlFor: `token_ccr${metodoColeccion?.product_name}` }, "Tokenn")
            )
        ),
        showOtpBank && React.createElement("div", { className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12", style: { marginBottom: '15px' } },
            React.createElement("div", { className: "form-floating" },
                React.createElement("input", {
                    type: "text",
                    maxLength: 10,
                    className: "form-control",
                    id: `token${metodoColeccion?.product_name}`,
                    name: `token${metodoColeccion?.product_name}`,
                    style: { textTransform: 'uppercase' },
                    value: tokenBank,
                    onChange: (e) => setTokenBank(e.target.value),
                    inputMode: "numeric",
                    onKeyPress: (e) => keypressNumeros(e)
                }),
                React.createElement("label", { htmlFor: `token${metodoColeccion?.product_name}` }, "Token")
            )
        ),
        React.createElement("div", { className: "row col-lg-12 offset-md-12 col-md-12 col-sm-12 col-12 mt-2 reportButtons", style: { justifyContent: 'right', display: 'flex', marginTop: '15px' } },
            showOtpBank && React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-danger btn-lg",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => sendBankToken()
                }, "Solicitar token")
            ),
            showOtpCcr && React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 col-12", style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-danger btn-lg",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => verifyData('TOKEN')
                }, "Solicitar token")
            ),
            React.createElement("div", { className: rowClass, style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn-lg button-clean font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => clean(),
                }, "Limpiar")
            ),
            React.createElement("div", { className: rowClass, style: { textAlign: 'right' } },
                React.createElement("button", {
                    type: "button",
                    className: "btn btn btn-lg button-payment font-regular",
                    style: { margin: '10px', fontSize: '14px', width: '100%' },
                    onClick: () => verifyData('PAY'),
                }, "Pagar")
            ),
        ),
        React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Procesado por: "),
            React.createElement("img", { src: credicard, className: 'mini-size-img max-width-important', height: "40px", style: { objectFit: 'contain' } }),
        ),
        metodoColeccion?.product_name=='TDD_API' && React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Bancos aliados: "),
            React.createElement("img", { src: master_card, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: venezuela, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancaribe, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: mibanco, height: "40px" , className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancrecer, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bancamiga, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: banfanb, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: tesoro, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: bicentenario, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            // React.createElement("img", { src: bfc, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
        ),
        metodoColeccion?.product_name=='TDC_API' && React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12", style: { textAlign: 'left' } },
            React.createElement("label", { className: 'font-bold' }, "Marcas aliadas: "),
            React.createElement("img", { src: visa, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
            React.createElement("img", { src: master_card, height: "40px", className: 'mini-size-img', style: { objectFit: 'contain' } }),
        ),
        React.createElement('div', { id:`msgConfirmCredicard${metodoColeccion?.product_name}`, 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
            React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
                React.createElement('div', { className: 'modal-content' },
                    React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                        React.createElement('h5',{ className: 'modal-title font-regular' },'Confirmar transacción'),
                        React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal(`msgConfirmCredicard${metodoColeccion?.product_name}`)}, 'aria-label': 'Cerrar'},
                            React.createElement('span', { 'aria-hidden': 'true' }, '×')
                        )
                    ),
                    React.createElement('div', { className: 'modal-body'},
                        React.createElement('p', { className: 'font-regular'}, `¿Estás seguro que deseas procesar la transacción por un monto de: Bs. ${parseAmount(totalAmount)}?`)
                    ),
                    React.createElement('div', { className: 'modal-footer' },
                        React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                                onClick: () => {closeModal(`msgConfirmCredicard${metodoColeccion?.product_name}`)},
                            },
                            React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                        ),
                        React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => paymentFun(`msgConfirmCredicard${metodoColeccion?.product_name}`, metodoColeccion),
                        },
                            React.createElement('span',{className: 'font-regular' }, 'Pagar')
                        ),
                    )
                )
            )
        ),
    );
};