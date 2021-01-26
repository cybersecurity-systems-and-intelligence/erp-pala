import { Fragment, useContext } from 'react';
import { Card, Container, CardActions, CardContent, Grid, Typography, makeStyles }  from '@material-ui/core/';
import {Pagination} from '@material-ui/lab/';
import {ComponenteContext} from '../context/ComponenteContext'
import {createPDF} from '../libs/createPdf'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    background:'#f5f5f5',
    borderRadius: 10,
  },

  
  card: {
    
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    margin: '0 12px auto',
    boxShadow:'#f0f4c3 0px 0px 0px 1px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
    transition: 'transform .2s',

    '&:hover': {
      transition: theme.transitions.create('transform','background','transition', {
        duration: theme.transitions.duration.enteringScreen,
      }),
      transition: 'transform .5s',
      transform: 'scale(1.1)',
      color: 'black'
      
   },

  },
  cardContent: {
    flexGrow: 1,
    
  },
  root: {
    marginTop: theme.spacing(2),
  },

  num:{
    background:'#f0f4c3'
  },

  btn:{
    background: 'linear-gradient(#cfcfcf, #fff)',
    border: 0,
    borderRadius: 6,
    color: 'black',
    height: 30,
    width: '100%',
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow:'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',


    '&:hover': {
      transition: theme.transitions.create('transition','background', {
        duration: theme.transitions.duration.enteringScreen,
      }),
        transition: 'all 0.1s ease',
        background: 'linear-gradient(#d4e157,#B3D233)',
        color:'black'
     },
  },
}));



const CardObra = ({siguientecomponente, rows, cantidadcards, totalpaginas, paginaactual, paginafinal, guardarPaginaFinal, page, setPage, guardarPaginaActual, obrastotal, obrascotizadas, guardarObra, bandObrasCotizadas, seleccionpor }) => {


    const classes = useStyles();
        
    
    
    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    const { nivel_acceso } = componentecontx

    const handleChange = (event, value) => {
      setPage(value);    
      guardarPaginaActual((cantidadcards*value)-cantidadcards)   
      guardarPaginaFinal(cantidadcards*value) 
    };

    const seleccionarObra = e => {      
      if(nivel_acceso === 1 && siguientecomponente === 4 ){
        createPDF()
      }else{
        let obraSeleccionada = []        
      
        if (seleccionpor === "obra" ){
          obraSeleccionada = obrastotal.filter(row => row.folio_obra === e.target.id)
        }else{          
          obraSeleccionada = obrastotal.filter(row => row.folio_cotizacion === e.target.id)
        }
        const obra = obraSeleccionada[0]        
        
        guardarObra(obra)
        guardarComponenteContx({
          ...componentecontx,
          numero_componente: siguientecomponente
        })
      }
        
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
                {rows.slice(paginaactual, paginafinal).map((row) => (
                <Grid item key={bandObrasCotizadas ? row.folioCotizacion:row.folioObra} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>                  
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Folio Obra: {row.folioObra}
                        </Typography>
                        {
                          bandObrasCotizadas
                          ?
                          <Typography gutterBottom variant="h6" component="h2">
                            Folio Cotizacion: {row.folioCotizacion}
                          </Typography>
                          :
                          null
                        }
                        <Typography>
                        {row.nombreObra}
                        </Typography>

                        </CardContent>
                        <CardActions>
                        <input
                            type='button'
                            id={ seleccionpor === "obra" ? row.folioObra : row.folioCotizacion}
                            value="Seleccionar"
                            onClick={seleccionarObra}
                            className={classes.btn}
                        />
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            

            </Container>
            <Grid
              
               container
               spacing={0}
               direction="column"
               alignItems="center"
               justify="center"
            >
              <div className={classes.root}>
                <Pagination count={totalpaginas} page={page} onChange={handleChange} />
              </div>
            </Grid>
        </main>
        </Fragment>
    );
}

export default CardObra