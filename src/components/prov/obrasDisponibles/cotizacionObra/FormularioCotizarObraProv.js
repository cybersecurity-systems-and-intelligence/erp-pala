import React, { Fragment } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const FormularioCotizarObraProv = ({ datosextras, guardarDatosExtras }) => {

    const { sostenimiento, condiciones } = datosextras

    const handleChange = e => {               
        guardarDatosExtras({
            ...datosextras,
            [e.target.name]: e.target.value
        })
    }
    const theme = createMuiTheme({
        palette: {
          secondary: {
            main: '#b3d233',
          },
        },
    });

    return ( 
    <ThemeProvider theme={theme}>
        <Fragment>
            <Grid 
                container spacing={10}        
                alignItems="center"
                justify="center"
            >
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="sostenimiento"
                            name="sostenimiento"
                            label="Días de sostenimiento"                        
                            value={sostenimiento}
                            onChange={handleChange}
                            type='number'
                            fullWidth
                            color="secondary"         
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField                                    
                            id="condiciones"
                            name="condiciones"
                            label="Condiciones"                        
                            value={condiciones}
                            onChange={handleChange}
                            fullWidth    
                            color="secondary"                                         
                        />
                    </Grid>
                </Grid>            
           
        </Fragment>
        </ThemeProvider>
    )
}
 
export default FormularioCotizarObraProv;


/**
 * 
 * 
 * 
 */