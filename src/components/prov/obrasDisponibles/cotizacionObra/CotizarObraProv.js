import { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, Fade, CssBaseline, Paper, Typography } from '@material-ui/core';
import jwt_decode from 'jwt-decode'

import Copyright from '../../../Copyright'
import SeleecionItems from './SeleecionItems'
import CotizarItems from './CotizarItems'
import Error from '../../../Error'
import Modal from '../../../Modal'
import FormularioCotizarObraProv from './FormularioCotizarObraProv'

import { ComponenteContext } from '../../../../context/ComponenteContext'
import { llamada } from '../../../../libs/llamadas'

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

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
                
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
    const { sostenimiento, condiciones } = datosextras
    const { bandError, mensajeError } = error


    useEffect(() => {     
        
        const consultarAPI = async () => {
           guardarRows(obra.materiales_obra);
        }
        consultarAPI()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        const consultarAPI = async () => {
            try{
                

                let materiales = rows
                materiales.map(material => delete material.eliminar);
                


                const resultado = JSON.parse(localStorage.getItem('jwt'))
                const decoded = jwt_decode(resultado);        

                const objeto = {
                    "nombre_obra": obra.nombre_obra,
                    "folio_obra": obra.folio_obra,
                    "correo_prov": decoded.correo,
                    'dias_sostenimiento_propuesta': sostenimiento,
                    'condiciones_comerciales': condiciones,
                    "materiales_cotizacion": materiales                    
                }
                console.log(objeto);
                // eslint-disable-next-line
                let resultadoAPI = await llamada('https://apicotizacion.herokuapp.com/api/cotizaciones', 'post', objeto)

                guardarActualizarCards(Math.floor(Math.random() * 500) + 1)
                guardarComponenteContx({
                    ...componentecontx,
                    numero_componente: 2
                })
                
            }catch(err){
                guardarBandDatosApi(false)
                alert("La obra ya ha sido registrada")
            }
        }

        if(banddatosapi && rows.length > 0){
            consultarAPI()
        }
        //eslint-disable-next-line
    }, [banddatosapi])

    

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
                                rows={rows}
                                guardarRows={guardarRows}
                                guardarError={guardarError}
                                datosextras={datosextras}
                                setOpenModal={setOpenModal}
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