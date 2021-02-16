import { useState, useContext } from 'react';

import { createMuiTheme, Link, Grid, Typography, makeStyles, Container, Button, CssBaseline, TextField} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import jwt_decode from 'jwt-decode'

import Error from './Error'

import { ComponenteContext } from '../context/ComponenteContext'

import { guardarLS } from '../libs/guardarLS'
import api from '../libs/api'

import imagenes from '../asets/img/imagenes';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hr:{
        background: '#b3d233',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        borderColor:'#d4e157',
        height:'5px',
        borderRadius: '5px',
        marginTop:'1px',
    }, 
    letra:{
        font: 'caption',
        marginTop:'20px',
        fontWeight:'700',
        fontSize: 25,
        color:'#545658'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        argin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(#d4e157, #b3d233)',
        color:'#424242',
        marginBottom:'20px',
        marginTop:'10px',

        '&:hover': {
            color:'#000',
            fontWeight: '700',
        },
    },
}));

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });

const Login = () => {

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)        

    const [ datoslogeo, guardarDatosLogeo ] = useState({
        email: '',
        password: ''
    })
    const [ error, guardarError ] = useState(false)

    const { email, password } = datoslogeo
    
    const changeSubmit = e =>{
        guardarDatosLogeo({
            ...datoslogeo,
            [e.target.name]: e.target.value
        })
    }

    const consultarAPI = async () => {
        try{
            const objeto = {
                correo: email,
                password: password
            }

            const consulta = await api.login(objeto)                   

            const { accessToken, refreshToken } = consulta.data;
            console.log(consulta);
            
            localStorage.setItem("accessToken", JSON.stringify(accessToken))
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken))

            const { usuario } = jwt_decode(accessToken)
            const { nivel_acceso_usuario } = usuario

            if ( nivel_acceso_usuario === 0 || nivel_acceso_usuario === 1 ){                                            
                guardarLS(nivel_acceso_usuario, 1, 1)
                guardarComponenteContx({
                    nivel_acceso: nivel_acceso_usuario,
                    numero_ventana: 1,
                    numero_componente: 1
                })
            }else{            
                guardarError(true) 
                return
            }            
        }
        catch{            
            guardarError(true)            
        }      
    }

    const logeo = e => {
        e.preventDefault()

        if ( email.trim() === '' || password.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)
        consultarAPI()
    }

    const registarse = () => {
        guardarLS(null, null, 2)
        guardarComponenteContx({
            ...componentecontx,
            numero_ventana: 2
        })
    }
         
    const classes = useStyles();
    
    return ( 
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div>
                    <img style={{width: 200}} src={imagenes.imgjpg} alt='PALA' />
                </div>
                <Typography component="h1" variant="h5" className={classes.letra}>
                    INICIA SESIÓN
                    <hr className={classes.hr}/>
                </Typography>
                { error ? <Error mensaje='Email o password incorrecto'/> : null}
                <form 
                    className={classes.form} noValidate
                    onSubmit={logeo}   
                >
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo:"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={changeSubmit}
                        />                
                        <TextField
                            color="secondary"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña:"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={changeSubmit}
                        />     
                    </ThemeProvider>           
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Ingresar
                    </Button>                
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={registarse}>
                                {"Registrate"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
     );
}
 
export default Login;