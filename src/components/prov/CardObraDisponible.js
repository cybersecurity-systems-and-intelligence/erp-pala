import { Fragment, useContext } from 'react';
import { Card, Container, CardActions, CardContent, Grid, Typography, makeStyles }  from '@material-ui/core/';
import {ComponenteContext} from '../../context/ComponenteContext'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));



const CardObraDisponible = ({ rows, obrasdisponibles, guardarObra}) => {

    const classes = useStyles();
    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    const seleccionarObra = e => {
        const obraSeleccionada = obrasdisponibles.filter(row => row.folio_obra === e.target.id)        
      
        const obra = obraSeleccionada[0]        
     
        guardarObra(obra)
        guardarComponenteContx({
          ...componentecontx,
          numero_componente: 3
        })
        /*



        guardarComponente({
          ...componente,
          numero_componente: 3
        })





        */
    }

    return (
        <Fragment>    
        <main>        
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={2}>
                {rows.map((row) => (
                <Grid item key={row.folioObra} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>                  
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Folio: {row.folioObra}
                        </Typography>
                        <Typography>
                        {row.nombreObra}
                        </Typography>

                        </CardContent>
                        <CardActions>
                        <input
                            type='button'
                            id={row.folioObra}
                            value="Seleccionar"
                            onClick={seleccionarObra}
                        />
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </main>
        </Fragment>
    );
}

export default CardObraDisponible