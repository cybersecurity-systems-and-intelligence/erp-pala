import { useState } from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';


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
});

export default function TablaObraProv({ rows, guardarRows }) {

  const columns = [
    { id: 'folioItem', label: 'Folio Item', minWidth: 100 },
    { id: 'categoria', label: 'Categoria', minWidth: 100 },
    {
      id: 'subcategoria',
      label: 'Sub Categoria',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'producto',
      label: 'Producto',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'unidad',
      label: 'Unidad',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'requeridos',
      label: 'Requeridos',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'costounitario',
      label: 'Costo Unitario',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'anotaciones',
      label: 'Anotaciones',
      minWidth: 170,
      align: 'right',
    },    
    {
      id: 'eliminar',
      label: 'eliminar',
      minWidth: 170,
      align: 'right',
    }
  ]



  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const eliminarDato = e => {
    const dato_eliminado = rows.filter(row => row.folioItem !== e.target.id)
    guardarRows([...dato_eliminado])    
  }

  return (
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
                          column.id === 'eliminar' 
                        ? 
                          <input 
                            type='button'
                            id={row.folioItem}
                            value='Eliminar'
                            variant="contained"
                            color="primary"
                            onClick={eliminarDato}
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
  );
}
