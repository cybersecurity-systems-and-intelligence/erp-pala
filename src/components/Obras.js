import { useState, Fragment } from 'react';
import { makeStyles,  CssBaseline, Typography, Paper } from '@material-ui/core/';
import Copyright from './Copyright'
import CardObra from './CardObra'
import Error from './Error'
import BuscadorObra from './BuscadorObra'

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
    }
}))

const Obras = ( { datosgenerales, guardarDatosGenerales, titulo, siguientecomponente, cantidadcards, totalpaginas, guardarObra, rows, guardarRows, obrastotal, obrascotizadas, bandObrasCotizadas, tipobusqueda, guardarTipoBusqueda, seleccionpor } ) => {

    const classes = useStyles();

    const [ folio, guardarFolio ] = useState()
    const { errorconsulta } = datosgenerales
    

    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center" component='div'>
                        {titulo}
                    </Typography>
                    <br/>
                    
                    
                    <BuscadorObra
                        folio={folio}
                        guardarFolio={guardarFolio}
                        obrastotal={obrastotal}
                        guardarRows={guardarRows}
                        bandObrasCotizadas={bandObrasCotizadas}
                        tipobusqueda={tipobusqueda}
                        guardarTipoBusqueda={guardarTipoBusqueda}
                        datosgenerales={datosgenerales}
                        guardarDatosGenerales={guardarDatosGenerales}
                    />
                    <br/>
                    {
                        errorconsulta
                        ? 
                        <Error mensaje={'no se ha encontrado'}/> 
                        : 
                        <CardObra
                            //guardarRows={guardarRows}
                            siguientecomponente={siguientecomponente}
                            rows={rows}
                            cantidadcards={cantidadcards}
                            obrastotal={obrastotal}
                            totalpaginas={totalpaginas}
                            datosgenerales={datosgenerales}
                            guardarDatosGenerales={guardarDatosGenerales}
                            //obrascotizadas={obrascotizadas}
                            
                            guardarObra={guardarObra}
                            
                            
                            
                            
                            bandObrasCotizadas={bandObrasCotizadas}
                            seleccionpor={seleccionpor}
                        />
                    }
                    
                </Paper>
            </main>
            <Copyright/>
        </Fragment>
    );
}

export default Obras;