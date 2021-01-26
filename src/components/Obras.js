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

const Obras = ( { titulo, siguientecomponente,paginaactual,guardarPaginaActual, paginafinal, guardarPaginaFinal,cantidadcards,page, setPage, totalpaginas, guardarObra, rows, guardarRows, obrastotal, obrascotizadas, bandObrasCotizadas, tipobusqueda, guardarTipoBusqueda, seleccionpor, errorconsulta, guardarErrorConsulta } ) => {

    const classes = useStyles();

    const [ folio, guardarFolio ] = useState()
    
    

    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        {titulo}
                    </Typography>
                    <br/>
                    
                    
                    <BuscadorObra
                        folio={folio}
                        guardarFolio={guardarFolio}
                        obrastotal={obrastotal}
                        guardarRows={guardarRows}
                        guardarErrorConsulta={guardarErrorConsulta}
                        bandObrasCotizadas={bandObrasCotizadas}
                        tipobusqueda={tipobusqueda}
                        guardarTipoBusqueda={guardarTipoBusqueda}
                    />
                    <br/>
                    {
                        errorconsulta
                        ? 
                        <Error mensaje={'no se ha encontrado'}/> 
                        : 
                        <CardObra
                            rows={rows}
                            obrastotal={obrastotal}
                            obrascotizadas={obrascotizadas}
                            guardarObra={guardarObra}
                            siguientecomponente={siguientecomponente}
                            totalpaginas={totalpaginas}
                            paginaactual={paginaactual}
                            guardarPaginaActual={guardarPaginaActual}
                            paginafinal={paginafinal}
                            guardarPaginaFinal={guardarPaginaFinal}
                            page={page}
                            setPage={setPage}
                            cantidadcards={cantidadcards}
                            bandObrasCotizadas={bandObrasCotizadas}
                            seleccionpor={seleccionpor}
                            //guardarComponente={guardarComponente}
                            //componente={componente}
                        />
                    }
                    
                </Paper>
            </main>
            <Copyright/>
        </Fragment>
    );
}

export default Obras;