import { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, Fade, CssBaseline, Paper, Button, Typography, Grid } from '@material-ui/core';

import Copyright from '../../Copyright'
import TablaObrasAdmin from './TablaObrasAdmin'
import Error from '../../Error'
import Modal from '../../Modal'
import FormularioRegistroObrasAdmin from './FormularioRegistroObrasAdmin'
import DatosPrincipalesObrasAdmin from './DatosPrincipalesObrasAdmin'

import {ComponenteContext} from '../../../context/ComponenteContext'

import { llamada } from '../../../libs/llamadas'
import { listaCategorias, listaSubCategorias, listaProductos } from '../../../libs/formatters'

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
        background: 'linear-gradient(#d4e157, #afb42b)',
        color:'#fff',

        '&:hover': {
            background: 'linear-gradient(#afb42b, #d4e157)',
            color: 'white',
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
        marginTop:'1px'
       },
}));


const CrearObraAdmin = ( { guardarActualizarCards } ) => {
    const classes = useStyles();

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    // Creacion de states
    const [ error, guardarError ] = useState({
        bandError: false,
        mensajeError: ''
    })
    const [ items, guardarItems ] = useState([])
    const [ datos, guardarDatos ] = useState({        
        clave: '',
        descripcion: '',
        cantidad: '',
        unidad: '',
        eliminar: ''
    })
    const [ rows, guardarRows ] = useState([])
    const [ banddatosapi, guardarBandDatosApi ] = useState(false)
    const [ openmodal, setOpenModal ] = useState(false)
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
    const [ datosprincipalesobra, guardarDatosPrincipalesObra ] = useState({
        nombreObra: '',
        direccionObra: '',
        dependenciaObra: ''
    })
    const [ erroresdatos, guardarErroresDatos ] = useState({
        errorNombreObra: false,
        errorDireccionObra: false,
        errorDependenciaObra: false
    })
    
    // Destructuring de los state
    const { bandError, mensajeError } = error
    const { nombreObra, direccionObra, dependenciaObra } = datosprincipalesobra
    

    useEffect(() => {
        if(rows.length === 0){
            console.log('hoola');
            guardarBandBotonRegistrar(true)
        }
    }, [rows])


    useEffect(() => {
        const consultarAPI = async () => {
            try{
                let materiales = rows
                materiales.map(material => delete material.eliminar)                                
                const objeto = {
                    "nombre_obra": nombreObra,
                    "direccion_obra": direccionObra,
                    "dependencia_obra": dependenciaObra,
                    "creador_obra": "quien sabe",
                    "materiales_obra": materiales
                }
                // eslint-disable-next-line
                let resultadoAPI = await llamada('https://apicotizacion.herokuapp.com/api/obras', 'post', objeto)

                guardarActualizarCards(Math.floor(Math.random() * 1000) + 1)
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

      
    const registrar = () => {
        if (nombreObra.trim() === ''){            
            guardarErroresDatos({
                ...erroresdatos,
                errorNombreObra: true
            })
            return
        }
        
        if (direccionObra.trim() === ''){
            guardarErroresDatos({
                ...erroresdatos,
                errorNombreObra: false,
                errorDireccionObra: true
            })
            return
        }
        if (dependenciaObra.trim() === '') {
            guardarErroresDatos({
                ...erroresdatos,
                errorDireccionObra: false,
                errorDependenciaObra: true
            })
            return
        }
        guardarErroresDatos({
            ...erroresdatos,
            errorNombreObra: false,
            errorDireccionObra: false,
            errorDependenciaObra: false
        })
        
        setOpenModal(true)
    }

    return ( 
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Fade in={true}>
                    <Paper className={classes.paper}>
                        <Typography align="center" component="span">
                            <h3 className={classes.rb1} >REGISTRO DE OBRAS</h3>
                            <hr className={classes.hr}/>
                        </Typography>
                        <br/>
                        <br/>
                        { bandError ? <Error mensaje={mensajeError}/> : null }
                        <br/>
                        <DatosPrincipalesObrasAdmin
                            datosprincipalesobra={datosprincipalesobra}
                            guardarDatosPrincipalesObra={guardarDatosPrincipalesObra}
                            erroresdatos={erroresdatos}
                            guardarErroresDatos={guardarErroresDatos}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <FormularioRegistroObrasAdmin
                            datos={datos}
                            guardarDatos={guardarDatos}
                            guardarError={guardarError}
                            rows={rows}
                            guardarRows={guardarRows}
                            guardarBandBotonRegistrar={guardarBandBotonRegistrar}
                            classes={classes}
                        />
                        <br/>
                        <br/>
                        <br/> 
                        <TablaObrasAdmin
                            rows={rows}
                            guardarRows={guardarRows}
                            guardarBandBotonRegistrar={guardarBandBotonRegistrar}
                        />
                        <br/>
                        <Grid container justify="flex-end" spacing={3}>
                            <Grid item xs={3}>
                                <Button 
                                    className={classes.btnregistrar}
                                    disabled={bandbotonregistrar}
                                    variant="contained"
                                    color="primary"
                                    onClick={registrar}
                                    dir="rtl"
                                >Registrar</Button>
                            </Grid>
                        </Grid>
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
 
export default CrearObraAdmin;