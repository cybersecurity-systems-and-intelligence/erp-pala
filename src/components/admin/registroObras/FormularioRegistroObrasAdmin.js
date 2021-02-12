import { Fragment } from 'react';
import { useForm } from 'react-hook-form'
import { makeStyles, Grid, TextField, styled, createMuiTheme } from '@material-ui/core';
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
    }
})

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
    textAlign: 'center',

    '&:hover': {
        background: 'linear-gradient(#b3d233, #d4e157)',
    }
})
const InputBtnComponent = styled('input')({
    height: '100%',
    width: '100%',
    color:'#000',
    fontWeight: '700',
    borderColor:'#d4e157',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize:'15px',
    textAlign: 'center',

    '&:hover': {
        background: 'linear-gradient(#b3d233, #d4e157)',
    }
})

const FormularioRegistroObras = ({ guardarError, rows, guardarRows, guardarBandBotonRegistrar, classes }) => {

    const css = useStyles()
    
    const { register, handleSubmit } = useForm()


    const onSubmitCarga = async (data) => {

        const formData = new FormData()
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
                    <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <InputBtnComponent ref={register} type="file" name="file" accept='.csv'/>                                
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <ButtonComponent>Cargar</ButtonComponent>
                            </Grid>
                        </Grid>               
                </ThemeProvider>
            </form>
        </Fragment>
     );
}
 
export default FormularioRegistroObras;