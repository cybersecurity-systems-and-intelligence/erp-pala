const { llamada } = require('./llamadas')
const { formatCardFolioCoti } = require('./formatters')

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
    const respObrasTotales = await llamada('https://apicotizacion.herokuapp.com/api/obras', 'get')
    
    const obrasTotales = formatCardFolioCoti(respObrasTotales.data.Obras.reverse())
    const respuesta = {
        respObrasTotales: respObrasTotales.data.Obras,
        obrasTotales: obrasTotales
    }
    return respuesta
}

export const cargarCotizaciones = async(folio_obra) => {
    const respObrasCoti = await llamada(`https://apicotizacion.herokuapp.com/api/cotizaciones/${folio_obra}`, 'get')
    const obrasCoti = formatCardFolioCoti(respObrasCoti.data.Cotizacion.reverse())

    

    const respuesta = {
        respObrasCoti: respObrasCoti.data.Cotizacion,
        obrasCoti: obrasCoti
    }
    return respuesta
}

