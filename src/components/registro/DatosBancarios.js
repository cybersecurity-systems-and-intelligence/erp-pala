import { Fragment } from 'react';

import { Grid, TextField, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { schema } from '../../libs/validarDatos'


const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });

export default function DatosBancarios({ 
  datos, 
  guardarDatos,
  erroresdatos,
  guardarErroresDatos
}) {

  const { numeroClave, cuenta, razonSocial } = datos

  const { errorNumeroClave, errorCuenta} = erroresdatos

  const changeDatosBancarios = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value.trim()
    })
  }

  const inputPropsNumeroClave= () =>{
    const { error } = schema.validate({numerico: numeroClave})    

    error ? guardarErroresDatos({...erroresdatos, errorNumeroClave: true }) : guardarErroresDatos({...erroresdatos, errorNumeroClave: false })
   
  }

  const inputPropsCuenta= () =>{
    const { error } = schema.validate({numerico: cuenta})   
    error ? guardarErroresDatos({...erroresdatos, errorCuenta: true }) : guardarErroresDatos({...erroresdatos, errorCuenta: false }) 
       
  }

  return (
    <Fragment>    
      <ThemeProvider theme={theme}> 
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="numeroClave" 
            name="numeroClave"
            label="Numero de Clave"
            value={numeroClave}
            onChange={changeDatosBancarios}
            error={errorNumeroClave}
            onKeyUp={inputPropsNumeroClave}
            fullWidth 
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cuenta"
            name="cuenta"
            value={cuenta}
            onChange={changeDatosBancarios}
            error={errorCuenta}
            onKeyUp={inputPropsCuenta}
            label="Cuenta"
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            required 
            id="razonSocial"
            name="razonSocial"
            value={razonSocial}
            onChange={changeDatosBancarios}
            label="Razon Social" 
            fullWidth 
            color="secondary"
          />
        </Grid>        
      </Grid>
      </ThemeProvider> 
    </Fragment>
  );
}