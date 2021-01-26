import { useState, useEffect, Fragment } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, CssBaseline, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';
import axios from 'axios'
import Copyright from '../Copyright'
import Error from '../Error'
import CardObraDisponible from './CardObraDisponible'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
    },
    container: {
      maxHeight: 440,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      /*
      [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {    
        width: 1000,    
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      */
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
        float: 'right'
    },
    button: {
        margin: theme.spacing(1),
    }
}))

const ObrasDisponiblesProv = ( { guardarObra, guardarObraSeleccionada, componente, guardarComponente } ) => {

    const columns = [
        { id: 'folioObra', label: 'Folio Obra', minWidth: 50 },
        {
          id: 'nombreObra',
          label: 'Nombre Obra',
          minWidth: 50,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'seleccionar',
          label: 'Seleccionar',
          minWidth: 50,
          align: 'right',
          format: (value) => value.toFixed(2),
        }
    ]
      
      
    
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);    
    const [ obrasdisponibles, guardarObrasDisponibles ] = useState([])
    const [ rows, guardarRows ] = useState([])
    const [ error, guardarError ] = useState({
        bandError: false,
        mensajeError: ''
    })
    const { bandError, mensajeError } = error

    useEffect(() => {
        const consultarAPI = async () => {
            const respuesta = await axios.get('https://apicotizacion.herokuapp.com/api/obras')
            const obras = respuesta.data.Obras.map(obra => (
                {
                    folioObra: obra.folio_obra,
                    nombreObra: obra.nombre_obra                    
                }
            ))
            guardarObrasDisponibles(respuesta.data.Obras)
            guardarRows(obras);
        }
        consultarAPI()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };   
    return (
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Obras Disponibles
                    </Typography>
                    <br/>
                    <br/>
                    { bandError ? <Error mensaje={mensajeError}/> : null }
                    <br/>  
                    <br/>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                    >
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
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
                                <TableBody>
                                    
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>                  
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                            <TableCell key={column.id} align={column.align}>
                                                
                                                { 
                                                column.id === 'seleccionar' 
                                                ? 
                                                <input 
                                                    type='button'
                                                    id={row.folioObra}
                                                    value='Seleccionar'
                                                    variant="contained"
                                                    color="primary"
                                                    //onClick={seleccionarObra}
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
                    </Grid>
                </Paper>
                <CardObraDisponible
                    rows={rows}
                />                
            </main>
        </Fragment>
    );
}
 
export default ObrasDisponiblesProv;