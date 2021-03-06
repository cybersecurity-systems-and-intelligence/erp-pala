import {Grid, TextField, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
});

const useStyles = makeStyles({
    ancho: {
        width: '100%'
    }
})
const DatosPrincipalesObrasAdmin = ({ datosprincipalesobra, guardarDatosPrincipalesObra, erroresdatos, guardarErroresDatos }) => {

    const classes = useStyles()
    const { nombreObra, direccionObra, dependenciaObra } = datosprincipalesobra

    const { errorNombreObra, errorDireccionObra, errorDependenciaObra } = erroresdatos

    const handleChange = e => {
        guardarDatosPrincipalesObra({
            ...datosprincipalesobra,
            [e.target.name]: e.target.value
        })
    }

    return (       
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={3}
                alignItems="center"
                justify="center"
            >                
                <Grid item xs={12} md={3}>
                    <TextField                                              
                        required     
                        error={errorNombreObra}     
                        id="nombreObra"
                        name="nombreObra"
                        label="Nombre de Obra"
                        value={nombreObra}
                        onChange={handleChange}         
                        className={classes.ancho}
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <TextField                                              
                        required        
                        error={errorDireccionObra}  
                        id="direccionObra"
                        name="direccionObra"
                        label="Direccion de Obra"
                        value={direccionObra}
                        onChange={handleChange}         
                        className={classes.ancho}
                        color="secondary"
                    />                      
            </Grid>
                <Grid item xs={12} md={3}>                        
                    <TextField                                              
                        required   
                        error={errorDependenciaObra}       
                        id="dependenciaObra"
                        name="dependenciaObra"
                        label="Dependencia de Obra"
                        value={dependenciaObra}
                        onChange={handleChange}         
                        className={classes.ancho}
                        color="secondary"
                    />                     
                </Grid>                
            </Grid>   
            </ThemeProvider>                  
    );
}
 
export default DatosPrincipalesObrasAdmin;