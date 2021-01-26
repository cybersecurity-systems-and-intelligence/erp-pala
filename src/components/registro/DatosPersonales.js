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

export default function DatosPersonales({ 
  datos,
  guardarDatos,
  erroresdatos,
  guardarErroresDatos,
}) {
  

  const { correo, password, nombreContacto, telefonoFijo, telefonoMovil} = datos

  const { errorCorreo, errorNombreContacto, errorTelefonoFijo, errorTelefonoMovil } = erroresdatos


  const changeDatosPersonales = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const inputPropsCorreo = () =>{
    const { error } = schema.validate({correo: correo})    
    error ? guardarErroresDatos({...erroresdatos, errorCorreo: true }) : guardarErroresDatos({...erroresdatos, errorCorreo: false })
      
  }

  const inputPropsNombreContacto = () =>{
    const { error } = schema.validate({letras: nombreContacto})   
    error ? guardarErroresDatos({...erroresdatos, errorNombreContacto: true }) : guardarErroresDatos({...erroresdatos, errorNombreContacto: false }) 
       
  }

  const inputPropsTelefonoFijo = () =>{
    const { error } = schema.validate({telefono: telefonoFijo})
    error ? guardarErroresDatos({...erroresdatos, errorTelefonoFijo: true }) : guardarErroresDatos({...erroresdatos, errorTelefonoFijo: false }) 
   
  }

  const inputPropsTelefonoMovil = () =>{
    const { error } = schema.validate({telefono: telefonoMovil})
    error ? guardarErroresDatos({...erroresdatos, errorTelefonoMovil: true }) : guardarErroresDatos({...erroresdatos, errorTelefonoMovil: false }) 
     
  }


  return (
    <Fragment>         
      <ThemeProvider theme={theme}>     
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
              required
              id="correo"
              name="correo"
              value={correo}
              onChange={changeDatosPersonales}
              error={errorCorreo}
              onKeyUp={inputPropsCorreo}
              label="Correo electronico"
              fullWidth
              color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"  
            name="password"
            value={password}
            onChange={changeDatosPersonales}          
            label="Password"
            type="password"
            fullWidth
            color="secondary"          
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nombreContacto"
            name="nombreContacto"
            value={nombreContacto}
            onChange={changeDatosPersonales}
            error={errorNombreContacto}
            onKeyUp={inputPropsNombreContacto}
            label="Nombre de Contacto"
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telefonoFijo"
            name="telefonoFijo"
            value={telefonoFijo}
            onChange={changeDatosPersonales}
            error={errorTelefonoFijo}
            onKeyUp={inputPropsTelefonoFijo}
            label="Telefono Fijo"
            fullWidth
            inputProps={{ maxLength: 10 }}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telefonoMovil"
            name="telefonoMovil"
            value={telefonoMovil}
            onChange={changeDatosPersonales}
            error={errorTelefonoMovil}
            onKeyUp={inputPropsTelefonoMovil}
            label="Telefono Movil"
            fullWidth
            inputProps={{ maxLength: 10 }}
            color="secondary"
          />
        </Grid>
      </Grid>
      </ThemeProvider>
    </Fragment>
  );
}