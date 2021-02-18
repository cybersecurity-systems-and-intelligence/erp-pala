import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form'
import { makeStyles, Grid, Card, Input, styled, Fab, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { cloneDeep } from 'lodash';
import axios from 'axios'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
})

const useStyles = makeStyles({
    ancho: {
        width: '100%'
    },
    cardIn: {
        width: "100%",
        background:"#f1f8e9", 
        paddingBottom: "10%",
        paddingLeft: "5%", 
        paddingRight: "5%", 
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    }
})

const ButtonComponent = styled('button')({
    height: '40px',
    width: '100%',
    background: 'linear-gradient(#d4e157, #b3d233)',
    color:'#000',
    borderColor:'#d4e157',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize:'15px',
    textAlign: 'center',
    marginTop: '8%',
    '&:hover': {
        background: 'linear-gradient(#b3d233, #d4e157)',
        color:'white'
    },
})


const FormularioRegistroObras = ({ guardarError, rows, guardarRows, guardarBandBotonRegistrar, classes }) => {

    const css = useStyles()
    
    const { register, handleSubmit } = useForm()

    const [nombrefichero, guardarNombreFichero] = useState(`Buscar fichero...`)

    const cambiarTexto = e => {
        guardarNombreFichero(e.target.files[0].name);
    }


    const onSubmitCarga = async (data) => {

        const formData = new FormData()
        console.log(data);
        formData.append("file", data.file[0])
        
        if(data.file[0].type !=='application/vnd.ms-excel'){
          alert('formato incorrecto')
          return
        }
        
        const res = await axios.post("https://apicotizacion.herokuapp.com/api/archivos", formData)
        
        if(res.data.items.length > 0) {
            guardarRows([...res.data.items])
            guardarError({ bandError: false, mensajeError: '' })
            guardarBandBotonRegistrar(false)
            return
        }else{
            guardarError({ bandError: true, mensajeError: 'Debe ingresar un archivo csv con la estructura correcta' })
            return
        }
    }


    return (
        <Fragment>          
            <form onSubmit={handleSubmit(onSubmitCarga)}>
                <ThemeProvider theme={theme}>
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <InputBtnComponent ref={register} type="file" name="file" accept='.csv'/>                                
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ButtonComponent>Cargar</ButtonComponent>
                        </Grid>
                    </Grid>                */}
                    <Grid 
                        container
                        spacing={3}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12} md={3}>
                            <Card className={css.cardIn}>
                            <h3>SELECCIONE UN FICHERO .CSV</h3>
                                <label>
                                    <input 
                                        ref={register} 
                                        type="file" 
                                        name="file" 
                                        accept=".csv"  
                                        onChange={cambiarTexto}
                                        style={{ display: "none" }}
                                    />
                                    <Fab
                                        color="secondary"
                                        size="large"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                    >
                                    {nombrefichero}
                                    </Fab>
                                </label> 
                            </Card>                      
                        </Grid>
                    </Grid>  
                    <Grid item xs={6} md={3}>
                            <ButtonComponent>AÑADIR</ButtonComponent>
                        </Grid>
                </ThemeProvider>
            </form>
        </Fragment>
     );
}
 
export default FormularioRegistroObras;