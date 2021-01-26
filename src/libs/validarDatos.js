const Joi = require('joi')

//se crea el schema de las validaciones la cual tiene varias restricciones
const schema = Joi.object({
    cp: Joi.string()
        .pattern(new RegExp('^[0-9]{5,5}$')),

    numerico: Joi.string()
        .pattern(new RegExp('^[0-9]{0,300}$')),

    telefono: Joi.string()
        .pattern(new RegExp('^[0-9]{10,10}$')),

    alfanumerico: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9 ]{0,300}$')),
    
    rfc: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{0,300}$')),

    ciudad: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9áéíóúáéíóúÁÉÍÓÚ ]{3,100}$')),

    letras: Joi.string()
        .pattern(new RegExp('^[a-zA-Z ]{0,300}$')),

    correo: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))
})


const validarVaciosDatosFiscales = (datosfiscales) => {    

    const { nombreMoralFisica, rfc, direccionFiscal, direccionOficina } = datosfiscales
    const { calleReferencia1, calleReferencia2, cp, colonia } = datosfiscales
    const { ciudad, estado } = datosfiscales
    

    if ( nombreMoralFisica.trim() === '' || rfc.trim() === '' || direccionFiscal.trim() === ''){
        return false
    }else if (direccionOficina.trim() === '' || calleReferencia1.trim() === '' || calleReferencia2.trim() === ''){
        return false
    }else if ( cp.trim() === '' || colonia.trim() === '' || ciudad.trim() === '' || estado.trim() === ''){
        return false
    }    
    return true
}
const validarVaciosDatosPersonales = (datospersonales) => {
    const { correo, nombreContacto, telefonoFijo, telefonoMovil} = datospersonales

    if ( correo.trim() === '' || nombreContacto.trim() === '' || telefonoFijo.trim() === '' || telefonoMovil.trim() === '' ) {
        return false
    }
    return true
}

const validarVaciosDatosBancarios = (datosbancarios) => {
    const { numeroClave, cuenta, razonSocial } = datosbancarios

    if ( numeroClave.trim() === '' || cuenta.trim() === '' || razonSocial.trim() === '' ) {
        return false
    }
    return true
}

const verificarFormatoDatosFiscales = (errorRfc, errorCp, errorColonia, errorCiudad, errorEstado ) =>{
    if(errorRfc === true){      
      return [false, 'El RFC solo debe de tener caracteres alfanumericos']
    }else if (errorCp === true){      
      return [false, 'El CP solo debe de tener 5 digitos numericos']
    }else if (errorColonia === true){      
      return [false, 'La Colonia solo debe de tener caracteres alfanumericos']
    }else if (errorCiudad === true){      
      return [false, 'La Ciudad solo debe de tener caracteres alfanumericos']
    }else if (errorEstado === true){      
      return [false, 'El Estado solo debe de tener letras']
    }
    return [true, '']
}

const verificarFormatoDatosPersonales = ( errorCorreo, errorNombreContacto, errorTelefonoFijo, errorTelefonoMovil ) => {
    if(errorCorreo === true){      
        return [false, 'El correo debe escribirse de forma correcta, ejemplo: jhon_due@mail.com']
    }else if (errorNombreContacto === true){      
        return [false, 'El Nombre de contacto solo debe tener letras']
    }else if (errorTelefonoFijo === true){      
        return [false, 'El telefono Fijo debe tener 10 digitos numericos']
    }else if (errorTelefonoMovil === true){      
        return [false, 'El telefono Movil debe tener 10 digitos numericos']
    }
    return [true, '']
}

const verificarFormatoDatosBancarios = ( errorNumeroClave, errorCuenta ) =>{
    if( errorNumeroClave === true ) {      
        return [ false, 'El Numero de Clave debe tener caracteres alfanumericos' ]
    }else if ( errorCuenta === true ) {      
        return [ false, 'La cuenta debe tener caracteres numericos' ]
    }
    return [ true, '' ]
}

module.exports = {
    validarVaciosDatosFiscales,
    validarVaciosDatosPersonales,
    validarVaciosDatosBancarios,
    schema,
    verificarFormatoDatosFiscales,
    verificarFormatoDatosPersonales,
    verificarFormatoDatosBancarios
}