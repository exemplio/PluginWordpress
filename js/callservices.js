var _url = getApi();
var timeout="120000";
var enlace1=getEnlaceApiV1();
var enlace2=getEnlaceApiV2();
var enlace3 = getEnlaceApiV3();

function getBearerToken(){
	return JSON.parse(localStorage.getItem('authorize-credentials'))?.access_token;
}

function callServices(url, method, headers, body, auth){
	return new Promise((resolve, reject) => {
		if(auth){
			headers['Authorization']='bearer '+ getBearerToken();
		}
		ActiveLoading();
		fetch(
			url,
		{				
			method: method,
			headers: headers,
			processData: false,
			body: method!= "GET" ? JSON.stringify(body) : null,
			contentType: "application/json; charset=UTF-8",
		})
		.then(response => {
			if (!response.ok) {
				if (response?.status == 401 || response?.status == "401" || response?.status == 403 || response?.status == "403") {
					processResponse(response);
					return;					
				}
				return response.json();
			}
			return response.json();
		})
		.then(data => {			
			resolve(data);			
		})
		.catch(error => {
			console.log(processError(error, "Error"));
			reject(error);
		})
		.finally(() => {
			if (!url.includes('payco/payment')) {
				HideLoading();				
			}			
		})
	});
}

function callServicesAjax(url, body){
	return new Promise((resolve,reject) => {
		ActiveLoading();
		$.ajax({
            url: url,
            type: 'POST',
            data: {
                action: body,
            },
            success: function(response) {
                resolve(response);
            },
            error: function(xhr, status, error) {
                reject(xhr);
            }
        });		
	});
}

function callServicesHttp(ser,querys,data){
	let request=null;
	var headers = {
		'Content-Type': 'application/json',
	};
	switch(ser){
		case 'get-credentials':{
			request=callServices(_url+`/oauth/authorize?client_id=${getClientId()}&client_secret=${getClientSecret()}`,"POST",headers,'',false);
			return request;
		}break;
		case 'get-collect-channel':{
			request=callServices(_url+`/payco/collect_channel_info?realm=${getRealm()}&business_id=${getBusinessId()}&channel_id=${getChannelId()}`+querys,"GET",headers,data,true);			
			return request;
		}break;
		case 'get-commision':{
			request=callServices(_url+'/payco/card_holder_commission'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'verify-card':{
			request=callServices(_url+'/payco/card_info'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'send-bank-token':{
			request=callServices(_url+'/payco/send_bank_token'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'send-token-with-card':{
			request=callServices(_url+'/payco/send_token_with_card'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'send-mercantil-token':{
			request=callServices(_url+'/payco/mercantil_send_otp'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'payment':{
			request=callServices(_url+'/payco/payment'+querys,"POST",headers,data,true);
			return request;
		}break;
		case 'customer-info':{
			request=callServicesAjax(querys,data);
			return request;
		}break;
		case 'redirect':{
			request=callServicesAjax(querys,data);
			return request;
		}break;
		default:{
		}
	}
}

function processResponse(res){
	var status=null;
	if(!(res?.status==null || res?.status==undefined)){
	   status=res?.status;
		if(status==202 || status=="202" || status=="403" || status==403 || status=="401" || status==401){
			sendModalValue("msgError","Error: Ha ocurrido un problema. Por favor, recarga la página");
			$("#msgError").modal("show");			
			return;
		}
	}
}

function processError(err,msg){
	let mensaje=msg;
	try {
		var status = "";
		if (err.hasOwnProperty('status')) {
			var contexto=this;
			status = err.status + ', ';
			if(err.status==401){
				mensaje="Sesión cerrada";
				setTimeout(function() {
					window.location.href=getLoginUri();
				}, 2000);
			}else{
				if(err.status==403){
					mensaje="Sesión expirada";
					setTimeout(function() {
					window.location.href=getLoginUri();
				}, 2000);
				}else{
					if (err.hasOwnProperty('_body')) {
						var aux = JSON.parse(err._body);
						if (aux.hasOwnProperty('message')) {
							if(aux.message==null || aux.message==undefined || aux.message==""){
								mensaje=msg;
							}else{
								if(aux.message.toUpperCase()=="FAILED_REQUEST"){
									mensaje=msg;
								}else{
									mensaje= status + translate(aux.message, 'ES').toUpperCase();
								}
							}
						} else {
							if (err.hasOwnProperty('statusText')) {
								mensaje = status + err.statusText;
							} else {
								mensaje = msg;
							}
						}
					} else {
						mensaje = msg;
					}
				}
			}
		}else{
			mensaje=msg;
		}
	} catch (err1) {
		mensaje = msg;
	}
	return mensaje;
}

function processMessageError(data,mensaje){
	if (data.hasOwnProperty('message')) {
		var auxMsg = "";
		var titleMsg = "";
		if (data.message == null || data.message == undefined || data.message == "") {
			titleMsg =mensaje;
		} else {
			data.message=data.message.toLowerCase();
			titleMsg = translate(data.message);
		}
		if (data.hasOwnProperty('cause')) {
			if (!(data.cause == null || data.cause == undefined || data.cause == "" || data.cause.length == 0)) {
				for (var i = 0; i < data.cause.length; i++) {
					if(data.cause[i]!=null){
						data.cause[i]=data.cause[i].toLowerCase();
						auxMsg = auxMsg+ " "+ translate(data.cause[i]);
					}
				}
				if (auxMsg != "") {
					titleMsg = titleMsg+ ": " + auxMsg;
				}
			}
		}
		mensaje = titleMsg;
		return mensaje;
	} else {
		return mensaje;
	}
}