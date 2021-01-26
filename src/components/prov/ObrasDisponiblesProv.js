import { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles, CssBaseline, Typography, Paper } from '@material-ui/core/';
import axios from 'axios'
import Copyright from '../Copyright'
import CardObraDisponible from './CardObraDisponible'


const useStyles = makeStyles((theme) => ({   
   
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    }
}))

const ObrasDisponiblesProv = ( { guardarObra } ) => {

    const classes = useStyles();
    
    const [ obrasdisponibles, guardarObrasDisponibles ] = useState([])
    const [ rows, guardarRows ] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const respuesta = await axios.get('https://apicotizacion.herokuapp.com/api/obras')
            const obras = respuesta.data.Obras.map(obra => (
                {
                    folioObra: obra.folio_obra,
                    nombreObra: obra.nombre_obra                    
                }
            ))
            guardarObrasDisponibles(respuesta.data.Obras)
            guardarRows(obras);
        }
        consultarAPI()
    }, [])
    
    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Obras Disponibles
                    </Typography>
                    <br/>
                    <CardObraDisponible
                        rows={rows}
                        obrasdisponibles={obrasdisponibles}
                        guardarObra={guardarObra}
                        //guardarComponente={guardarComponente}
                        //componente={componente}
                    />
                </Paper>
            </main>
            <Copyright/>
        </Fragment>
    );
}

export default ObrasDisponiblesProv;