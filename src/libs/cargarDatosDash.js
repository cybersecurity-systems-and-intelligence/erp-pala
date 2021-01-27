const { llamada } = require('./llamadas')
const { formatCardProv } = require('./formatters')

export const cargarDatosProv = async(correo) => {
    const respObrasDisp = await llamada('https://apicotizacion.herokuapp.com/api/obras/vigentes', 'get')
    const respObrasCoti = await llamada(`https://apicotizacion.herokuapp.com/api/cotizaciones/cotizadas/${correo}`, 'get')
    const respPerfil = await llamada(`https://apicotizacion.herokuapp.com/api/proveedores/datos_personales/${correo}`, 'get')
    
    const {obrasDisp, obrasCoti} = formatCardProv(respObrasDisp.data.Obras, respObrasCoti.data.Obras )

    const respuesta = {
        respObrasDisp: respObrasDisp.data.Obras,
        obrasDisp: obrasDisp,
        respObrasCoti: respObrasCoti.data.Obras,
        obrasCoti: obrasCoti,
        respPerfil: respPerfil.data.datos_personales
    }

    return respuesta 
}

export const cargarDatosAdmin = async() => {
    const respObrasTotales = await llamada('https://apicotizacion.herokuapp.com/api/obras', 'get')
    const obrasTotales = respObrasTotales.data.Obras.map(obra => (
        {
        folioObra: obra.folio_obra,
        nombreObra: obra.nombre_obra                    
        }
    ))
    const respuesta = {
        respObrasTotales: respObrasTotales.data.Obras,
        obrasTotales: obrasTotales
    }
    return respuesta
}