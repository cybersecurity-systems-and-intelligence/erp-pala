import { useState, Fragment, useEffect } from 'react';
import { Fade, makeStyles,  CssBaseline, Typography, Paper } from '@material-ui/core/';

import Copyright from '../../Copyright'
import Error from '../../Error'
import BuscadorObra from './BuscadorObra'
import CardObra from './CardObra'

import { formatCardFolioObra } from '../../../libs/formatters'
import config from '../../../config/config'

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

const ObrasDisponiblesProv = ( { guardarObra, obrasdisponibles} ) => {

    const classes = useStyles();
    
    const [ rows, guardarRows ] = useState([])
    const [ totalpaginas, guardarTotalPaginas ] = useState()
    const [ errorconsulta, guardarErrorConsulta ] = useState(false)

    useEffect(() => {
        const obrasDisp = formatCardFolioObra(obrasdisponibles)
        guardarRows(obrasDisp)
    }, [obrasdisponibles])

    useEffect(() => {
        const cantidadcards = config.CANTIDADCARDS
        guardarTotalPaginas(Math.ceil(rows.length/cantidadcards))
    }, [rows])
    
    

    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Fade in={true}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center" component='div'>
                            <h5>OBRAS DISPONIBLES<hr className={classes.hr}/></h5>
                        </Typography>
                        <br/>                                        
                        <BuscadorObra
                            obrasdisponibles={obrasdisponibles}
                            guardarRows={guardarRows}                   
                            guardarErrorConsulta={guardarErrorConsulta}
                        />
                        <br/>
                        {
                            errorconsulta
                            ? 
                            <Error mensaje={'no se ha encontrado'}/> 
                            : 
                            <CardObra
                                rows={rows}
                                obrasdisponibles={obrasdisponibles}
                                totalpaginas={totalpaginas}                                                       
                                guardarObra={guardarObra}
                            />
                        }                    
                    </Paper>
                </Fade>
            </main>
            <Copyright/>
        </Fragment>
    );
}

export default ObrasDisponiblesProv;