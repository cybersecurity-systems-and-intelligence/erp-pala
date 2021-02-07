import { Fragment, useEffect, useState } from 'react';
import { makeStyles,  CssBaseline, Typography, Paper } from '@material-ui/core/';

import Copyright from '../../../Copyright'
import Error from '../../../Error'
import BuscadorObra from './BuscadorObra'
import CardObra from './CardObra'

import { cargarCotizaciones } from '../../../../libs/cargarDatos'
import config from '../../../../config/config'
import { formatCardFolioCoti } from '../../../../libs/formatters'

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

const ObrasCotizadasAdmin = ({ obra, guardarObra }) => {
    const classes = useStyles()

    const { folio_obra } = obra
       
    const [ errorconsulta, guardarErrorConsulta ] = useState({
        bandError: false,
        msgError: ''
    })
    const [ rows, guardarRows ] = useState([])
    const [ totalpaginas, guardarTotalPaginas ] = useState()
    const [ obrascotizadas, guardarObrasCotizadas ] = useState([])

    
    const { bandError, msgError } = errorconsulta

    useEffect(() => {
        const consultarAPI = async() => {
            const { respObrasCoti } = await cargarCotizaciones(folio_obra) 
            const obrasCoti = formatCardFolioCoti(respObrasCoti)
                        
            guardarObrasCotizadas(respObrasCoti)              
            guardarRows(obrasCoti)
            obrasCoti.length === 0 ? guardarErrorConsulta({bandError: true, msgError: `No hay cotizaciones en la obra ${folio_obra}`}) : guardarErrorConsulta({bandError: false, msgError: ''})
        }
        consultarAPI()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const cantidadcards = config.CANTIDADCARDS
        guardarTotalPaginas(Math.ceil(rows.length/cantidadcards))
    }, [rows])

    return (
        
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center" component='div'>
                        {'Obras Cotizadas'}
                    </Typography>
                    <br/>
                                                
                    <BuscadorObra
                        obrascotizadas={obrascotizadas}                                                                
                        guardarRows={guardarRows}
                        guardarErrorConsulta={guardarErrorConsulta}
                    />
                    <br/>
                    {
                        bandError
                        ? 
                        <Error mensaje={msgError}/> 
                        : 
                        <CardObra
                            rows={rows}
                            obrascotizadas={obrascotizadas}
                            totalpaginas={totalpaginas}
                            guardarObra={guardarObra}
                        />
                    }                            
                </Paper>
            </main>
            <Copyright/>
        </Fragment>              
            
    );
}
 
export default ObrasCotizadasAdmin;