function utils_keyNumber(data) {
  var patron = /^[0-9]*$/;
  if (patron.test(data))
      return true;
  else
      return false;
}
function keypressNumeros(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "0123456789";
  var especiales = [8];
  var tecla_especial = false
  for (var i in especiales) {
      if (key == especiales[i]) {
          tecla_especial = true;
          break;
      }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      event.preventDefault();
  }
}
function keypressLetras(event) {
  const key = event.key.toLowerCase();
  const allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', 'backspace', 'delete', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'];

  if (!allowedKeys.includes(key)) {
      event.preventDefault();
  }
}
function allBanks() {
  return [
      {
          code: "0102",
          name: "Banco de Venezuela S.A.C.A. Banco Universal",
          rif: "G200099976"
      },
      {
          code: "0104",
          name: "Venezolano de Crédito, S.A. Banco Universal",
          rif: "J000029709"
      },
      {
          code: "0105",
          name: "Banco Mercantil, C.A. Banco Universal",
          rif: "J000029610"
      },
      {
          code: "0108",
          name: "Banco Provincial, S.A. Banco Universal",
          rif: "J000029679"
      },
      {
          code: "0114",
          name: "Bancaribe C.A. Banco Universal",
          rif: "J000029490"
      },
      {
          code: "0115",
          name: "Banco Exterior C.A. Banco Universal",
          rif: "J000029504"
      },
      {
          code: "0116",
          name: "Banco Occidental de Descuento, Banco Universal C.A",
          rif: "J300619460"
      },
      {
          code: "0128",
          name: "Banco Caroní C.A. Banco Universal",
          rif: "J095048551"
      },
      {
          code: "0134",
          name: "Banesco Banco Universal S.A.C.A.",
          rif: "J070133805"
      },
      {
          code: "0137",
          name: "Banco Sofitasa, Banco Universal",
          rif: "J090283846"
      },
      {
          code: "0138",
          name: "Banco Plaza, Banco Universal",
          rif: "J002970553"
      },
      {
          code: "0146",
          name: "Banco de la Gente Emprendedora C.A",
          rif: "J301442040"
      },
      {
          code: "0151",
          name: "BFC Banco Fondo Común C.A. Banco Universal",
          rif: "J000723060"
      },
      {
          code: "0156",
          name: "100% Banco, Banco Universal C.A.",
          rif: "J085007768"
      },
      {
          code: "0157",
          name: "DelSur Banco Universal C.A.",
          rif: "J000797234"
      },
      {
          code: "0163",
          name: "Banco del Tesoro, C.A. Banco Universal",
          rif: "G200051876"
      },
      {
          code: "0166",
          name: "Banco Agrícola de Venezuela, C.A. Banco Universal",
          rif: "G200057955"
      },
      {
          code: "0168",
          name: "Bancrecer, S.A. Banco Microfinanciero",
          rif: "J316374173"
      },
      {
          code: "0169",
          name: "Mi Banco, Banco Microfinanciero C.A.",
          rif: "J315941023"
      },
      {
          code: "0171",
          name: "Banco Activo, Banco Universal",
          rif: "J080066227"
      },
      {
          code: "0172",
          name: "Bancamica, Banco Microfinanciero C.A.",
          rif: "J316287599"
      },
      {
          code: "0173",
          name: "Banco Internacional de Desarrollo, C.A. Banco Universal",
          rif: "J294640109"
      },
      {
          code: "0174",
          name: "Banplus Banco Universal, C.A",
          rif: "J000423032"
      },
      {
          code: "0175",
          name: "Banco Bicentenario del Pueblo de la Clase Obrera, Mujer y Comunas B.U.",
          rif: "G200091487"
      },
      {
          code: "0177",
          name: "Banco de la Fuerza Armada Nacional Bolivariana, B.U.",
          rif: "G200106573"
      },
      {
          code: "0191",
          name: "Banco Nacional de Crédito, C.A. Banco Universal",
          rif: "J309841327"
      },
      {
          code: "0601",
          name: "Instituto Municipal de Crédito Popular",
          rif: "G200068973"
      }
  ];
}
function getTypesIdDoc(){
	return ["V","E","J","P","G"];
}
function getTypesAccount(){
	return ['PRINCIPAL','CORRIENTE','AHORRO'];
}
function getPrefixArea(){
	return [{to_show: "(414)", value:"414"},{to_show: "(424)", value:"424"},{to_show: "(412)", value:"412"},{to_show: "(416)", value:"416"},{to_show: "(426)", value:"426"}];
}
function translate(s) {
    if (typeof(i18n)!='undefined' && i18n[s]) {
       return i18n[s];
     }
     return s;
}
function parseAmount(n, p, ts, dp){
    try {
      var t = [];
          if (typeof p  == 'undefined') p  = 2;
          if (typeof ts == 'undefined') ts = '.';
          if (typeof dp == 'undefined') dp = ',';
        
          n = Number(n).toFixed(p).split('.');
          for (var iLen = n[0].length, i = iLen? iLen % 3 || 3 : 0, j = 0; i <= iLen; i+=3) {
            t.push(n[0].substring(j, i));
            j = i;
          }
          return t.join(ts) + (n[1]? dp + n[1] : '');
    } catch (error) {
      console.log(error);
    }
}
function addZeros(number, length){
    var n = '' + number;
          while (n.length < length) {
              n = '0' + n;
          }
          return  n;
}
function enmascararTarjeta (data){
    try{
        var data1=data.substring(0,6)+"-";
        for(var i=5;i <data.length-4;i++){
            data1=data1+"X";
        }
        data1=data1+"-"+data.substring(data.length-4,data.length);
        return data1;
    }catch(Er){
        return data;
    }
}