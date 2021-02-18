import { useState, Fragment, useEffect, useContext } from 'react';
import { Fade, makeStyles, Grid, Button, CssBaseline, Typography, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';
import Copyright from '../../../../Copyright'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { cloneDeep } from 'lodash';
import api from '../../../../../libs/api'
import { ComponenteContext } from '../../../../../context/ComponenteContext'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });

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
            color:'#fff',
            fontWeight: '800',
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
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    btn:{
        background: 'linear-gradient(#ff616f, #ab000d)',
        border: 3,
        borderRadius: 6,
        color: 'white',
        height: 30,
        width: '50%',
        cursor: 'pointer',
    
        '&:hover': {
          background: 'linear-gradient(#ab000d, #ff616f)',
          color: 'white',
          fontWeight: '700',
          
        },
    },
}));

export default function DetalleObraAdmin({ obra }) {

  const columns = [
    { id: 'clave', label: 'Clave', minWidth: 100 },
    { id: 'descripcion', label: 'Descripción', minWidth: 100 },
    {
      id: 'unidad',
      label: 'Unidad',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'cantidad',
      label: 'Requeridos',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'costounitario',
      label: 'Costo unitario',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'seleccionar',
      label: 'seleccionar',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    }
  ]


    const classes = useStyles()

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(10)
    // eslint-disable-next-line
    const [ rows, guardarRows ] = useState(obra.materiales_cotizacion)
    const [ checks, guardarChecks ] = useState({})
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)

    const { guardarComponenteContx } = useContext(ComponenteContext)
 
    useEffect(() => {
        const objeto = {}
        obra.materiales_cotizacion.map(e => (objeto[e.clave] = false))
        guardarChecks(objeto)
        //eslint-disable-next-line
    }, [])

  
    useEffect(() => {
        let band = false
        for (const property in checks) {
            if(checks[property]){
                band = true
                break
            }
        }                
        if(band === true){
            guardarBandBotonRegistrar(false)
        }else{
            guardarBandBotonRegistrar(true)
        }

    }, [checks])

    const buscarItem = (items, clave) => {
        const res = cloneDeep(items).filter(item => item.clave === clave)
        return res[0]
    }

    const registrar = async () => {
        const requisicion = cloneDeep(obra)
        
        delete requisicion.IVA
        delete requisicion.total
        delete requisicion.total_IVA
        delete requisicion.requisitada
        delete requisicion.materiales_cotizacion

        const itemsSelect = []
        for (const property in checks) {
            if(checks[property]){
                itemsSelect.push(buscarItem(rows, property))
            }
        }   
        requisicion.materiales_cotizacion = itemsSelect
        console.log(requisicion);
        try {
            const consulta = await api.crearRequisicion(requisicion)
        }catch(error) {
            console.log(error)
            if (error.response.status === 401){
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                localStorage.removeItem('componente')        
    
                guardarComponenteContx({
                    nivel_acceso: null,
                    numero_ventana: 0,
                    numero_componente: null
                })
                return
              }
        }       
    }
  

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  const seleccionarFolio = e => {
    //const dato_eliminado = rows.filter(row => row.folioItem !== e.target.id)
    //guardarRows([...dato_eliminado])    
    guardarChecks({
        ...checks,
        [e.target.id]: e.target.checked
    })
  }

  return (
    <Fragment>
         <ThemeProvider theme={theme}>
        <CssBaseline />      
        <main className={classes.layout}>
            <Fade in={true}>
                <Paper className={classes.paper}>

                <Typography align="center" component='div'>
                        <h3 className={classes.rb1} >Orden de compra<hr className={classes.hr}/></h3> 
                        </Typography>
                    <br/>
                    <Paper className={classes.root}>
                        <TableContainer  className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                        <TableRow  hover role="checkbox" tabIndex={-1} key={row.clave}>
                                            {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                {
                                                    column.id === 'seleccionar'
                                                ?
                                                <Checkbox
                                                    //value={checks[row.clave]}
                                                    value={checks[row.clave] ? true : false}
                                                    id={row.clave}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={seleccionarFolio}
                                                /> : value }
                                                </TableCell>
                                            );
                                            })}
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
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
                </Paper>            
                </Fade>
            </main>
        <Copyright />
        </ThemeProvider>
    </Fragment>
    
  );
}


/*


*/