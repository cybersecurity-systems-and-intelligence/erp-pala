import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Switch, Grid, TextField, withStyles} from '@material-ui/core/'
import { Typography} from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });
const SwitchPurple = withStyles({
	switchBase: {
		color: '#cddc39',
		'&$checked': {
			color: '#cddc39',
		},
		'&$checked + $track': {
			backgroundColor: '#99aa00',
		},
	},
	checked: {},
	track: {},
})(Switch)

const BuscadorObra = ({ datosgenerales, guardarDatosGenerales, folio, guardarFolio, obrastotal, guardarRows, bandObrasCotizadas, tipobusqueda, guardarTipoBusqueda }) => {
        
    
    const consulta_ = (folio_, band) => {
        
        let consulta = []
        if(band === 'Buscar por Folio Obra'){                               
            consulta = obrastotal.filter(row => row.folio_obra.startsWith(folio_))
        }else{                        
            consulta = obrastotal.filter(row => row.folio_cotizacion.startsWith(folio_))            
        }
        
        if(consulta.length === 0){
            guardarDatosGenerales({
                ...datosgenerales,
                errorconsulta: true
            })
            return
        }
        guardarDatosGenerales({
            ...datosgenerales,
            errorconsulta: false
        })
        let obrasCard
        if(bandObrasCotizadas === false){
            obrasCard = consulta.map(obra => (
                {
                folioObra: obra.folio_obra,
                nombreObra: obra.nombre_obra                    
                }
            ))
        }else{
            obrasCard = consulta.map(obra => (
                {
                folioObra: obra.folio_obra,
                folioCotizacion: obra.folio_cotizacion,
                nombreObra: obra.nombre_obra                    
                }
            ))
        }
        guardarRows(obrasCard)
            
    }
	const handleChange = e => {
        
        const band = e.target.checked === false ? 'Buscar por Folio Obra' : 'Buscar por Folio Cotizacion'
        guardarTipoBusqueda( band)
        if (folio !== undefined)
            consulta_(folio, band)
    }
    
    const handleChangeFolio = e => {
        
        
        if(e.target.value.trim() === ""){     
            guardarDatosGenerales({
                ...datosgenerales,
                errorconsulta: false
            })
            if (bandObrasCotizadas === false){        
                const obrasCard = obrastotal.map(obra => (
                    {
                      folioObra: obra.folio_obra,
                      nombreObra: obra.nombre_obra                    
                    }
                ))                
                guardarRows(obrasCard)
            }else{
                const obrasCard = obrastotal.map(obra => (
                    {
                      folioObra: obra.folio_obra,
                      folioCotizacion: obra.folio_cotizacion,
                      nombreObra: obra.nombre_obra
                    }
                ))
                guardarRows(obrasCard)
            }
           
        }else{
            consulta_(e.target.value, tipobusqueda)                        
        }
        guardarFolio(e.target.value)
        
    }

	return (
        <ThemeProvider theme={theme}>                  
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >

                <Typography component="h1" variant="h6" color="inherit" >Buscar por folio:</Typography>
                {
                    bandObrasCotizadas
                    ?
                    
                    <FormControlLabel
                        control={<SwitchPurple onChange={handleChange}></SwitchPurple>}
                        label={tipobusqueda}
                    ></FormControlLabel>
                    :
                    null
                }     
                
                <TextField                                    
                    id="folio"
                    name="folio"
                    label="folio"
                    value={folio}
                    onChange={handleChangeFolio}       
                    color='secondary'                                                    
                />
            </Grid>
        </ThemeProvider>
	)
}

export default BuscadorObra
