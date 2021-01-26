import {Button, InputLabel, Select, MenuItem, Grid, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons/'
import { styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
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
    cursor: 'pointer',
    fontSize:'15px',

    '&:hover': {
        background: 'linear-gradient(#b3d233, #d4e157)',
    }
});

const FormularioRegistroObras = ({ datos, guardarDatos, guardarError, rows, guardarRows, guardarBandBotonRegistrar, categorias, subcategorias, productos, classes }) => {

    const { folioItem, categoria, subcategoria, producto, unidad, requeridos, anotaciones } = datos

    const submitTabla = e => {
        e.preventDefault()
        
        if (folioItem.trim() === '' || unidad.trim() === '' || anotaciones.trim() === ''){
            guardarError({ bandError: true, mensajeError: 'Todos los campos son obligadorios' })
            return
        }    
        if (requeridos < 1){
            guardarError({ bandError: true, mensajeError: 'EL número requeridos deben ser mayor a 1' })
            return
        }      

        const result = rows.find(row => row.folioItem === folioItem)        

        if (result){            
            guardarError({ bandError: true, mensajeError: 'El folio ya ha sido ingresado' })
            return
        }
        
        guardarError({ bandError: false, mensajeError: '' })
        guardarRows([...rows, datos])
        guardarDatos({
            folioItem: '',
            categoria: '',
            subcategoria: '',
            producto: '',
            unidad: '',
            requeridos: 0,
            anotaciones: '',
            eliminar: ''
        })
        guardarBandBotonRegistrar(false)
    }

    const handleChange = e => {
        if (e.target.name === 'requeridos'){
            guardarDatos({
                ...datos,
                [e.target.name]: parseInt(e.target.value)
            })       
        }else{        
            guardarDatos({
                ...datos,
                [e.target.name]: e.target.value
            })       
        }
         
    }  

    return ( 
        <form
            onSubmit={submitTabla}
        >
            <ThemeProvider theme={theme}>
            <Grid container spacing={3}>                
                <Grid item xs={12} md={3}>
                    <TextField                                              
                        disabled          
                        id="folioItem"
                        name="folioItem"
                        label="Folio Item"
                        value={folioItem}
                        onChange={handleChange}         
                        fullWidth
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="categoria">Categoría</InputLabel>
                    <Select
                        required
                        id="categoria"
                        name='categoria'
                        value={categoria}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                    >
                        {
                            categorias.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }
                    </Select>                       
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="subcategoria">Sub Categoría</InputLabel>
                    <Select
                        required
                        id="subcategoria"
                        name='subcategoria'
                        value={subcategoria}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"                    >
                        {
                            subcategorias.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }
                    </Select>                       
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="producto">Producto</InputLabel>
                    <Select
                        required
                        id="producto"
                        name='producto'
                        value={producto}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                    >
                        {
                            productos.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }                                    
                    </Select>                       
                </Grid>
            </Grid>
            <Grid container spacing={3}>                        
                <Grid item xs={12} md={3}>
                    <TextField                                    
                        id="unidad"
                        name="unidad"
                        label="Unidad"
                        disabled
                        value={unidad}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"                                    
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        required
                        id="requeridos"
                        name="requeridos"
                        label="Requeridos"
                        value={requeridos}
                        onChange={handleChange}
                        type='number'
                        fullWidth
                        color="secondary"                              
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        required
                        id="anotaciones"
                        name="anotaciones"
                        label="Anotaciones"
                        value={anotaciones}
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
                    startIcon={<Add />}
                    >
                        AÑADIR
                    </ButtonComponent>
                </Grid>
            </Grid>
            </ThemeProvider>
        </form>
     );
}
 
export default FormularioRegistroObras;