import { Fragment, useEffect } from 'react';
import axios from 'axios'
import Obras from '../Obras'

const ObrasCotizadasAdmin = ({obra,paginaactual,guardarPaginaActual, paginafinal, guardarPaginaFinal,cantidadcards,page, setPage, guardarObra, rowsobrascotizadas, guardarRowsObrasCotizadas, obrascotizadas, guardarObrasCotizadas, bandObrasCotizadas, tipobusqueda, guardarTipoBusqueda}) => {
    const {folio_obra} = obra

    useEffect(() => {
        const consultarAPI = async() => {
            const respObrasCoti = await axios.get(`https://apicotizacion.herokuapp.com/api/cotizaciones/${folio_obra}`)
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
                paginaactual={paginaactual}  
                guardarPaginaActual={guardarPaginaActual}
                paginafinal={paginafinal}
                guardarPaginaFinal={guardarPaginaFinal}
                page={page}
                setPage={setPage}
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