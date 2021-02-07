const { llamada } = require('./llamadas')

export const cargarDatosProv = async(correo) => {
    const respObrasDisp = await llamada('https://apicotizacion.herokuapp.com/api/obras/vigentes', 'get')
    const respObrasCoti = await llamada(`https://apicotizacion.herokuapp.com/api/cotizaciones/cotizadas/${correo}`, 'get')
    const respPerfil = await llamada(`https://apicotizacion.herokuapp.com/api/proveedores/datos_personales/${correo}`, 'get')
    
    const respuesta = {
        respObrasDisp: respObrasDisp.data.Obras.reverse(),
        respObrasCoti: respObrasCoti.data.Obras.reverse(),
        respPerfil: respPerfil.data.datos_personales
    }

    return respuesta 
}

export const cargarDatosAdmin = async() => {
    const respObrasCread = await llamada('https://apicotizacion.herokuapp.com/api/obras', 'get')
        
    const respuesta = {
        respObrasCread: respObrasCread.data.Obras.reverse()
    }
    return respuesta
}

export const cargarCotizaciones = async(folio_obra) => {
    const respObrasCoti = await llamada(`https://apicotizacion.herokuapp.com/api/cotizaciones/${folio_obra}`, 'get')

    const respuesta = {
        respObrasCoti: respObrasCoti.data.Cotizacion.reverse()
    }
    return respuesta
}

