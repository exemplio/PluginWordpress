var _url = php_var?.url_link;

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
				if (response?.status == 401 || response?.status == "401" || response?.status == 403 || response?.status == "403" || response?.status == 502 || response?.status == "502") {
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
		jQuery.ajax({
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
			request=callServices(_url+`/payco/collect_channel_info?channel_id=${getChannelId()}`+querys,"GET",headers,data,true);			
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
		case 'mercantil-send-otp':{
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
			openModal('msgError');			
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

function publicKeyPay(){
	return "-----BEGIN PUBLIC KEY-----"+
	"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlZsOvWornKePU+ssZl3V"+
	"hOy8vExZTRSosd4bgmsj4dRCAs9Uosw4i47go+aABkmbVW1wrvNxhJmUvtbBk9IH"+
	"ueunWR7bd4ZmRQvxldPeo1QQBaFdR9a9xGGLvpLdHJHf8EqQeJj85a5+kKmjjNA3"+
	"pXUZejiAOR6c7LnzVImaZbgSSvghmeN7jg6gJ+yL4a3t6xK9CcBD8EKkVnD7Ry4/"+
	"6nhV9v8r1lfRgECSBPdpNCSdQxJeCGUz0Zrb7QIp6ccjNRGCQga6F/XuPAoG/5qo"+
	"kPrjW6FD35DxUx5DGKWGj9VnBAKsD13cW8rcTZB60BzZX39QTbNRNJ6o+Am/dhcZ"+
	"VNzv9F6lJJ0T50kVzUsN8tDDDnW8LCe7U1O1vLGN8/kLVFW4XjaJDJmKISLqEmS+"+
	"ydLM/9zHLdOG/gHHXn8yVK8/TpXI8rOKo/B8VRHVqGKeVSWEmuFM4FxsgUD9xLMi"+
	"kZFIzd4pJVJBePU8GihrjhtBs8Xve/NWg2i8HN3qm7E7Z8E5iwM1R5YFSLVbfIRz"+
	"E4QDCAVQgUhNk+WkM4sYVXjOSdzg8w8qVedOsNH6REpZsN5+u5Xof9+/KogujsVb"+
	"EiOVmxrty2hXh73G5yfLlIaxQZO3YwUoE/UGN7qx2HnNChdP/LsexthuIjLcDdXP"+
	"uESdH/bsClMcj7N/gC7gRO0CAwEAAQ=="+
	"-----END PUBLIC KEY-----";
}