import { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, CssBaseline, Paper, Button, Typography, Grid } from '@material-ui/core';
import jwt_decode from 'jwt-decode'
import Copyright from '../../../Copyright'
import TablaObraProv from './TablaObraProv'
import Error from '../../../Error'
import Modal from '../../../Modal'
import FormularioCotizarObraProv from './FormularioCotizarObraProv'
import { ComponenteContext } from '../../../../context/ComponenteContext'
import { llamada } from '../../../../libs/llamadas'
import { listaCategorias, listaSubCategorias, listaProductos } from '../../../../libs/formatters'

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
    const [ categorias, guardarCategorias] = useState([])
    const [ subcategorias, guardarSubCategorias ] = useState([])
    const [ productos, guardarProductos ] = useState([])
    const [ datosextras, guardarDatosExtras ] = useState({
        sostenimiento: 1,
        condiciones: '',
    })
    const [ datos, guardarDatos ] = useState({
        folioItem: '',
        categoria: '',
        subcategoria: '',
        producto: '',
        unidad: '',
        requeridos: 0,
        costounitario: '',
        anotaciones: '',        
        eliminar: ''
    })
    const [ rows, guardarRows ] = useState([])
    const [ banddatosapi, guardarBandDatosApi ] = useState(false)
    const [openmodal, setOpenModal] = useState(false)
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
    
    // Destructuring de los state
    const { categoria, subcategoria, producto } = datos
    const { sostenimiento, condiciones } = datosextras
    const { bandError, mensajeError } = error


    useEffect(() => {     
        
        const consultarAPI = async () => {                
                     
            guardarCategorias(listaCategorias(obra.materiales_obra))
        }
        consultarAPI()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(rows.length === 0){
            guardarBandBotonRegistrar(true)
        }
    }, [rows])

    useEffect(() => {   
        try{        
            guardarSubCategorias(listaSubCategorias(obra.materiales_obra, categoria)) 
            guardarDatos({
                ...datos,
                folioItem: '',
                subcategoria: '',
                producto: '',
                unidad: '',
                requeridos: 0,
                costounitario: '',
                anotaciones: '',
                eliminar: ''
            })        
        }catch{}
        //eslint-disable-next-line
    }, [categoria])

    useEffect(() => {
        try{
                    
            guardarProductos(listaProductos(obra.materiales_obra, subcategoria)) 
            guardarDatos({
                ...datos,
                folioItem: '',
                producto: '',
                unidad: '',
                requeridos: 0,
                costounitario: '',
                anotaciones: '',
                eliminar: ''
            })
        }catch{}
        //eslint-disable-next-line
    }, [subcategoria])

    useEffect(() => {
        try{
            const resultado = obra.materiales_obra.filter(e => e.producto === producto)
                
            resultado.map(e => (guardarDatos({
                ...datos,
                folioItem: e.folioItem,
                unidad: e.unidad,
                requeridos: e.requeridos
                })))
        }catch{}
        //eslint-disable-next-line
    }, [producto])

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

    const registrar = () => {
        if(condiciones.trim() === ''){
            guardarError({ bandError: true, mensajeError: 'Todos los campos son obligadorios' })
            return
        }
        if(sostenimiento < 1){
            guardarError({ bandError: true, mensajeError: 'Los días de sostenimiento deben ser mayor a 0' })
            return
        }
        guardarError({ bandError: false, mensajeError: '' })
        setOpenModal(true)
    }

    return ( 
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography align="center">
                        <h3 className={classes.rb1} >COTIZACIÓN DE OBRA<hr className={classes.hr}/></h3> 
                    </Typography>
                    <br/>
                    <br/>
                    { bandError ? <Error mensaje={mensajeError}/> : null }                    
                    <FormularioCotizarObraProv
                        datos={datos}
                        guardarDatos={guardarDatos}
                        datosextras={datosextras}
                        guardarDatosExtras={guardarDatosExtras}
                        guardarError={guardarError}
                        rows={rows}
                        guardarRows={guardarRows}
                        guardarBandBotonRegistrar={guardarBandBotonRegistrar}
                        categorias={categorias}
                        subcategorias={subcategorias}
                        productos={productos}
                        classes={classes}
                    />
                    <br/>
                    <br/>
                    <br/> 
                    <TablaObraProv
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
                <Copyright />
            </main>
        </Fragment>
     )
}
 
export default CotizarObraProv;