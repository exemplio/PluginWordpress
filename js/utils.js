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
function completeDoc(data) {
  let doc = data;
  if (!(data == null || data == undefined || data == "")) {
      if (!utils_keyNumber(data.trim())) {

          return;
      }
      if (data.trim().length < 9) {
          var numero = 9 - data.trim().length;
          var texto = "";
          for (var i = 0; i < numero; i++) {
              texto = texto + "0";
          }
          doc = texto + doc;
          return doc
      } else {
          doc = data;
      }
  }
};
function checkPwd(str) {
  var t = /[ !#$%&()*+,\-./:;?@[\\\]^_{}]/;
  var excepto = /[ = | ; “ ” ´" '< >~*]/;
  var mayu = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
  if (str == null || str == undefined || str == "") {
      return "Contraseña vacía";
  } else {
      str = str.trim();
      if (str.length < 8) {
          return "Contraseña debe tener minimo 8 digitos";
      } else if (str.length > 20) {
          return "Contraseña no debe ser mayor a 20 digitos";
      } else if (str.search(/\d/) == -1) {
          return "Contraseña debe tener al menos un número";
      } else if (!mayu.test(str)) {
          return "La contraseña debe contener al menos una mayúscula";
      } else if (str.search(/[a-zA-Z]/) == -1) {
          return "Contraseña debe tener al menos un letra";
      } else if (str.search(/[a-z]/) == -1) {
          return "Contraseña debe tener al menos una letra minúscula";
      }
      else if (!t.test(str)) {
          return "Contraseña debe tener al menos un caracter especial de los siguientes !#$%&()+/\-.//:?@_{}";
      } else if (excepto.test(str)) {
          return "La contraseña no permite los siguientes caracteres especiales = | ; “ ” ´\" '< >~ *";
      }
      return null;
  }
}
function listaMetodosDePago() {
  return [
      { name: "Transferencia inmediata" },
      { name: "Transferencia Bancaria" },
      { name: "Pago Móvil offline" },
      { name: "Pago Móvil en Linea" },
      { name: "Deposito bancario" },
      { name: "Efectivo" }
  ]
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
function transformResponse(response) {
  // Función interna para extraer el valor de un campo
  const extractFieldValue = (field) => {
      if (field.stringValue !== undefined) {
          return field.stringValue;
      }
      if (field.integerValue !== undefined) {
          return parseInt(field.integerValue, 10);
      }
      if (field.doubleValue !== undefined) {
          return parseFloat(field.doubleValue);
      }
      if (field.booleanValue !== undefined) {
          return field.booleanValue;
      }
      if (field.timestampValue !== undefined) {
          // Convertir el valor de timestamp a un formato amigable
          return formatDate(field.timestampValue); // Usar la función formatDate
      }
      if (field.mapValue) {
          return transformFields(field.mapValue.fields);
      }
      if (field.arrayValue) {
          return field.arrayValue.values.map(extractFieldValue);
      }
      if (field.nullValue !== undefined) {
          return null;
      }
      return null; // Si no hay un valor válido
  };

  // Función interna para transformar los campos
  const transformFields = (fields) => {
      const transformedFields = {};
      for (const key in fields) {
          transformedFields[key] = extractFieldValue(fields[key]);
      }
      return transformedFields;
  };

  // Verifica si la respuesta es un objeto y tiene la estructura esperada
  if (Array.isArray(response)) {
      return response.map(item => {
          // Verifica si el documento tiene campos
          if (item.document?.fields) {
              return transformFields(item.document.fields);
          }
          return null; // Si no hay campos, devolver null
      }).filter(item => item !== null); // Filtrar los nulls
  }

  // Si la respuesta no es válida, devolver un arreglo vacío
  return [];
};

function getNextPrefix(prefix) {
  // Verifica si el prefijo es un número
  if (!isNaN(prefix)) {
      // Si es un número, conviértelo a un número y súmale 1
      return (parseInt(prefix, 10) + 1).toString();
  }

  // Si no es un número, trata como un prefijo de texto
  let chars = prefix.split('');
  let lastChar = chars.pop();

  // Incrementa el último carácter
  let nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);

  // Regresa el prefijo con el nuevo carácter
  return chars.join('') + nextChar;
}
function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, '0'); // Obtener el día
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Obtener el mes (0-11)
  const year = date.getUTCFullYear(); // Obtener el año
  return `${day}-${month}-${year}`; // Retornar en formato DD-MM-YYYY
};
function getTypesIdDoc(){
	return ["V","E","J","P","G"];
}
function getTypesAccount(){
	return ['PRINCIPAL','CORRIENTE','AHORRO'];
}
function getPrefixArea(){
	return [{to_show: "(414)", value:"414"},{to_show: "(424)", value:"424"},{to_show: "(412)", value:"412"},{to_show: "(416)", value:"416"},{to_show: "(426)", value:"426"}];
}