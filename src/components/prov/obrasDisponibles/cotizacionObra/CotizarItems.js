import { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles, Grid, styled, Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';
import { cloneDeep } from 'lodash'


const useStyles = makeStyles({
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
  btnregistrar: {
    float: 'right',
    background: 'linear-gradient(#d4e157, #b3d233)',
    color:'#424242',

    '&:hover': {
      color:'#000',
      fontWeight: '700',
    }
  },
});
const ButtonComponent = styled('button')({
  height: '100%',
  width: '100%',
  background: 'linear-gradient(#d4e157, #b3d233)',
  color:'#000',
  fontWeight: '700',
  borderColor:'#d4e157',
  borderRadius: '5px',
  cursor: 'Pointer',
  fontSize:'15px',

  '&:hover': {
      background: 'linear-gradient(#b3d233, #d4e157)',
  }
});

export default function CotizarItems({ rows, guardarRows, guardarError, datosextras, setOpenModal, guardarBandComponente, obra }) {

  const columns = [
    { id: 'clave', label: 'Clave', minWidth: 100 },
    { id: 'descripcion', label: 'Descripción', minWidth: 100 },
    {
      id: 'unidad',
      label: 'Unidad',
      minWidth: 100,
      align: 'right',
    }, 
    {
      id: 'cantidad',
      label: 'Requeridos',
      minWidth: 170,
      align: 'right',
    },   
    {
        id: 'costounitario',
        label: 'costounitario',
        minWidth: 170,
        align: 'right',
      },  
    {
      id: 'seleccionar',
      label: 'Seleccionar',
      minWidth: 170,
      align: 'right',
    }
  ]



  const classes = useStyles();  
  const [ page, setPage ] = useState(0);
  const [rowsPerPage, setRowsPerPage ] = useState(10)
  const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
  const [ datos, guardarDatos ] = useState({
    clave: '',
    costounitario: ''
  })
  const { clave, costounitario } = datos    
  const { sostenimiento, condiciones } = datosextras
  

  useEffect(() => {
    const res = cloneDeep(rows).filter(row => row.costounitario !== undefined)
    console.log(res);
    if(res.length !== rows.length){      
      guardarBandBotonRegistrar(true)
      return
    }
    guardarBandBotonRegistrar(false)
  }, [rows])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const seleccionarItem = e => {         
    const claveRow = e.target.id
    const buscarItem = cloneDeep(rows).filter(row => row.clave === claveRow)
    guardarDatos({
      clave: buscarItem[0].clave,
      costounitario: ''
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(clave.trim() === '' || costounitario.trim() === ''){
      guardarError({ bandError: true, mensajeError: 'Tienes que editar un producto e ingresar su costo unitario' })
      return
    }
    guardarError({ bandError: false, mensajeError: '' })
    const cloneRow = cloneDeep(rows)
    cloneRow.map(row => {
      if(row.clave === clave){
        row.costounitario = costounitario
      }
    })
    guardarRows(cloneRow)
    guardarDatos({
      clave: '',
      costounitario: ''
    })
  }

  const handleChange = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

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
  
  const regresar = () => {
    guardarRows(obra.materiales_obra);
    guardarBandComponente(false)
  }

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
      >
        <Grid container spacing={1}>           
          <Grid item xs={12} md={3}>
            <TextField
              disabled
              id="clave"
              name="clave"
              label="Clave"                        
              value={''+clave}
              fullWidth    
              color="secondary"          
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField                                    
              id="costounitario"
              name="costounitario"
              label="Costo Unitario"                        
              value={costounitario}
              onChange={handleChange}
              fullWidth    
              color="secondary"                                         
            />
          </Grid>     
          <Grid item xs={12} md={3}>
            <ButtonComponent
              className={classes.btn}
              type='submit'
              fullWidth
            >
              Agregar costo unitario
            </ButtonComponent>
          </Grid>     
        </Grid>
      </form>
      <br/>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.clave}>                  
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          
                          { 
                            column.id === 'seleccionar' 
                          ? 
                          <input 
                            type='button'
                            id={row.clave}
                            value='Editar'
                            variant="contained"
                            color="primary"
                            onClick={seleccionarItem}
                            className={classes.btn}
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
            variant="contained"
            color="primary"
            onClick={regresar}
            dir="rtl"
          >Regresar</Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            className={classes.btnregistrar}
            disabled={bandbotonregistrar}
            variant="contained"
            color="primary"
            onClick={registrar}
            dir="rtl"
          >Enviar Cotización</Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
