import { Fragment, useEffect, useState } from 'react';
import { makeStyles,  CssBaseline, Typography, Paper } from '@material-ui/core/';

import Obras from '../Obras'
import Copyright from '../Copyright'
import Error from '../Error'

import { cargarCotizaciones } from '../../libs/cargarDatosDash'

const useStyles = makeStyles((theme) => ({   
   
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    hr:{
        background: 'linear-gradient(#d4e157, #afb42b)',
        alignItems: 'center',
        textAlign: 'center',
        width: '50%',
        borderColor:'#d4e157',
        boxShadow:'2px 2px 5px #999',
        height:'8px',
        borderRadius: '5px',
        marginTop:'1px'
      }
}))

const ObrasCotizadasAdmin = ({obra, datosgenerales, guardarDatosGenerales, cantidadcards, guardarObra, rowsobrascotizadas, guardarRowsObrasCotizadas, obrascotizadas, guardarObrasCotizadas, tipobusqueda, guardarTipoBusqueda}) => {
    const {folio_obra} = obra
    const [ bandObras, guardarBandObras ] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        const consultarAPI = async() => {
            const { respObrasCoti, obrasCoti} = await cargarCotizaciones(folio_obra) 
            
            guardarDatosGenerales({
                ...datosgenerales,
                paginaactual: 0,
                page: 1,
                paginafinal: cantidadcards
            })
            guardarObrasCotizadas(respObrasCoti)              
            guardarRowsObrasCotizadas(obrasCoti)
            obrasCoti.length === 0 ? guardarBandObras(true): guardarBandObras(false)
            console.log(obrasCoti.length);
        }
        consultarAPI()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            {
                bandObras 
                ?
                (
                    <Fragment>
                        <CssBaseline />
                        <main className={classes.layout}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" align="center" component='div'>
                                    Obras Cotizadas
                                    <hr className={classes.hr}/>
                                </Typography>
                                <br/>
                                <Error mensaje={`No hay cotizaciones en la obra ${folio_obra}`}/>                                
                            </Paper>
                        </main>
                        <Copyright/>
                    </Fragment>
                )
                :
                <Obras              
                    titulo={'Obras Cotizadas'}               
                    siguientecomponente={4}
                    guardarObra={guardarObra}
                    rows={rowsobrascotizadas}            
                    obrastotal={obrascotizadas}
                    //obrascotizadas={obrascotizadas}
                    totalpaginas={Math.ceil(rowsobrascotizadas.length/cantidadcards)} 
                    datosgenerales={datosgenerales}
                    guardarDatosGenerales={guardarDatosGenerales}
                    cantidadcards={cantidadcards}
                    bandObrasCotizadas={true}
                    tipobusqueda={tipobusqueda}
                    guardarTipoBusqueda={guardarTipoBusqueda}
                    seleccionpor={"cotizacion"}
                />               
            }
        </Fragment>
    );
}
 
export default ObrasCotizadasAdmin;