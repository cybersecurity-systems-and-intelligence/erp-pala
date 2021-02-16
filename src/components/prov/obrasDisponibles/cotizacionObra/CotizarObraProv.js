import { Fragment, useState, useEffect } from 'react';
import { makeStyles, Fade, CssBaseline, Paper, Typography } from '@material-ui/core';

import Copyright from '../../../Copyright'
import SeleecionItems from './SeleecionItems'
import CotizarItems from './CotizarItems'
import Error from '../../../Error'
import Modal from '../../../Modal'
import FormularioCotizarObraProv from './FormularioCotizarObraProv'



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
    btnregistrar: {
        float: 'right',
        background: 'linear-gradient(#d4e157, #b3d233)',
        color:'#424242',

        '&:hover': {
            color:'#000',
            fontWeight: '700',
        }


    },
    rb1:{
        alignItems: 'center',
        textAlign: 'center'
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
        marginTop:'1px',
       },
}));


const CotizarObraProv = ( { obra, guardarActualizarCards } ) => {
    const classes = useStyles();

    // Creacion de states
    const [ error, guardarError ] = useState({
        bandError: false,
        mensajeError: ''
    })
    const [ datosextras, guardarDatosExtras ] = useState({
        sostenimiento: 1,
        condiciones: '',
    })
    const [ rows, guardarRows ] = useState([])
    const [ banddatosapi, guardarBandDatosApi ] = useState(false)
    const [ openmodal, setOpenModal ] = useState(false)
    const [ bandcomponente, guardarBandComponente ] = useState(false)
    
    // Destructuring de los state
    const { bandError, mensajeError } = error


    useEffect(() => {     
        
        const consultarAPI = async () => {
           guardarRows(obra.materiales_obra);
        }
        consultarAPI()
        //eslint-disable-next-line
    }, [])    

    

    return ( 
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Fade in={true}>
                    <Paper className={classes.paper}>
                        <Typography align="center">
                            <h3 className={classes.rb1} >COTIZACIÓN DE OBRA<hr className={classes.hr}/></h3> 
                        </Typography>
                        <br/>
                        <br/>
                        { bandError ? <Error mensaje={mensajeError}/> : null }                    
                        <FormularioCotizarObraProv
                            datosextras={datosextras}
                            guardarDatosExtras={guardarDatosExtras}
                        />
                        <br/>
                        <br/>
                        <br/> 
                        {
                            bandcomponente 
                            ?
                            <CotizarItems
                                rowsSeleccionadas={rows}
                                guardarError={guardarError}
                                datosextras={datosextras}
                                setOpenModal={setOpenModal}
                                obra={obra}
                                guardarActualizarCards={guardarActualizarCards}
                                guardarBandDatosApi={guardarBandDatosApi}
                                banddatosapi={banddatosapi}
                            />
                            :
                            <SeleecionItems
                                rows={rows}
                                guardarRows={guardarRows}
                                guardarBandComponente={guardarBandComponente}
                                obra={obra}
                            />
                        }
                        
                        <br/>                        
                        <Modal
                            openmodal={openmodal}
                            setOpenModal={setOpenModal}
                            guardarBandDatosApi={guardarBandDatosApi}
                        />
                    </Paper>                
                </Fade>
            </main>
            <Copyright />
        </Fragment>
     )
}
 
export default CotizarObraProv;