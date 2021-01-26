import { Fragment } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { schema } from '../../libs/validarDatos'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });

export default function DatosFiscales({ 
    datos, 
    guardarDatos, 
    erroresdatos,
    guardarErroresDatos,
}) {
    
    

    const { nombreMoralFisica, rfc, direccionFiscal, direccionOficina } = datos
    const { calleReferencia1, calleReferencia2, cp, colonia } = datos
    const { ciudad, estado } = datos

    const { errorRfc, errorCp, errorColonia, errorCiudad, errorEstado} = erroresdatos

    const changeDatosFiscales = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value.trim()
        })
    }
    const inputPropsRFC = () =>{
        const { error } = schema.validate({rfc: rfc})
        if ( error ){
            guardarErroresDatos({
                ...erroresdatos,
                errorRfc: true
            })
        }else{
            guardarErroresDatos({
                ...erroresdatos,
                errorRfc: false
            })
        }
        guardarDatos({
            ...datos,
            rfc: rfc.toUpperCase()
        })
    }
    const inputPropsCp = () =>{
        const { error } = schema.validate({cp: cp})
        if ( error ){
            guardarErroresDatos({
                ...erroresdatos,
                errorCp: true
            })
        }else{
            guardarErroresDatos({
                ...erroresdatos,
                errorCp: false
            })
        }      
    }
    const inputPropsColonia = () =>{
        const { error } = schema.validate({alfanumerico: colonia})
        if ( error ){
            guardarErroresDatos({
                ...erroresdatos,
                errorColonia: true
            })
        }else{
            guardarErroresDatos({
                ...erroresdatos,
                errorColonia: false
            })
        }      
    }
    const inputPropsCiudad = () =>{
        const { error } = schema.validate({ciudad: ciudad})
        if ( error ){
            guardarErroresDatos({
                ...erroresdatos,
                errorCiudad: true
            })
        }else{
            guardarErroresDatos({
                ...erroresdatos,
                errorCiudad: false
            })
        }      
        guardarDatos({
            ...datos,
            ciudad: ciudad.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        })
    }
    const inputPropsEstado = () =>{
        const { error } = schema.validate({letras: estado})

        if ( error ){
            guardarErroresDatos({
                ...erroresdatos,
                errorEstado: true
            })
        }else{
            guardarErroresDatos({
                ...erroresdatos,
                errorEstado: false
            })
        }      
        guardarDatos({
            ...datos,
            estado: estado.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        })
    }
      
  return (
       
    <Fragment> 
        <ThemeProvider theme={theme}>     
      <Grid container spacing={3}>                        
            <Grid item xs={12}>
                <TextField
                    required
                    id="nombreMoralFisica"
                    name="nombreMoralFisica"
                    label="Nombre de Empresa o Persona Fisica"
                    fullWidth                    
                    value={nombreMoralFisica}
                    onChange={changeDatosFiscales}      
                    color="secondary"              
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="rfc"
                    name="rfc"
                    label="RFC"
                    error={errorRfc}
                    onKeyUp={inputPropsRFC}
                    value={rfc}
                    onChange={changeDatosFiscales}                    
                    fullWidth     
                    color="secondary"               
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required                    
                    id="direccionFiscal"
                    name="direccionFiscal"
                    label="Direccion Fiscal"
                    value={direccionFiscal}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="direccionOficina"
                    name="direccionOficina"
                    label="Direccion Oficina"
                    value={direccionOficina}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="calleReferencia1"
                    name="calleReferencia1"
                    label="Calle Referencia 1"
                    value={calleReferencia1}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="calleReferencia2"
                    name="calleReferencia2"
                    label="Calle Referencia 2"
                    value={calleReferencia2}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="cp"
                    name="cp"
                    label="Codigo Postal"
                    error={errorCp}
                    onKeyUp={inputPropsCp}
                    value={cp}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    inputProps={{ maxLength: 5 }}
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="colonia"
                    name="colonia"
                    label="Colonia"
                    value={colonia}
                    error={errorColonia}
                    onKeyUp={inputPropsColonia}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="ciudad"
                    name="ciudad"
                    label="Ciudad"
                    value={ciudad}
                    error={errorCiudad}
                    onKeyUp={inputPropsCiudad}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={estado}
                    error={errorEstado}
                    onKeyUp={inputPropsEstado}
                    onChange={changeDatosFiscales}                    
                    fullWidth
                    color="secondary"
                />
            </Grid>                                   
        </Grid>
        </ThemeProvider>
    </Fragment>
  );
}