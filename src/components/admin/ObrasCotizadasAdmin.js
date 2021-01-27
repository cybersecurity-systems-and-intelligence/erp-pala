import { Fragment, useEffect } from 'react';

import Obras from '../Obras'

import { llamada } from '../../libs/llamadas'

const ObrasCotizadasAdmin = ({obra, datosgenerales, guardarDatosGenerales, cantidadcards, guardarObra, rowsobrascotizadas, guardarRowsObrasCotizadas, obrascotizadas, guardarObrasCotizadas, tipobusqueda, guardarTipoBusqueda}) => {
    const {folio_obra} = obra

    useEffect(() => {
        const consultarAPI = async() => {
            const respObrasCoti = await llamada(`https://apicotizacion.herokuapp.com/api/cotizaciones/${folio_obra}`, 'get')
            const obrasCoti = respObrasCoti.data.Cotizacion.map(obra => (
                {
                  folioObra: obra.folio_obra,
                  folioCotizacion: obra.folio_cotizacion,
                  nombreObra: obra.nombre_obra,                   
                }
              ))
              guardarObrasCotizadas(respObrasCoti.data.Cotizacion)              
              guardarRowsObrasCotizadas(obrasCoti)
        }
        consultarAPI()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Obras              
                titulo={'Obras Cotizadas'}
                siguientecomponente={4}
                guardarObra={guardarObra}
                rows={rowsobrascotizadas}      
                guardarRows={guardarRowsObrasCotizadas}        
                obrastotal={obrascotizadas}
                obrascotizadas={obrascotizadas}
                totalpaginas={Math.ceil(rowsobrascotizadas.length/cantidadcards)} 
                datosgenerales={datosgenerales}
                guardarDatosGenerales={guardarDatosGenerales}
                cantidadcards={cantidadcards}
                bandObrasCotizadas={true}
                tipobusqueda={tipobusqueda}
                guardarTipoBusqueda={guardarTipoBusqueda}
                seleccionpor={"cotizacion"}
            />
        </Fragment>
    );
}
 
export default ObrasCotizadasAdmin;