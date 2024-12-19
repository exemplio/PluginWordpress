var _url = getApi();
var loading = loading;
var timeout="120000";
var enlace_auth='';
var enlace_api='';
var enlace1=getEnlaceApi();
var enlace_deegle=getEnlaceApiV1();
var url_open=getPaguetodoOpen();

async function callServices(url, method, headers, data){
	await fetch(
			url,
		{				
			type: method,
			headers: headers,
			processData: false,
			data: JSON.stringify(data),
			contentType: "application/json; charset=UTF-8",
			showLoader: true,
			success: function(response) {
				resolve(response);
			},
			error: function(response) {
				reject(response);						
				console.log(processError(response,"Error"))
			}
		});			
}

function callServicesHttp(ser,querys,data){
	let request=null;
	var headers = {
		'App-Id': getClient(),
		'X-Paguetodo-Id': getPaguetodoId()
	};
	switch(ser){
		case 'get-commision':{
			request=callServices(_url+url_open+'/movistar_sales_open/credicard_pagos/card_holder_commission'+querys,"POST",headers,data);
			return request;
		}break;
		case 'verify-card':{
			request=callServices(_url+url_open+'/movistar_sales_open/credicard_pagos/card_info'+querys,"POST",headers,data);
			return request;
		}break;
		case 'send-bank-token':{
			request=callServices(_url+url_open+'/movistar_sales_open/credicard_pagos/send_bank_token'+querys,"POST",headers,data);
			return request;
		}break;
		case 'send-token-with-card':{
			request=callServices(_url+url_open+'/movistar_sales_open/credicard_pagos/send_token_with_card'+querys,"POST",headers,data);
			return request;
		}break;
		case 'send-mercantil-token':{
			request=callServices(_url+url_open+'/movistar_sales_open/mercantil_send_otp'+querys,"POST",headers,data);
			return request;
		}break;
		case 'payment':{
			request=callServices(_url+url_open+'/movistar_sales_open/payment'+querys,"POST",headers,data);
			return request;
		}break;
		case 'create-order':{
			request=callServices(_url+url_open+'/movistar_sales_open'+querys,"POST",headers,data);
			return request;
		}break;
		case 'confirm-order':{
			request=callServices(_url+url_open+'/movistar_sales_open/confirm_order'+querys,"PUT",headers);
			return request;
		}break;
		case 'get-order-movistar':{
			request=callServices(_url+url_open+'/movistar_sales_open/order'+querys,"GET",headers);
			return request;
		}break; 
		case 'update-mercadolibre-id':{
			request=callServices(_url+url_open+'/movistar_sales_open/change_order_external_id_open'+querys,"PUT",headers);
			return request;
		}break; 
		default:{
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