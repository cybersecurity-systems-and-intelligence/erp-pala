import { useState, useEffect, Fragment } from 'react';
import { makeStyles, TextField, Grid, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';
import { cloneDeep } from 'lodash'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#b3d233',
    },
  },
});

export default function SeleecionItems({ rows, guardarRows, guardarBandComponente, obra }) {

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
      id: 'seleccionar',
      label: 'Seleccionar',
      minWidth: 170,
      align: 'right',
    }
  ]



  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ checks, guardarChecks ] = useState({})
  const [ clave, guardarClave ] = useState('')
  const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const buscarItem = (items, clave) => {
    const res = cloneDeep(items).filter(item => item.clave === clave)
    return res[0]
  }

  const selectItems = () => {
    const itemsSelect = []
    for (const property in checks) {
      if(checks[property]){
          itemsSelect.push(buscarItem(rows, property))
      }
    }   
    guardarRows(itemsSelect)
    guardarBandComponente(true)
  }

  const seleccionarFolio = e => {         
    guardarChecks({
      ...checks,
      [e.target.id]: e.target.checked
    })
  }

  const handleChange = e => {
    const claveTarget = e.target.value        
    const resClave = cloneDeep(obra.materiales_obra).filter(item => item.clave.startsWith(claveTarget))
    guardarClave(claveTarget)
    guardarRows(resClave)    
  }

  return (
    <Fragment>
      <Grid 
          container spacing={1}
          alignItems="center"
          justify="center">
          
           <Grid item xs={12} md={3}>
               <TextField
                   id="clave"
                   name="clave"        
                   label="Clave"                  
                   value={clave}
                   onChange={handleChange}
                   color="secondary"
               />
           </Grid>           
       </Grid>
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
                          <ThemeProvider theme={theme}>
                            <Checkbox
                              value={checks[row.clave] ? true : false}
                              id={row.clave}
                              value='Eliminar'
                              variant="contained"
                              color="secondary"
                              onClick={seleccionarFolio}
                            />
                            </ThemeProvider>
                             : value }
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
            onClick={selectItems}
            dir="rtl"
          >Cotizar</Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
